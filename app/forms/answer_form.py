from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class AnswerForm(FlaskForm):
    text = StringField('text', validators=[DataRequired()])
