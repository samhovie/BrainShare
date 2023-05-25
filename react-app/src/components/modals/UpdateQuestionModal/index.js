import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    getQuestionsThunk,
    updateQuestionThunk,
} from "../../../store/question";
import { useModal } from "../../../context/Modal";
import { checkWordLength } from "../../../utils";

export default function UpdateQuestionModal({ question }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState(question.text);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const errors = {};
        if (text && text.length < 4)
            errors.length = "Question must be greater than 3 characters";
        if (text && text.length > 255)
            errors.length = "Question must be less than 255 characters";
        if (!checkWordLength(text))
            errors.word = "Word lengths must be less than 30 characters";
        setErrors(errors);
    }, [text]);

    async function handleUpdateQuestion(e, question) {
        e.preventDefault();
        await dispatch(updateQuestionThunk({ id: question.id, text: text }));
        await dispatch(getQuestionsThunk());
        closeModal();
    }

    return (
        <form
            className="create-qa-container flex flex-col"
            onSubmit={(e) => handleUpdateQuestion(e, question)}
        >
            <ul>
                {Object.values(errors).map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <textarea
                type="text"
                value={text}
                required
                rows="10"
                cols="50"
                onChange={(e) => setText(e.target.value)}
            ></textarea>
           <button disabled={Object.values(errors).length > 0}>Update your question</button>
        </form>
    );
}
