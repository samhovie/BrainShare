import React, { useEffect, useState } from "react";
import "./QuestionDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuestionCard from "../../cards/QuestionCard";
import { getQuestionThunk } from "../../../store/question";
import { useModal } from "../../../context/Modal";
import { updateAnswerThunk } from "../../../store/answer";
import { deleteAnswerThunk } from "../../../store/answer";
import OpenModalButton from "../../OpenModalButton";
import CardContainer from "../../cards/CardContainer";
import AnswerCard from "../../cards/AnswerCard";

// question card with bigger font
// for now: q only title a only text
// question card with diff buttons and no title
// upvote and comment
function TestAnswer({ answer }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState("");

    async function handleUpdateAnswer(e, answer) {
        e.preventDefault();
        await dispatch(
            updateAnswerThunk({
                id: answer.id,
                question_id: answer.question_id,
                text: text,
            })
        );
        await dispatch(getQuestionThunk(answer.question_id));
        closeModal();
    }

    return (
        <form onSubmit={(e) => handleUpdateAnswer(e, answer)}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></input>
            <button>UPDATE?</button>
        </form>
    );
}

export default function QuestionDetail() {
    const question = useSelector((state) => state.questions.singleQuestion);
    // const answers = useSelector((state) => state.answers.allAnswers)
    const sessionUser = useSelector((state) => state.session.user);
    const { id } = useParams();
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestionThunk(id));
    }, [dispatch, id]);

    if (!question.answers) {
        return null;
    }

    async function handleDeleteAnswer(answer) {
        await dispatch(deleteAnswerThunk(answer.id));
        await dispatch(getQuestionThunk(answer.question_id));
        closeModal();
    }

    return (
        <div className="page">
            <CardContainer key={question.id} Card={() => (<QuestionCard obj={question}/>)} />

            {question.answers.map((answer) => (
                <CardContainer key={answer.id} Card={() => (<AnswerCard obj={answer}/>)}  />
            ))}
        </div>
    );
}
