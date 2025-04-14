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
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.LargeBinary(200), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=True)

    def __repr__(self):
        return f"<User {self.email}>"

class Bus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bus_number = db.Column(db.String(50), nullable=False)
    route = db.Column(db.String(100), nullable=False)
    source = db.Column(db.String(100), nullable=True)
    destination = db.Column(db.String(100), nullable=True)
    departure_time = db.Column(db.String(20), nullable=True)
    arrival_time = db.Column(db.String(20), nullable=True)

    def __repr__(self):
        return f"<Bus {self.bus_number}>"

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

# --- One-time Admin Seeder ---
def create_admin_users():
    admins = [
        {"email": "admin1@example.com", "password": "adminpass1"},
        {"email": "admin2@example.com", "password": "adminpass2"},
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

    token = generate_token(user.id, user.role)

    # Derive name from email if needed (e.g., "john" from "john@example.com")
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
    bus_number = data.get("name")  # frontend sends 'name'
    route = data.get("source", "") + " → " + data.get("destination", "")  # combine for simplicity
    source = data.get("source")
    destination = data.get("destination")
    departure_time = data.get("departure_time")
    arrival_time = data.get("arrival_time")

    if not bus_number or not route:
        return jsonify({"error": "Bus number and route are required"}), 400

    new_bus = Bus(
        bus_number=bus_number,
        route=route,
        source=source,
        destination=destination,
        departure_time=departure_time,
        arrival_time=arrival_time
    )

    db.session.add(new_bus)
    db.session.commit()
    return jsonify({"message": "Bus added successfully"}), 201

@app.route("/api/buses/<int:bus_id>", methods=["DELETE"])
@admin_required
def delete_bus(bus_id):
    bus = Bus.query.get(bus_id)
    if not bus:
        return jsonify({"error": "Bus not found"}), 404

    db.session.delete(bus)
    db.session.commit()
    return jsonify({"message": "Bus deleted successfully"}), 200

# New Route to Delete User by Admin
@app.route("/api/users/<int:user_id>", methods=["DELETE"])
@admin_required
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200

# --- New Route to get User Info ---
@app.route("/api/user_info", methods=["GET"])
def get_user_info():
    # Get the current logged-in user using the JWT token
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Missing token"}), 401
    
    try:
        # Remove the "Bearer " prefix from the token
        token = token.replace("Bearer ", "")
        # Decode the token
        payload = jwt.decode(token, app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
        user_id = payload.get("user_id")  # Extract the user_id from the token
        if not user_id:
            return jsonify({"error": "Invalid token"}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

    # Fetch user information from the database
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Return the user's name, email, and phone number
    user_info = {
        "name": user.email,  # For now, using email as the name if there is no 'name' field
        "email": user.email,
        "phone": user.phone
    }
    return jsonify(user_info), 200

# --- Run Server ---
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        create_admin_users()
    app.run(debug=True)
