import React from "react";
import "./QuestionCard.css";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function QuestionCard({ question }) {
    return (
        <>
            <div>
                <p className="title-lg">
                    What is the last place that you went to this year?
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
