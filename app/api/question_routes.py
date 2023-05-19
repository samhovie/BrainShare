from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Question

question_routes = Blueprint('questions', __name__)


@question_routes.route('/')
def questions():
#     """
#     Query for all questions and returns them in a list of user dictionaries
#     """
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}


@question_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_question(id):
    """
    Delete a question by id and returns success
    """

    q = Question.query.get(id)
    if q.user_id == current_user.id:
        db.session.delete(q)
        db.session.commit()
        return {'success': 'good job'}
    else:
        return {"errors": 'nacho question'}
