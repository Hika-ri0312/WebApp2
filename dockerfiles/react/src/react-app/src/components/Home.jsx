import React from "react";
import InitComment from "./InitComment";
import ClickSendButton from "./ClickSendButton";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import style from "./Home.module.css"

export const Home = () => {
    return (
        <div>
            <div className={style.home}>
                <Link to="/login">Login</Link>
            </div>
            
            <InitComment />
            <ClickSendButton />
        </div>
    );
  };


  