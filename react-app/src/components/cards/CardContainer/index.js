import React from "react";
import "./CardContainer.css";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function CardContainer({ component }) {

    return (
        <>
            {/* <NavLink to={`/questions/${question.id}`}> */}
                <div className=" card card-container">
                    <div className=" card flex space-between">
                        <div className="flex">
                            <div>
                                <img
                                    src="https://livebnbbucket.s3.amazonaws.com/usericon.jpg"
                                    alt="card-user-icon"
                                    className="card-user-icon"
                                ></img>
                            </div>

                            <div className="flex flex-col">
                                <div>
                                    <p>Cindy User</p>
                                </div>

                                <div>
                                    <p>credential from BS University</p>
                                </div>
                            </div>
                        </div>

                        <button className="delete flex center">
                            <i className="fa-solid fa-xmark fa-lg"></i>
                        </button>

                    </div>

                    {/* <div>
                        <p className="title-lg">
                            What is the last place that you went to this year?
                        </p>

                    </div>


                    <div className="card card-button-row">
                        <button className="answer">
                            <i className="fa-regular fa-pen-to-square"></i>
                            Answer
                        </button>
                    </div> */}

                    { component }
                </div>
            {/* </NavLink> */}
        </>
    );
}
