# seed.py
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

    user1 = User(email="passenger@example.com", password=hashed_password_user, role="passenger", name="John Doe")
    user2 = User(email="admin@example.com", password=hashed_password_admin, role="admin", name="Admin User")
    driver1 = User(email="driver@example.com", password=hashed_password_user, role="driver", name="Driver One")

    db.session.add_all([user1, user2, driver1])
    db.session.commit()

    print("Users added.")

    # Add routes dynamically based on the towns
    print("Adding routes...")

    # Populate the routes based on towns
    TOWNS = [
        "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Nyeri",
        "Meru", "Machakos", "Kisii", "Kericho", "Kakamega", "Bungoma", "Malindi", 
        "Kitui", "Garissa", "Nyahururu", "Narok", "Voi", "Isiolo"
    ]

    # Generate routes dynamically
    routes = []
    for i in range(len(TOWNS)):
        for j in range(len(TOWNS)):
            if i != j:
                route_name = f"{TOWNS[i]} to {TOWNS[j]}"
                route = Route(
                    route_name=route_name,
                    origin=TOWNS[i],
                    destination=TOWNS[j],
                    distance=None,  # Distance can be added later
                    estimated_duration=None  # Duration can be added later
                )
                routes.append(route)

    db.session.add_all(routes)
    db.session.commit()

    print("Routes added.")

    # Add buses
    bus1 = Bus(
        bus_number="BUS-101",
        capacity=40,
        model="Volvo B7R",
        year=2020,
        route_id=1  # Assign to the first route (you can adjust this)
    )
    bus2 = Bus(
        bus_number="BUS-102",
        capacity=30,
        model="Mercedes-Benz Citaro",
        year=2019,
        route_id=2  # Assign to the second route (you can adjust this)
    )

    db.session.add_all([bus1, bus2])
    db.session.commit()

    print("Buses added.")

    # Add schedules for the buses
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
