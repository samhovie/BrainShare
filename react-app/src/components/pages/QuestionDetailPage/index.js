import React, { useEffect, useState } from "react";
import "./QuestionDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuestionCard from "../../cards/QuestionCard";
import { getQuestionThunk } from "../../../store/question";
import { useModal } from "../../../context/Modal";
import { updateAnswerThunk } from "../../../store/answer";
import { deleteAnswerThunk } from "../../../store/answer";
import OpenModalButton from "../../modals/OpenModalButton";
import CardContainer from "../../cards/CardContainer";
import AnswerCard from "../../cards/AnswerCard";


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
            <CardContainer
                key={question.id}
                Card={() => <QuestionCard question={question} />}
            />

            {question.answers.map((answer) => (
                <CardContainer
                    key={answer.id}
                    Card={() => <AnswerCard answer={answer} />}
                />
            ))}
        </div>
    );
}
