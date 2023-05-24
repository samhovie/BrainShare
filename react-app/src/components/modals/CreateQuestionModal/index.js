import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createQuestionThunk, getQuestionsThunk  } from "../../../store/question";
// import "./Card.css";
import { useModal } from "../../../context/Modal";

export default function CreateQuestionModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState('')

    async function handleCreateQuestion(e) {
        e.preventDefault();
        await dispatch(createQuestionThunk({ text }));
        await dispatch(getQuestionsThunk());
        closeModal();
    }

    return (
        <form
        onSubmit={(e) =>
            handleCreateQuestion(e)
        }
    >
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
        ></input>
        <button>CREATE</button>
    </form>
    )
}
