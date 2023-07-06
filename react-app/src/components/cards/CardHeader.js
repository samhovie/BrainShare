import React from "react";

export default function CardHeader({ user }) {

    return (
        <div className=" card flex space-between card-header">
            <div className="flex">
                <div className="flex center card-icon-container">
                    <i className={`fa-solid fa-${user.username[0].toLowerCase()} fa-xl`}></i>

                </div>

                <div className="flex flex-col header-text justify-center">
                    <div>
                        <p className="username">{user.username}</p>
                    </div>

                    <div>
                        <p>{user.degree}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
