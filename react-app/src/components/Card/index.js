import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Card.css";

export default function Card() {
    return (
        <>
            <div id="nav-space"></div>
            <div className=" card card-container">
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

                    <div>
                        <i class="fas fa-times"></i>
                    </div>
                </div>

                <div>
                    <p className="title-lg">
                        What is the last place that you went to this year?
                    </p>
                </div>
                <div>
                    <p>
                        I went to this place along the river where there is a
                        lot of fish to catch and birds to look at. I wish there
                        was a place that I could go to to see what I want tot do
                        so that I have more things to say and I want to have
                        dots on this when I run our of space so I'm writing a
                        bunch
                    </p>
                </div>

                <div></div>
            </div>
        </>
    );
}
