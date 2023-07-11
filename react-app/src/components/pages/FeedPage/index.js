import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsThunk } from "../../../store/question";
import "./FeedPage.css";
import { useModal } from "../../../context/Modal";
// import OpenModalButton from "../../OpenModalButton";
import { NavLink } from "react-router-dom";
import {
    deleteQuestionThunk,
    updateQuestionThunk,
} from "../../../store/question";
import QuestionCard from "../../cards/QuestionCard";

function Test({ question }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState("");

    async function handleUpdateQuestion(e, question) {
        e.preventDefault();
        await dispatch(updateQuestionThunk({ id: question.id, text: text }));
        await dispatch(getQuestionsThunk());
        closeModal();
    }

    return (
        <form onSubmit={(e) => handleUpdateQuestion(e, question)}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></input>
            <button>UPDATE?</button>
        </form>
    );
}

export default function FeedPage() {
    const dispatch = useDispatch();
    const questions = Object.values(
        useSelector((state) => state.questions.allQuestions)
    );
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getQuestionsThunk());
    }, [dispatch]);

    async function handleDeleteQuestion(id) {
        await dispatch(deleteQuestionThunk(id));
        await dispatch(getQuestionsThunk());
        closeModal();
    }

    return (
        <div className="feed page">
            {questions.map((question, idx) => (
                <div key={idx} className=" card card-container">
                    <QuestionCard question={question} />
                </div>
            ))}
        </div>
    );
}
