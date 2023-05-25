import React from "react";
import "./CardContainer.css";
import OpenModalButton from "../../modals/OpenModalButton";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { faker } from '@faker-js/faker';

export default function CardHeader({ user }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const randInt = Math.floor(Math.random() * 4);
    const degrees = ['B.A.', 'B.S.', 'M.A.', 'Ph.D']
    let lorem = faker.lorem.words(1)
    lorem = lorem.charAt(0).toUpperCase() + lorem.substring(1).toLowerCase();



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
                        <p>{degrees[randInt]} from {lorem} University</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
