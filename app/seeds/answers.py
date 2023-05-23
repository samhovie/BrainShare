from app.models import db, Answer, environment, SCHEMA, fake
from sqlalchemy.sql import text
import random


def seed_answers():

    for _ in range(100):
        answer = Answer(user_id=random.randint(1, 11), question_id=random.randint(
            1, 100), text=fake.paragraph(nb_sentences=5))
        db.session.add(answer)


    db.session.add(Answer(user_id=11, question_id=1, text=fake.paragraph(nb_sentences=5)))
    db.session.add(Answer(user_id=11, question_id=3, text=fake.paragraph(nb_sentences=5)))
    db.session.add(Answer(user_id=11, question_id=4, text=fake.paragraph(nb_sentences=5)))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_answers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()
