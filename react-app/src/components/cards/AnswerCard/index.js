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
import { createCommentThunk, updateCommentThunk } from "../../../store/comment";

export default function AnswerCard({ answer }) {
    const sessionUser = useSelector((state) => state.session.user);
    const [showComments, setShowComments] = useState(false); // change
    const [text, setText] = useState("");
    const [updateText, setUpdateText] = useState("");
    const [showUpdateId, setShowUpdateId] = useState(null);
    const dispatch = useDispatch();

    function auto_grow(element) {
        element.style.height = "5px";
        element.style.height = element.scrollHeight + "px";
    }

    async function handleCreateComment(e) {
        e.preventDefault();

        await dispatch(createCommentThunk({ text, answer_id: answer.id }));
        await dispatch(getQuestionThunk(answer.question_id));
        setText("");
        // closeModal();
        // history.push('/questions/' + question_id)
    }

    async function handleUpdateComment(e, id) {
        e.preventDefault();

        await dispatch(
            updateCommentThunk({ id, text: updateText, answer_id: answer.id })
        );
        await dispatch(getQuestionThunk(answer.question_id));
        setShowUpdateId(null);
    }

    async function showUpdateCommentInput(id) {
        setUpdateText(
            answer.comments.find((comment) => comment.id === id).text
        );
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
                {sessionUser.id === answer.user.id && (
                    <>
                        <OpenModalButton
                            className="delete-question"
                            modalComponent={
                                <DeleteAnswerModal answer={answer} />
                            }
                            buttonText={
                                <i className="fa-regular fa-trash-can"></i>
                            }
                        />
                        <OpenModalButton
                            className="update-question"
                            modalComponent={
                                <UpdateAnswerModal answer={answer} />
                            }
                            buttonText={<i className="fa-solid fa-pencil"></i>}
                        />
                    </>
                )}
                {/* add num comments */}
            </div>
            {showComments && (
                // this will be a map / list of comments
                <>
                    <div className="flex comment-input">
                        <div className="flex center card-icon-container">
                            <i
                                className={`fa-solid fa-${sessionUser.username[0].toLowerCase()} fa-xl`}
                            ></i>
                        </div>
                        <form
                            className="comment-input"
                            onSubmit={(e) => handleCreateComment(e)}
                        >
                            <textarea
                                className="  comment-input"
                                // onInput={() => auto_grow(this)}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                            <button className="add-comment">Add comment</button>
                        </form>
                    </div>

                    {answer.comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="card flex flex-row comment-container"
                        >
                            <div className="flex center card-icon-container">
                                <i className={`fa-solid fa-${sessionUser.username[0].toLowerCase()} fa-xl`}></i>
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
                                                                questionId={answer.question_id}
                                                            />
                                                        }
                                                        buttonText={
                                                            <i className="fa-regular fa-trash-can"></i>
                                                        }
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
                                        <form
                                            onSubmit={(e) =>
                                                handleUpdateComment(
                                                    e,
                                                    comment.id
                                                )
                                            }
                                            className=""
                                        >
                                            <textarea
                                                className="  comment-input"
                                                value={updateText}
                                                onChange={(e) =>
                                                    setUpdateText(
                                                        e.target.value
                                                    )
                                                }
                                            ></textarea>
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        setShowUpdateId(null)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button type="submit">
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                            </div>
                                        </form>
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
