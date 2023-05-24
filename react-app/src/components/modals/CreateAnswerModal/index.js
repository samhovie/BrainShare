import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getQuestionThunk  } from "../../../store/question";
import { useModal } from "../../../context/Modal";
import { createAnswerThunk } from "../../../store/answer";

export default function CreateAnswerModal({ question_id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState('')

    async function handleCreateAnswer(e) {
        e.preventDefault();
        await dispatch(createAnswerThunk({ text, question_id }));
        await dispatch(getQuestionThunk(question_id));
        closeModal();
    }

    return (
        <form className="create-qa-container flex flex-col"
        onSubmit={(e) =>
            handleCreateAnswer(e)
        }
    >
        <textarea
            type="text"
            value={text}
            rows="10" cols="50"
            onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button>Add an answer</button>
    </form>
    )
}
