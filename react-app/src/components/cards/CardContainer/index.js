import React from "react";
import "./CardContainer.css";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CardHeader from "./CardHeader";

export default function CardContainer({ obj, Card  }) {
    return (
        <>
            <div className=" card card-container">

                <CardHeader/>

                <Card obj={obj}/>
            </div>
        </>
    );
}
