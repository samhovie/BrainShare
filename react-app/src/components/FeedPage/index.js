import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllQuestionsThunk } from '../../store/question';
import './FeedPage.css'

export default function FeedPage() {

    const dispatch = useDispatch()
    const questions = Object.values(useSelector((state) => state.questions.allQuestions))

    useEffect(() => {
        dispatch(getAllQuestionsThunk())
    }, [dispatch])

    return (
            <>
            {questions.map(question => (<p key={question.id}>{question.text}</p>))}
            </>
    )
}
