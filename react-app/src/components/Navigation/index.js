import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    return (<div className="navigation-container flex justify-center">
            <ul className="navigation flex align-center flex-end">
                <li className="justify-start">
                    <NavLink exact to="/">
                        <div className="flex align-center">
                            <img
                                className="icon"
                                alt="icon-img"
                                src="https://livebnbbucket.s3.amazonaws.com/favicon.svg"
                            ></img>
                            <h1 className="main-title">SoundForum</h1>
                        </div>
                    </NavLink>
                </li>

                <li className="flex">
                    <input className="search" placeholder="Search"></input>
                    <ProfileButton user={sessionUser} />
                </li>

                <li>
                <button className="add-question">
                        Add a question <i className="fa-solid fa-pencil"></i>
                    </button>
                </li>


            </ul>
        </div>
    )
}

export default Navigation;


            {/* {questions.map((question) => (
                <div key={question.id}>
                    {question.text}
                    {question.user_id === sessionUser.id && (
                        <>
                            <OpenModalButton
                                className="delete-question"
                                modalComponent={
                                    <div>
                                        <button
                                            onClick={(e) =>
                                                handleDeleteQuestion(
                                                    question.id
                                                )
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
                                modalComponent={
                                    <Test question={question} />

                                }
                                buttonText="Update"
                            />
                        </>
                    )}
                </div>
            ))} */}
