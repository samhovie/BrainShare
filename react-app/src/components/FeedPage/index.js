import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestionsThunk } from "../../store/question";
import "./FeedPage.css";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";

export default function FeedPage() {
    const dispatch = useDispatch();
    const questions = Object.values(
        useSelector((state) => state.questions.allQuestions)
    );
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getAllQuestionsThunk());
    }, [dispatch]);

    function handleDeleteQuestion(id) {
        console.log('hello', id)
        // dispatch(deleteQuestionThunk(id))
        closeModal()
    }



    return (
        <div className="feed">
            {questions.map((question) => (
                <div key={question.id}>
                    {question.text}
                    {/* <button>Delete</button> */}
                    <OpenModalButton
                        className='delete-question'
                        modalComponent={<div><button onClick={() => handleDeleteQuestion(question.id)}>DELETE?</button></div>}
                        buttonText="Delete"
                    />
                    <button>Update</button>
                    </div>
            ))}
        </div>
    );
}
