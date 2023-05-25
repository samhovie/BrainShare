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
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = {};
        if (text && text.length < 4)
            errors.length = "Question must be greater than 3 characters";
        if (text && text.length > 255)
            errors.length = "Question must be less than 440 characters";
        if (!checkWordLength(text))
            errors.word = "Word lengths must be less than 30 characters";
        setErrors(errors);
    }, [text, hasSubmitted]);

    async function handleCreateQuestion(e) {
        e.preventDefault();

        await dispatch(createQuestionThunk({ text }));
        await dispatch(getQuestionsThunk());
        closeModal();
    }

    return (
        <form
            className="create-qa-container flex flex-col"
            onSubmit={(e) => handleCreateQuestion(e)}
        >
            <ul>
                {Object.values(errors).map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <textarea
                type="text"
                value={text}
                rows="10"
                cols="50"
                required
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button disabled={Object.values(errors).length > 0}>Add a question</button>
        </form>
    );
}
