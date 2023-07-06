import React, { useEffect, useState } from "react";
import "./QuestionDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuestionCard from "../../cards/QuestionCard";
import { getQuestionThunk } from "../../../store/question";
import { useModal } from "../../../context/Modal";
import AnswerCard from "../../cards/AnswerCard";

export default function QuestionDetail() {
    const question = useSelector((state) => state.questions.singleQuestion);
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
    return (
        <div className="page">
            <div className=" card card-container">
                <QuestionCard question={question} />
            </div>

            {question.answers.map((answer) => (
                <div key={answer.id} className=" card card-container">
                    <AnswerCard answer={answer} />
                </div>
            ))}
        </div>
    );
}
