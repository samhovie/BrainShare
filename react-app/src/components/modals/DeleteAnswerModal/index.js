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
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleDeleteAnswer(answer);
                }}
            >
                DELETE?
            </button>
        </div>
    );
}
