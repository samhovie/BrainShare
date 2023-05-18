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


# @questions.route('/<int:id>')
# # @login_required
# def question(id):
#     """
#     Query for a question by id and returns that user in a dictionary
#     """
#     question = Question.query.get(id)
#     return question.to_dict()
