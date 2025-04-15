# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from functools import wraps

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# CORS config to allow frontend access
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "defaultsecret")
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET", "defaultjwtsecret")

# Initialize DB
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# --- Models ---

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.LargeBinary(200), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    is_blocked = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<User {self.email}>"

# Route model
class Route(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    route_name = db.Column(db.String(100), nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    distance = db.Column(db.Float, nullable=True)  # Distance between origin and destination
    estimated_duration = db.Column(db.Integer, nullable=True)  # Estimated duration in minutes

    def __repr__(self):
        return f"<Route {self.route_name}>"

# Bus model
class Bus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bus_number = db.Column(db.String(50), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    model = db.Column(db.String(50), nullable=True)
    year = db.Column(db.Integer, nullable=True)
    route_id = db.Column(db.Integer, db.ForeignKey('route.id'), nullable=False)
    route = db.relationship('Route', backref=db.backref('buses', lazy=True))

    def __repr__(self):
        return f"<Bus {self.bus_number}>"

# Schedule model
class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bus_id = db.Column(db.Integer, db.ForeignKey('bus.id'), nullable=False)
    bus = db.relationship('Bus', backref=db.backref('schedules', lazy=True))
    departure_time = db.Column(db.Time, nullable=False)
    arrival_time = db.Column(db.Time, nullable=False)
    day_of_week = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        return f"<Schedule {self.bus.bus_number} {self.day_of_week}>"

# Booking model
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('bookings', lazy=True))
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.id'), nullable=False)
    schedule = db.relationship('Schedule', backref=db.backref('bookings', lazy=True))
    date = db.Column(db.Date, nullable=False)
    seats_booked = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<Booking {self.user.email} {self.schedule.bus.bus_number}>"

# --- Helper: Generate JWT Token ---
def generate_token(user_id, role):
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=1),
    }
    token = jwt.encode(payload, app.config["JWT_SECRET_KEY"], algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode('utf-8')
    return token

# --- Decorator: Admin Only Access ---
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Missing token"}), 401
        try:
            token = token.replace("Bearer ", "")
            payload = jwt.decode(token, app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
            if payload.get("role") != "admin":
                return jsonify({"error": "Admin access required"}), 403
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated_function

# --- Decorator: Only Active (Non-blocked) Users ---
def user_must_be_active(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Missing token"}), 401
        try:
            token = token.replace("Bearer ", "")
            payload = jwt.decode(token, app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
            user = User.query.get(payload["user_id"])
            if not user or user.is_blocked:
                return jsonify({"error": "Your account is blocked."}), 403
            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
    return decorated_function

# --- One-time Admin Seeder ---
def create_admin_users():
    admins = [
        {"email": "admin1@gmail.com", "password": "Equity2030"},
        {"email": "admin2@gmail.com", "password": "Equity2030"},
    ]
    for admin in admins:
        existing = User.query.filter_by(email=admin["email"]).first()
        if not existing:
            hashed_password = bcrypt.hashpw(admin["password"].encode("utf-8"), bcrypt.gensalt())
            new_admin = User(email=admin["email"], password=hashed_password, role="admin")
            db.session.add(new_admin)
    db.session.commit()

# --- Routes ---

@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "user")
    phone = data.get("phone")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    new_user = User(email=email, password=hashed_password, role=role, phone=phone)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Registration failed", "details": str(e)}), 500

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.checkpw(password.encode("utf-8"), user.password):
        return jsonify({"error": "Invalid email or password"}), 401

    if user.is_blocked:
        return jsonify({"error": "Your account is blocked. Please contact support."}), 403

    token = generate_token(user.id, user.role)
    name = email.split("@")[0].capitalize()

    return jsonify({
        "token": token,
        "role": user.role,
        "email": user.email,
        "phoneNumber": user.phone,
        "name": name
    }), 200

@app.route("/api/buses", methods=["GET"])
def get_buses():
    buses = Bus.query.all()
    bus_list = [{"id": bus.id, "bus_number": bus.bus_number, "route": bus.route} for bus in buses]
    return jsonify(bus_list), 200

@app.route("/api/buses", methods=["POST"])
@admin_required
def add_bus():
    data = request.get_json()
    bus_number = data.get("bus")
    source = data.get("source")
    destination = data.get("destination")
    departure_time = data.get("departure_time")
    arrival_time = data.get("arrival_time")

    if not bus_number or not source or not destination:
        return jsonify({"error": "Bus number, source, and destination are required"}), 400

    # Create route_name based on source and destination
    route_name = f"{source} → {destination}"

    # Query to find the route based on source and destination
    route = Route.query.filter_by(origin=source, destination=destination).first()

    if not route:
        return jsonify({"error": "Route not found"}), 400

    # Create a new bus and associate the Route object
    new_bus = Bus(
        bus_number=bus_number,
        route=route,  # Assigning the Route object to the 'route' relationship
        departure_time=departure_time,
        arrival_time=arrival_time
    )

    try:
        db.session.add(new_bus)
        db.session.commit()
        return jsonify({"message": "Bus added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to add bus", "details": str(e)}), 500

@app.route("/api/buses/<int:bus_id>", methods=["DELETE"])
@admin_required
def delete_bus(bus_id):
    bus = Bus.query.get(bus_id)
    if not bus:
        return jsonify({"error": "Bus not found"}), 404

    db.session.delete(bus)
    db.session.commit()
    return jsonify({"message": "Bus deleted successfully"}), 200

@app.route("/api/users", methods=["GET"])
@admin_required
def get_users():
    users = User.query.all()
    user_list = [{
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "phone": user.phone,
        "isBlocked": user.is_blocked if hasattr(user, 'is_blocked') else False
    } for user in users]
    return jsonify(user_list), 200

@app.route("/api/users/<int:user_id>", methods=["DELETE"])
@admin_required
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

@app.route("/api/users/<int:user_id>", methods=["PUT"])
@admin_required
def update_user_status(user_id):
    data = request.get_json()
    is_blocked = data.get("isBlocked")

    if is_blocked is None:
        return jsonify({"error": "Missing 'isBlocked' value"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.is_blocked = is_blocked
    db.session.commit()

    return jsonify({"message": f"User {'blocked' if is_blocked else 'unblocked'} successfully"}), 200

# --- Example protected booking route (to apply blocked check) ---
@app.route("/api/book", methods=["POST"])
@user_must_be_active
def book_ticket():
    return jsonify({"message": "Booking successful"}), 200

# --- Run Server ---
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        create_admin_users()
    app.run(debug=True)

