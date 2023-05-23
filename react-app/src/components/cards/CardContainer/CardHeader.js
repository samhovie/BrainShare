import React from "react";
import "./CardContainer.css";
import OpenModalButton from "../../OpenModalButton";
import { handleDeleteQuestion } from "../../../clickHandlers/handleDeleteQuestion";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

export default function CardHeader({ user }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    return (
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


            {/* <OpenModalButton
                className="delete-question"
                modalComponent={
                    <div>
                        <button
                            onClick={(e) => handleDeleteQuestion(question.id, dispatch, closeModal)}
                        >
                            DELETE?
                        </button>
                    </div>
                }
                buttonText={ <i className="fa-solid fa-xmark fa-lg"></i>}
            /> */}
        </div>
    );
}
