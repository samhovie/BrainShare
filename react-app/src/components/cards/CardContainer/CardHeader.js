import React from "react";
import "./CardContainer.css";
import OpenModalButton from "../../modals/OpenModalButton";
import { handleDeleteQuestion } from "../../../clickHandlers/handleDeleteQuestion";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

export default function CardHeader({ user }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    return (
        <div className=" card flex space-between card-header">
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
                        <p>{user.username}</p>
                    </div>

                    <div>
                        <p>credential from University</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
