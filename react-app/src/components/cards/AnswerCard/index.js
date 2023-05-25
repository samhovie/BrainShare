import React from "react";
import "./AnswerCard.css";
import "../Card.css";
import CardHeader from "../CardContainer/CardHeader";
import OpenModalButton from "../../modals/OpenModalButton";
import UpdateAnswerModal from "../../modals/UpdateAnswerModal";
import DeleteAnswerModal from "../../modals/DeleteAnswerModal";
import { useSelector } from "react-redux";

export default function AnswerCard({ answer }) {

    const sessionUser = useSelector((state) => state.session.user);
    // if (!answer.text) return null;
    return (
        <>
            <CardHeader user={answer.user} />
            <div>
                <p>{answer.text}</p>
            </div>

            {sessionUser.id === answer.user.id && (
                <div className="card card-button-row">
                    <OpenModalButton
                        className="delete-question"
                        modalComponent={<DeleteAnswerModal answer={answer} />}
                        buttonText="Delete"
                    />
                    <OpenModalButton
                        className="update-question"
                        modalComponent={<UpdateAnswerModal answer={answer} />}
                        buttonText="Update"
                    />
                </div>
            )}
        </>
    );
}
