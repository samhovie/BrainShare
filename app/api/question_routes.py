from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Question

question_routes = Blueprint('questions', __name__)


@question_routes.route('/')
def questions():
#     """
#     Query for all questions and returns them in a list of user dictionaries
#     """
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return user.to_dict()
