import React from "react";
import { useDispatch } from "react-redux";
import {
    deleteQuestionThunk,
    getQuestionsThunk,
} from "../../../store/question";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

export default function DeleteQuestionModal({ question }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory()

    async function handleDeleteQuestion(id) {
        await dispatch(deleteQuestionThunk(id));
        await dispatch(getQuestionsThunk());
        closeModal();
        history.push('/')

    }

    return (
        <div className="flex flex-col align-center padding-md">
            <h4>Are you sure you want to delete your question?</h4>
            <div className="flex">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    closeModal();
                }}
            >
                No (Keep)
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleDeleteQuestion(question.id);
                }}
            >
                Yes (Delete)
            </button>
            </div>
        </div>
    );
}
