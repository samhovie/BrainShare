import React from "react";
import "./QuestionCard.css";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CardHeader from "../CardContainer/CardHeader";
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
                    {/* <button className="answer">
                        <i className="fa-regular fa-pen-to-square"></i>
                        Answer
                    </button> */}
                    <OpenModalButton
                        modalClass="add-answer"
                        modalComponent={<CreateAnswerModal question_id={question.id} />}
                        buttonText={ <><i className="fa-regular fa-pen-to-square"></i>
                        Answer</>}
                    />

                    {/* <button className="delete flex center"
                    onClick={openOptionsMenu}>
                        <i className="fa-solid fa-ellipsis fa-lg"></i>
                    </button> */}
                    {sessionUser.id === question.user.id && (
                        <OptionsButton question={question} />
                    )}
                </div>
            </NavLink>
        </>
    );
}
