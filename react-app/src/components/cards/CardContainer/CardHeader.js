import React from "react";
import "./CardContainer.css";

export default function CardHeader({ user }) {
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

        <button className="delete flex center">
            <i className="fa-solid fa-xmark fa-lg"></i>
        </button>
    </div>
    )
}
