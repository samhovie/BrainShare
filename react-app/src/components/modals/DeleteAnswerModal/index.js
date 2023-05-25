import React from "react";
import { useDispatch } from "react-redux";
import { getQuestionThunk } from "../../../store/question";
import { deleteAnswerThunk } from "../../../store/answer";
import { useModal } from "../../../context/Modal";

export default function DeleteAnswerModal({ answer }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    async function handleDeleteAnswer(answer) {
        const id = answer.question_id;
        await dispatch(deleteAnswerThunk(answer.id));
        await dispatch(getQuestionThunk(id));
        closeModal();
    }

    return (
        <div className="flex flex-col align-center padding-md">
            <h4>Are you sure you want to delete your answer?</h4>
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
                    handleDeleteAnswer(answer);
                }}
            >
                Yes (Delete)
            </button>
            </div>
        </div>
    );
}
