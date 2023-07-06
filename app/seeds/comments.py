from app.models import db, Comment, environment, SCHEMA, fake
from sqlalchemy.sql import text
import random


def seed_comments():

    for _ in range(100):
        comment = Comment(user_id=random.randint(1, 11), answer_id=random.randint(
            1, 9), text=fake.paragraph(nb_sentences=5))
        db.session.add(comment)


    db.session.add(Comment(user_id=1, answer_id=1, text=fake.paragraph(nb_sentences=5)))
    db.session.add(Comment(user_id=1, answer_id=3, text=fake.paragraph(nb_sentences=5)))
    db.session.add(Comment(user_id=1, answer_id=4, text=fake.paragraph(nb_sentences=5)))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
