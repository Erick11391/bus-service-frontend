from app import app, db  # Import app and db from your Flask application
from models import User, Route, Bus, Schedule, Booking  # Import your models
import bcrypt
from datetime import datetime, time

# Initialize the app context
with app.app_context():
    # Clear existing data (optional, for clean slate)
    print("Clearing existing data...")
    db.session.query(Booking).delete()
    db.session.query(Schedule).delete()
    db.session.query(Bus).delete()
    db.session.query(Route).delete()
    db.session.query(User).delete()
    db.session.commit()

    print("Adding initial data...")

    # Add users
    hashed_password_user = bcrypt.hashpw("password123".encode("utf-8"), bcrypt.gensalt())
    hashed_password_admin = bcrypt.hashpw("admin123".encode("utf-8"), bcrypt.gensalt())

    user1 = User(email="passenger@example.com", password=hashed_password_user, role="passenger")
    user2 = User(email="admin@example.com", password=hashed_password_admin, role="admin")
    driver1 = User(email="driver@example.com", password=hashed_password_user, role="driver")

    db.session.add_all([user1, user2, driver1])
    db.session.commit()

    print("Users added.")

    # Add routes
    route1 = Route(
        route_name="City Express",
        origin="Downtown Terminal",
        destination="Airport",
        distance=50.5,
        estimated_duration=60
    )
    route2 = Route(
        route_name="Suburban Shuttle",
        origin="Central Station",
        destination="Park Lane",
        distance=30.0,
        estimated_duration=45
    )

    db.session.add_all([route1, route2])
    db.session.commit()

    print("Routes added.")

    # Add buses
    bus1 = Bus(
        bus_number="BUS-101",
        capacity=40,
        model="Volvo B7R",
        year=2020,
        route_id=route1.id  # Assign to route1
    )
    bus2 = Bus(
        bus_number="BUS-102",
        capacity=30,
        model="Mercedes-Benz Citaro",
        year=2019,
        route_id=route2.id  # Assign to route2
    )

    db.session.add_all([bus1, bus2])
    db.session.commit()

    print("Buses added.")

    # Add schedules
    schedule1 = Schedule(
        bus_id=bus1.id,
        departure_time=time(8, 0),
        arrival_time=time(9, 0),
        day_of_week="Monday"
    )
    schedule2 = Schedule(
        bus_id=bus2.id,
        departure_time=time(10, 0),
        arrival_time=time(11, 0),
        day_of_week="Tuesday"
    )

    db.session.add_all([schedule1, schedule2])
    db.session.commit()

    print("Schedules added.")

    # Add bookings
    booking1 = Booking(
        user_id=user1.id,
        schedule_id=schedule1.id,
        date=datetime.strptime("2023-10-15", "%Y-%m-%d").date(),
        seats_booked=2
    )
    booking2 = Booking(
        user_id=user2.id,
        schedule_id=schedule2.id,
        date=datetime.strptime("2023-10-16", "%Y-%m-%d").date(),
        seats_booked=1
    )

    db.session.add_all([booking1, booking2])
    db.session.commit()

    print("Bookings added.")

print("Database seeded successfully!")