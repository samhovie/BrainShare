import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { updateAnswerThunk } from "../../../store/answer";
import { getQuestionThunk } from "../../../store/question";

export default function UpdateAnswerModal({ answer }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState(answer.text);


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
        <form className="create-qa-container flex flex-col"
        onSubmit={(e) => handleUpdateAnswer(e, answer)}>
        <textarea
        type="text"
        value={text}
        rows="10" cols="50"
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button>Update your answer</button>
        </form>
    );
}
