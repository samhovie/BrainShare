import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsThunk } from "../../store/question";
import "./FeedPage.css";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import { deleteQuestionThunk } from "../../store/question";

export default function FeedPage() {
    const dispatch = useDispatch();
    const questions = Object.values(
        useSelector((state) => state.questions.allQuestions)
    );
    const sessionUser = useSelector(state => state.session.user);
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getQuestionsThunk());
    }, [dispatch]);

    async function handleDeleteQuestion(id) {
        await dispatch(deleteQuestionThunk(id))
        await dispatch(getQuestionsThunk());
        closeModal()
    }



    return (
        <div className="feed page">
            {questions.map((question) => (
                <div key={question.id}>
                    {question.text}
{question.user_id === sessionUser.id &&                  <OpenModalButton
                        className='delete-question'
                        modalComponent={<div><button onClick={() => handleDeleteQuestion(question.id)}>DELETE?</button></div>}
                        buttonText="Delete"
                    />}
                    {/* <button>Update</button> */}
                    </div>
            ))}
        </div>
    );
}
