import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getQuestionThunk } from "../../../store/question";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { createAnswerThunk } from "../../../store/answer";
import { checkWordLength } from "../../../utils";


export default function CreateAnswerModal({ question_id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState("");
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = {};
        if (text && text.length < 4)
            errors.length = "Answer must be greater than 3 characters";
        if (text && text.length > 500)
            errors.length = "Answer must be less than 440 characters";
        if (!checkWordLength(text))
            errors.word = "Word lengths must be less than 30 characters";
        setErrors(errors);
    }, [text, hasSubmitted]);

    async function handleCreateAnswer(e) {
        e.preventDefault();
        setErrors({});

        await dispatch(createAnswerThunk({ text, question_id }));
        await dispatch(getQuestionThunk(question_id));
        closeModal();
        history.push('/questions/' + question_id)
    }

    return (
        <form
            className="create-qa-container flex flex-col"
            onSubmit={(e) => handleCreateAnswer(e)}
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
            <button disabled={Object.values(errors).length > 0}>Add an answer</button>
        </form>
    );
}
