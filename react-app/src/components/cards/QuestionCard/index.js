import React from "react";
import "./QuestionCard.css";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CardHeader from "../CardContainer/CardHeader";
import OptionsButton from "../OptionsButton";


export default function QuestionCard({ question }) {
    return (
        <>
            <NavLink to={`/questions/${question.id}`}>
                <CardHeader user={question.user} />
                <div>
                    <p className="title-lg">{question.text}</p>
                </div>

                <div className="card card-button-row flex space-between">
                    <button className="answer">
                        <i className="fa-regular fa-pen-to-square"></i>
                        Answer
                    </button>

                    {/* <button className="delete flex center"
                    onClick={openOptionsMenu}>
                        <i className="fa-solid fa-ellipsis fa-lg"></i>
                    </button> */}

                    <OptionsButton question={question}/>


                </div>
            </NavLink>
        </>
    );
}
