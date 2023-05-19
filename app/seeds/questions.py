from app.models import db, Question, environment, SCHEMA, fake
from sqlalchemy.sql import text
import random

# Adds a demo user, you can add other users here if you want
def seed_questions():
    # fake.displayName()
    demo = Question(user_id=1, text=fake.sentence()[:-1] + '?')

    for _ in range(200):
        question = Question(user_id=random.randint(1,11), text=fake.sentence()[:-1] + '?')
        db.session.add(question)


    db.session.add(demo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
