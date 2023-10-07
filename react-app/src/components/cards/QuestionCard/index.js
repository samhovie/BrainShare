import React from "react";
import "./QuestionCard.css";
import "../Card.css"
import { NavLink } from "react-router-dom";
import CardHeader from "../CardHeader";
import OptionsButton from "../OptionsButton";
import { useSelector } from "react-redux";
import OpenModalButton from "../../modals/OpenModalButton";
import CreateAnswerModal from "../../modals/CreateAnswerModal";

export default function QuestionCard({ question }) {
    const sessionUser = useSelector((state) => state.session.user);
    return (
        <>
            <NavLink to={`/questions/${question.id}`}>
                <CardHeader user={question.user} />
                <div>
                    <p className="title-lg">{question.text}</p>
                </div>

                <div className="card card-button-row flex space-between">
                    <OpenModalButton
                        modalClass="add-answer"
                        modalComponent={<CreateAnswerModal question_id={question.id} />}
                        buttonText={ <><i className="fa-regular fa-pen-to-square"></i>
                        Answer</>}
                    />
                    {sessionUser.id === question.user.id && (
                        <OptionsButton question={question} />
                    )}
                </div>
            </NavLink>
        </>
    );
}
