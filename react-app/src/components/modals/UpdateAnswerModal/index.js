import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { updateAnswerThunk } from "../../../store/answer";
import { getQuestionThunk } from "../../../store/question";
import { checkWordLength } from "../../../utils";

export default function UpdateAnswerModal({ answer }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState(answer.text);

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


    async function handleUpdateAnswer(e, answer) {
        e.preventDefault();
        setErrors({});
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
        <form className="create-qa-container flex flex-col"
        onSubmit={(e) => handleUpdateAnswer(e, answer)}>
                        <ul>
                {Object.values(errors).map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
        <textarea
        type="text"
        value={text}
        required
        rows="10" cols="50"
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button disabled={Object.values(errors).length > 0}>Update your answer</button>
        </form>
    );
}
