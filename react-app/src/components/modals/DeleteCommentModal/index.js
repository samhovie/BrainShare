import React from "react";
import { useDispatch } from "react-redux";
import { getQuestionThunk } from "../../../store/question";
import { deleteCommentThunk } from "../../../store/comment";
import { useModal } from "../../../context/Modal";

export default function DeleteCommentModal({ comment }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    async function handleDeleteComment(comment) {
        const id = comment.answer_id;
        await dispatch(deleteCommentThunk(comment.id));
        await dispatch(getQuestionThunk(id)); // do we need this?
        closeModal();
    }

    return (
        <div className="flex flex-col align-center padding-md">
            <h4>Are you sure you want to delete your comment?</h4>
            <div className="flex">
            <button
                onClick={(e) => {
                    e.preventDefault(); // only needed for forms?
                    closeModal();
                }}
            >
                No (Keep)
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleDeleteComment(comment);
                }}
            >
                Yes (Delete)
            </button>
            </div>
        </div>
    );
}
