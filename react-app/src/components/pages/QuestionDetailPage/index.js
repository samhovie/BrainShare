import React, {useEffect} from "react";
import "./QuestionDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuestionCard from "../../cards/QuestionCard";
import { getQuestionThunk } from "../../../store/question";


    // question card with bigger font
        // for now: q only title a only text
    // question card with diff buttons and no title
    // upvote and comment


export default function QuestionDetail() {
    const question = useSelector((state) => state.questions.singleQuestion)
    // const answers = useSelector((state) => state.answers.allAnswers)
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestionThunk(id))
    }, [dispatch, id])

    if (!question.answers) {
        return null
    }
    console.log(question)


    return <div className="page">
        <QuestionCard question={question}></QuestionCard>
        {question.answers.map(answer => <><p>{answer.text}</p><br></br></>)}
    </div>;
}
