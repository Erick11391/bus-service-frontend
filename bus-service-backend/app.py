from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from flask_migrate import Migrate  # Import Migrate
from models import db, Bus, Booking, User  # Import models and db from models.py

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

# Configure SQLite database
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///bus_service.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Disable unnecessary warnings

# Initialize database
db.init_app(app)

# Initialize Migrate
migrate = Migrate(app, db)  # Initialize Flask-Migrate

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
    buses = Bus.query.all()
    return jsonify([bus.to_dict() for bus in buses])

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

    # Generate JWT token
    token = generate_token(user.id, user.role)

    # Return token and role
    return jsonify({"token": token, "role": user.role})

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
