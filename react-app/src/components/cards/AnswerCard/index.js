import React from "react";
import "./AnswerCard.css";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function AnswerCard({ answer }) {
    return (
        <>
            <div>
                <p>
                    I went to this place along the river where there is a lot of
                    fish to catch and birds to look at. I wish there was a place
                    that I could go to to see what I want tot do so that I have
                    more things to say and I want to have dots on this when I
                    run our of space so I'm writing a bunch
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
