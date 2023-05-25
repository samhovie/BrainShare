import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
    createQuestionThunk,
    getQuestionsThunk,
} from "../../../store/question";
// import "./Card.css";
import { useModal } from "../../../context/Modal";
import { checkWordLength } from "../../../utils";

export default function CreateQuestionModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState("");
    const [errors, setErrors] = useState(['']);


    async function handleCreateQuestion(e) {
        e.preventDefault();
        if (!checkWordLength(text)) {
            setErrors(["Word length must be less than 30 "]);
        }
        else {
            await dispatch(createQuestionThunk({ text }));
            await dispatch(getQuestionsThunk());
            closeModal();
        }
    }

    return (
        <form
            className="create-qa-container flex flex-col"
            onSubmit={(e) => handleCreateQuestion(e)}
        >
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <textarea
                type="text"
                value={text}
                rows="10"
                cols="50"
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button>Add a question</button>
        </form>
    );
}
