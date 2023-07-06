import React, { useState } from "react";
import "./AnswerCard.css";
import "../Card.css";
import CardHeader from "../CardHeader";
import OpenModalButton from "../../modals/OpenModalButton";
import UpdateAnswerModal from "../../modals/UpdateAnswerModal";
import DeleteAnswerModal from "../../modals/DeleteAnswerModal";
import { useSelector } from "react-redux";

export default function AnswerCard({ answer }) {
    const sessionUser = useSelector((state) => state.session.user);
    const [showComments, setShowComments] = useState(true); // change
    // if (!answer.text) return null;
    return (
        <>
            <CardHeader user={answer.user} />
            <div>
                <p>{answer.text}</p>
            </div>

            <div className="card card-button-row">
                {sessionUser.id === answer.user.id && (
                    <>
                        <OpenModalButton
                            className="delete-question"
                            modalComponent={
                                <DeleteAnswerModal answer={answer} />
                            }
                            buttonText="Delete"
                        />
                        <OpenModalButton
                            className="update-question"
                            modalComponent={
                                <UpdateAnswerModal answer={answer} />
                            }
                            buttonText="Update"
                        />
                    </>
                )}
                {/* add num comments */}
                <button
                    onClick={() => {
                        showComments
                            ? setShowComments(false)
                            : setShowComments(true);
                    }}
                    className="comment-button"
                >
                    <i className="fa-regular fa-comment"></i>
                </button>
            </div>
            {showComments && (
                // this will be a map / list of comments

                <>
                    <div className="card flex flex-row comment-container">
                        <div className="flex center card-icon-container">
                            <i className={`fa-solid fa-g fa-xl`}></i>
                        </div>

                        <div className="comment-content">
                            <p className="username">Jimmy Turnbuckle</p>
                            <p>
                                This is an example comment that will test what a
                                comment will look like. I want to see what will
                                happen when there are multiple lines. This is an
                                example comment that will test what a comment
                                will look like. I want to see what will happen
                                when there are multiple lines.
                            </p>
                        </div>
                    </div>

                    <div className="card flex flex-row comment-container">
                        <div className="flex center card-icon-container">
                            <i className={`fa-solid fa-g fa-xl`}></i>
                        </div>

                        <div className="comment-content">
                            <p className="username">Jimmy Turnbuckle</p>
                            <p>
                                This is an example comment that will test what a
                                comment will look like. I want to see what will
                                happen when there are multiple lines. This is an
                                example comment that will test what a comment
                                will look like. I want to see what will happen
                                when there are multiple lines.
                            </p>
                        </div>
                    </div>

                    <div className="card flex flex-row comment-container">
                        <div className="flex center card-icon-container">
                            <i className={`fa-solid fa-g fa-xl`}></i>
                        </div>
                        <>
                            <div className="comment-content">
                                <p className="username">Jimmy Turnbuckle</p>
                                <p>
                                    This is an example comment that will test
                                    what a comment will look like. I want to see
                                    what will happen when there are multiple
                                    lines. This is an example comment that will
                                    test what a comment will look like. I want
                                    to see what will happen when there are
                                    multiple lines.
                                </p>
                                {/* {sessionUser.id === comment.user.id && ( */}
                                <div className="card card-button-row flex ">
                                    <button>Delete</button>
                                    <button>Update</button>
                                </div>
                            </div>
                        </>
                    </div>
                </>
            )}
        </>
    );
}
