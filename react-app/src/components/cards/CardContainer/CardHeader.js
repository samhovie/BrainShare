import React from "react";
import "./CardContainer.css";
import OpenModalButton from "../../modals/OpenModalButton";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

export default function CardHeader({ user }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    console.log(typeof user.username[0])

    return (
        <div className=" card flex space-between card-header">
            <div className="flex">
                <div className="flex center card-icon-container">
                    <i className={`fa-solid fa-${user.username[0].toLowerCase()} fa-xl`}></i>

                </div>

                <div className="flex flex-col header-text justify-center">
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
