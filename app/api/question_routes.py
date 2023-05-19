from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Question
from app.forms import QuestionForm

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


@question_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def update_question(id):
    """
    Update a question by id and returns success
    """
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('HHHHHHHHHHHH', form.data)
    if form.validate_on_submit():
        q = Question.query.get(id)
        if q.user_id == current_user.id:
            q.text = form.data['text']
            db.session.commit()
            return {'question': q.to_dict()}
        else:
            return {"errors": 'nacho question'}
    else:
        return {'errors': 'validation error'}
