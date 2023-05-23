import React from "react";
import "./QuestionCard.css";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function QuestionCard({ obj }) {
    return (
        <>
            <div>
                <p className="title-lg">
                   {obj.text}
                </p>
            </div>

            <div className="card card-button-row">
                <button className="answer">
                    <i className="fa-regular fa-pen-to-square"></i>
                    Answer
                </button>
            </div>
        </>
    );
}
