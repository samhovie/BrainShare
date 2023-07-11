from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Comment
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>', methods=['DELETE'])
# get comments for an answer
def delete_comment(id):
#     """
#     Query for all questions and returns them in a list of user dictionaries
#     """
    # comments = Comment.query.all()
    # return {'comments': [comment.to_dict() for comment in comments]}
    comment = Comment.query.get(id)

    if comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return {'success': 'good job'}
    else:
        return {"errors": 'nacho question'}

@comment_routes.route('/<int:id>/new', methods=['POST'])
def post_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        comment = Comment(
            user_id=current_user.id,
            answer_id=id,
            text=form.data['text']
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()

    return {"errors": form.errors}
