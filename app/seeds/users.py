from app.models import db, User, environment, SCHEMA, fake
from sqlalchemy.sql import text
import random


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', degree='B.A. from Lorem University')
    db.session.add(demo)

    for _ in range(10):

        randInt = random.randint(0, 3)
        degrees = ['B.A.', 'B.S.', 'M.A.', 'Ph.D']
        lorem = fake.word()
        university = lorem[0].upper() + lorem[1:]
        degree = degrees[randInt] + ' from ' + university + ' University'

        user = User(
            username=fake.name(), email=fake.email(), password='password', degree=degree)
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
