import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getQuestionsThunk, updateQuestionThunk  } from "../../../store/question";
import { useModal } from "../../../context/Modal";

export default function UpdateQuestionModal({question}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState('')

    async function handleUpdateQuestion(e, question) {
        e.preventDefault();
        await dispatch(updateQuestionThunk({ id: question.id, text: text }));
        await dispatch(getQuestionsThunk());
        closeModal();
    }

    return (
        <form className="create-qa-container flex flex-col"
        onSubmit={(e) =>
            handleUpdateQuestion(e, question)
        }
    >
        <textarea
        type="text"
        value={text}
        rows="10" cols="50"
            onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button>Update your question</button>
    </form>
    )
}
