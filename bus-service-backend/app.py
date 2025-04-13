from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import bcrypt
import jwt
import json
from datetime import datetime, timedelta
<<<<<<< HEAD
=======
from flask_migrate import Migrate  # Import Migrate
from models import db, Bus, Booking, User  # Import models and db from models.py
>>>>>>> ad691887ea6006a8f70500980c2f2540909b47a9

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

<<<<<<< HEAD
# JSON storage file for buses
BUSES_FILE = 'buses.json'

# Load buses from JSON file
def load_buses():
    if not os.path.exists(BUSES_FILE):
        with open(BUSES_FILE, 'w') as f:
            json.dump([], f)
        return []
    with open(BUSES_FILE, 'r') as f:
        return json.load(f)

# Save buses to JSON file
def save_buses(data):
    with open(BUSES_FILE, 'w') as f:
        json.dump(data, f, indent=2)

# --- Other In-Memory Mock Data ---
bookings = [
    {"id": 1, "userId": 1, "busId": 1, "date": "2023-10-15"},
    {"id": 2, "userId": 2, "busId": 2, "date": "2023-10-16"},
]

hashed_password_user = bcrypt.hashpw("password123".encode("utf-8"), bcrypt.gensalt())
hashed_password_admin = bcrypt.hashpw("admin123".encode("utf-8"), bcrypt.gensalt())

users = [
    {"id": 1, "email": "user@example.com", "password": hashed_password_user, "role": "user"},
    {"id": 2, "email": "admin@example.com", "password": hashed_password_admin, "role": "admin"},
]
=======
# Configure SQLite database
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///bus_service.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Disable unnecessary warnings

# Initialize database
db.init_app(app)

# Initialize Migrate
migrate = Migrate(app, db)  # Initialize Flask-Migrate
>>>>>>> ad691887ea6006a8f70500980c2f2540909b47a9

# --- Auth ---
def generate_token(user_id, role):
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=1),
    }
    return jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")

# --- Logging ---
@app.before_request
def log_request_info():
    print(f"➡️ {request.method} {request.path}")

# --- Routes ---
@app.route("/api/buses", methods=["GET"])
def get_buses():
<<<<<<< HEAD
    return jsonify(load_buses())

@app.route("/api/buses", methods=["POST"])
def add_bus():
    data = request.get_json()
    buses = load_buses()

    new_bus = {
        "id": len(buses) + 1,
        "name": data.get("name"),
        "source": data.get("source"),
        "destination": data.get("destination"),
        "departure_time": data.get("departure_time"),
        "arrival_time": data.get("arrival_time"),
    }

    buses.append(new_bus)
    save_buses(buses)

    return jsonify({"message": "Bus added", "bus": new_bus}), 201

@app.route("/api/buses/<int:bus_id>", methods=["GET"])
def get_bus_by_id(bus_id):
    buses = load_buses()
    bus = next((b for b in buses if b["id"] == bus_id), None)

    if not bus:
        return jsonify({"error": "Bus not found"}), 404

    return jsonify(bus)

@app.route("/api/buses/<int:bus_id>", methods=["DELETE"])
def delete_bus(bus_id):
    buses = load_buses()
    updated_buses = [b for b in buses if b["id"] != bus_id]

    if len(updated_buses) == len(buses):
        return jsonify({"error": "Bus not found"}), 404

    save_buses(updated_buses)
    return jsonify({"message": "Bus deleted successfully"})
=======
    buses = Bus.query.all()
    return jsonify([bus.to_dict() for bus in buses])
>>>>>>> ad691887ea6006a8f70500980c2f2540909b47a9

@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([booking.to_dict() for booking in bookings])

@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json()
    userId = data.get("userId")
    busId = data.get("busId")
    date = data.get("date")

    # Validate input
    if not userId or not busId or not date:
        return jsonify({"error": "Missing required fields"}), 400

    # Create a new booking
    new_booking = Booking(userId=userId, busId=busId, date=date)
    db.session.add(new_booking)
    db.session.commit()

    return jsonify({"message": "Booking created successfully", "booking": new_booking.to_dict()}), 201

@app.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not bcrypt.checkpw(password.encode("utf-8"), user.password):
        return jsonify({"error": "Invalid email or password"}), 401

<<<<<<< HEAD
    token = generate_token(user["id"], user["role"])
    return jsonify({"token": token, "role": user["role"]})
=======
    # Generate JWT token
    token = generate_token(user.id, user.role)

    # Return token and role
    return jsonify({"token": token, "role": user.role})
>>>>>>> ad691887ea6006a8f70500980c2f2540909b47a9

# --- Run App ---
if __name__ == "__main__":
    app.run(debug=True)
