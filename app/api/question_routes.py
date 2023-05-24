from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Question, Answer
from app.forms import QuestionForm, AnswerForm

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


@question_routes.route('/<int:id>')
# @login_required
def get_question(id):
    """
    Get a question by id
    """
    q = Question.query.get(id)
    return {'question': q.to_dict()}


@question_routes.route('/<int:id>/answers', methods=['PUT'])
# @login_required
def update_answer(id):
    """
    Update a question by id and returns success
    """
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        a = Answer.query.get(id)
        if not a:
            return {"errors": "answer doesn't exist"}
        if a.user_id == current_user.id:
            a.text = form.data['text']
            db.session.commit()
            return {'answer': a.to_dict()}
        else:
            return {"errors": 'nacho question'}
    return {'errors': 'validation error'}


@question_routes.route('/<int:id>/answers', methods=['DELETE'])
# @login_required
def delete_answer(id):
    """
    Delete a question by id and returns success
    """

    a = Answer.query.get(id)

    if a.user_id == current_user.id:
        db.session.delete(a)
        db.session.commit()
        return {'success': 'good job'}
    else:
        return {"errors": 'nacho question'}

@question_routes.route('/new', methods=['POST'])
def post_question():
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        question = Question(
            user_id=current_user.id,
            text=form.data['text']
        )

        db.session.add(question)
        db.session.commit()
        return question.to_dict()

    return {"errors": form.errors}

@question_routes.route('/<int:id>/answers/new', methods=['POST'])
def post_answer(id):
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        answer = Answer(
            user_id=current_user.id,
            question_id=id,
            text=form.data['text']
        )

        db.session.add(answer)
        db.session.commit()
        return answer.to_dict()

    return {"errors": form.errors}
