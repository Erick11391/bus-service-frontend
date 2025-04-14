from flask_sqlalchemy import SQLAlchemy
from datetime import time, date
from flask import Flask
from flask_migrate import Migrate

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20))  
    name = db.Column(db.String(100), nullable=False)  # Added the name field

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role,
            "name": self.name,  # Include name in the dictionary
        }

class Route(db.Model):
    __tablename__ = 'routes'  # Explicit table name
    id = db.Column(db.Integer, primary_key=True)
    route_name = db.Column(db.String(100), nullable=False)
    origin = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    distance = db.Column(db.Float)  # in kilometers
    estimated_duration = db.Column(db.Integer)  # in minutes

    # Relationship to buses (one-to-one)
    bus = db.relationship('Bus', backref='assigned_route', uselist=False)

    def to_dict(self):
        return {
            "id": self.id,
            "route_name": self.route_name,
            "origin": self.origin,
            "destination": self.destination,
            "distance": self.distance,
            "estimated_duration": self.estimated_duration,
        }

class Bus(db.Model):
    __tablename__ = 'buses'  # Explicit table name
    id = db.Column(db.Integer, primary_key=True)
    bus_number = db.Column(db.String(50), nullable=False, unique=True)
    capacity = db.Column(db.Integer, nullable=False)
    model = db.Column(db.String(50))
    year = db.Column(db.Integer)

    # Foreign key to Route (one-to-one relationship)
    route_id = db.Column(db.Integer, db.ForeignKey('routes.id'), unique=True)

    # Relationship to Route model to access source and destination
    route = db.relationship('Route', backref='buses', uselist=False)

    def to_dict(self):
        return {
            "id": self.id,
            "bus_number": self.bus_number,
            "capacity": self.capacity,
            "model": self.model,
            "year": self.year,
            "route_id": self.route_id,
            "route_origin": self.route.origin,  # Accessing source from Route model
            "route_destination": self.route.destination  # Accessing destination from Route model
        }

class Schedule(db.Model):
    __tablename__ = 'schedules'  # Explicit table name
    id = db.Column(db.Integer, primary_key=True)
    bus_id = db.Column(db.Integer, db.ForeignKey('buses.id'), nullable=False)
    departure_time = db.Column(db.Time, nullable=False)
    arrival_time = db.Column(db.Time, nullable=False)
    day_of_week = db.Column(db.String(10), nullable=False)  # 'Monday', 'Tuesday', etc.

    bus = db.relationship('Bus', backref='schedules')

    def to_dict(self):
        return {
            "id": self.id,
            "bus_id": self.bus_id,
            "departure_time": self.departure_time.strftime('%H:%M'),
            "arrival_time": self.arrival_time.strftime('%H:%M'),
            "day_of_week": self.day_of_week,
        }

class Booking(db.Model):
    __tablename__ = 'bookings'  # Explicit table name
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedules.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    seats_booked = db.Column(db.Integer, nullable=False, default=1)

    user = db.relationship('User', backref='bookings')
    schedule = db.relationship('Schedule', backref='bookings')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "schedule_id": self.schedule_id,
            "date": self.date.strftime('%Y-%m-%d'),
            "seats_booked": self.seats_booked,
        }
