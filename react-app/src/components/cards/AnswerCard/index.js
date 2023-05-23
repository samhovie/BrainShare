import React, {useState} from "react";
import "./AnswerCard.css";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CardHeader from "../CardContainer/CardHeader";
import OpenModalButton from "../../OpenModalButton";
import {
    deleteAnswerThunk,
    updateAnswerThunk,
} from "../../../store/answer";

import { getQuestionThunk } from "../../../store/question";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

function Test({ answer }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [text, setText] = useState("");


    async function handleUpdateAnswer(e, answer) {
        e.preventDefault();
        await dispatch(
            updateAnswerThunk({
                id: answer.id,
                question_id: answer.question_id,
                text: text,
            })
        );
        await dispatch(getQuestionThunk(answer.question_id));
        closeModal();
    }

    return (
        <form onSubmit={(e) => handleUpdateAnswer(e, answer)}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></input>
            <button>UPDATE?</button>
        </form>
    );
}

export default function AnswerCard({ answer }) {

    const sessionUser = useSelector(state => state.session.user)
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    async function handleDeleteAnswer(answer) {
        const id = answer.question_id;
        await dispatch(deleteAnswerThunk(answer.id));
        await dispatch(getQuestionThunk(id));
        closeModal();
    }


    return (
        <>
            <CardHeader user={answer.user} />
            <div>
                <p>{answer.text}</p>
            </div>

            {sessionUser.id === answer.user.id && (
            <div className="card card-button-row">
                <OpenModalButton
                    className="delete-question"
                    modalComponent={
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
                    }
                    buttonText="Delete"
                />
                <OpenModalButton
                    className="update-question"
                    modalComponent={<Test answer={answer} />}
                    buttonText="Update"
                />
            </div>
            )}
        </>
    );
}

{
    /* {question.answers.map((answer) => (
    <div key={answer.id}>
        {answer.text}
        {answer.user_id === sessionUser.id && (
            <>
                <OpenModalButton
                    className="delete-question"
                    modalComponent={
                        <div>
                            <button
                                onClick={(e) =>
                                    handleDeleteAnswer(answer.id)
                                }
                            >
                                DELETE?
                            </button>
                        </div>
                    }
                    buttonText="Delete"
                />
                <OpenModalButton
                    className="update-question"
                    modalComponent={<TestAnswer answer={answer} />}
                    buttonText="Update"
                />
            </>
        )}
    </div>
))} */
}
