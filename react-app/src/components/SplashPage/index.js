import React from "react";
import "./SplashPage.css";
import LoginFormPage from "../LoginFormPage";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";

export default function SplashPage() {
    return (
        <div className="splash-page flex center ">
            <div className="splash-container flex justify-center flex-col">
                <div className="splash-title flex flex-col center">
                    <h1>SoundForum</h1>
                    <p>A space to share ideas and ask questions about music</p>
                </div>

                <div className="splash-content flex">
                    <div className="splash-content-left flex-col center ">
                        <OpenModalButton
                            buttonText="Sign Up"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>

                    <div className="splash-content-right flex flex-col">
                        <LoginFormPage></LoginFormPage>
                    </div>
                </div>
                <div className="splash-footer top"></div>
                <div className="splash-footer bottom"></div>
            </div>
        </div>
    );
}
