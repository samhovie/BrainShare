import React from "react";
import { useDispatch } from "react-redux";
import {
    deleteQuestionThunk,
    getQuestionsThunk,
} from "../../../store/question";
import { useModal } from "../../../context/Modal";

export default function DeleteQuestionModal({ question}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    async function handleDeleteQuestion(id) {
        await dispatch(deleteQuestionThunk(id));
        await dispatch(getQuestionsThunk());
        closeModal();
    }

    return (
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleDeleteQuestion(question.id);
                }}
            >
                DELETE?
            </button>
        </div>
    );
}
