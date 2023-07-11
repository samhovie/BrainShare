import React, { useState } from "react";
import "./AnswerCard.css";
import "../Card.css";
import CardHeader from "../CardHeader";
import OpenModalButton from "../../modals/OpenModalButton";
import UpdateAnswerModal from "../../modals/UpdateAnswerModal";
import DeleteAnswerModal from "../../modals/DeleteAnswerModal";
import { useSelector } from "react-redux";
import DeleteCommentModal from "../../modals/DeleteCommentModal";
import { useDispatch } from "react-redux";
import { getQuestionThunk } from "../../../store/question";
import { createCommentThunk } from "../../../store/comment";

export default function AnswerCard({ answer }) {
    const sessionUser = useSelector((state) => state.session.user);
    const [showComments, setShowComments] = useState(true); // change
    const [text, setText] = useState("");
    const [updateText, setUpdateText] = useState("");
    const [showUpdateId, setShowUpdateId] = useState(null);
    const dispatch = useDispatch();

    async function handleCreateComment(e) {
        e.preventDefault();
        // setErrors({});

        await dispatch(createCommentThunk({ text, answer_id: answer.id }));
        await dispatch(getQuestionThunk(answer.question_id));
        setText("");
        // closeModal();
        // history.push('/questions/' + question_id)
    }

    async function showUpdateCommentInput(id) {
        setUpdateText(answer.comments.find(comment => comment.id === id).text)
        setShowUpdateId(id);
    }

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
                    <div className="flex">
                        <div className="flex center card-icon-container">
                            <i
                                className={`fa-solid fa-${sessionUser.username[0].toLowerCase()} fa-xl`}
                            ></i>
                        </div>
                        <form onSubmit={(e) => handleCreateComment(e)}>
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></input>
                            <button>Add comment</button>
                        </form>
                    </div>

                    {answer.comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="card flex flex-row comment-container"
                        >
                            <div className="flex center card-icon-container">
                                <i className={`fa-solid fa-g fa-xl`}></i>
                            </div>
                            <>
                                <div className="comment-content">
                                    <p className="username">
                                        {comment.user.username}
                                    </p>

                                    {showUpdateId !== comment.id ? (
                                        <>
                                            <p>{comment.text}</p>

                                            {sessionUser.id ===
                                                comment.user.id && (
                                                <div className="card card-button-row flex ">
                                                    {/* <button>Delete</button> */}
                                                    <OpenModalButton
                                                        className="delete-comment"
                                                        modalComponent={
                                                            <DeleteCommentModal
                                                                comment={
                                                                    comment
                                                                }
                                                            />
                                                        }
                                                        buttonText="Delete"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            showUpdateCommentInput(
                                                                comment.id
                                                            )
                                                        }
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="">
                                            <input
                                            value={updateText}
                                            onChange={(e) => setUpdateText(e.target.value)}
                                            ></input>
                                            <div>
                                            <button onClick={() => setShowUpdateId(null)}>Cancel</button>
                                            <button>Update</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
