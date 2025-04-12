from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

# Mock Data
buses = [
    {"id": 1, "busNumber": "Bus 101", "route": "Downtown to Park", "departureTime": "08:00 AM", "arrivalTime": "09:00 AM"},
    {"id": 2, "busNumber": "Bus 102", "route": "Airport to Central Station", "departureTime": "09:00 AM", "arrivalTime": "10:00 AM"},
]

bookings = [
    {"id": 1, "userId": 1, "busId": 1, "date": "2023-10-15"},
    {"id": 2, "userId": 2, "busId": 2, "date": "2023-10-16"},
]

# Hash passwords for mock users
hashed_password_user = bcrypt.hashpw("password123".encode("utf-8"), bcrypt.gensalt())
hashed_password_admin = bcrypt.hashpw("admin123".encode("utf-8"), bcrypt.gensalt())

users = [
    {"id": 1, "email": "user@example.com", "password": hashed_password_user, "role": "user"},
    {"id": 2, "email": "admin@example.com", "password": hashed_password_admin, "role": "admin"},
]

# Helper function to generate JWT token
def generate_token(user_id, role):
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=1),
    }
    return jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")

# Routes
@app.route("/api/buses", methods=["GET"])
def get_buses():
    return jsonify(buses)

@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    return jsonify(bookings)

@app.route("/api/users", methods=["GET"])
def get_users():
    return jsonify(users)

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = next((u for u in users if u["email"] == email), None)

    if not user or not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate JWT token
    token = generate_token(user["id"], user["role"])

    # Return token and role
    return jsonify({"token": token, "role": user["role"]})

# Run the app
if __name__ == "__main__":
    app.run(debug=True)