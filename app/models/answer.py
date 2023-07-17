from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import DateTime

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('questions.id')), nullable=False)
    text = db.Column(db.String(500), nullable=False)
    time_created = db.Column(DateTime(timezone=True),
                             server_default=func.now(), nullable=False)
    time_updated = db.Column(DateTime(timezone=True),
                             onupdate=func.now(), nullable=True)

    user = db.relationship('User', back_populates='answers')
    comments = db.relationship('Comment', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'text': self.text,
            'question_id': self.question_id,
            'user': self.user.to_dict_no_question_answer(),
            'comments': [comment.to_dict() for comment in self.comments]
        }
