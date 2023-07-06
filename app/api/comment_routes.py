from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment, Answer
from app.forms import QuestionForm, AnswerForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def comments():
#     """
#     Query for all questions and returns them in a list of user dictionaries
#     """
    print(
        'ya boi'
    )
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}
