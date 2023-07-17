from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import DateTime


class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    time_created = db.Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    time_updated = db.Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)


    user = db.relationship('User', back_populates='questions')
    answers = db.relationship('Answer', cascade='all, delete-orphan', order_by="desc(Answer.time_created)")





    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'text': self.text,
            'user': self.user.to_dict_no_question_answer(),
            'answers': [answer.to_dict() for answer in self.answers],
            'time_created': self.time_created,
            'time_updated': self.time_updated

        }
