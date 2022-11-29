import React from "react"
import {createContext,useContext,useEffect,useState,useRef} from 'react'
import { UserMess } from '../App'
import MesPr from './MesPr';
import axios from "axios"
import {v4 as uuidv4 } from "uuid";

import style from "./ClickSendButton.module.css"
                
const ClickSendButton = () =>{
    const question = useRef();
    const [message, setMessage] = React.useState([]);
    const [refl, setRefl] = React.useState([]);
    let inputMess
    useEffect(() => {
        if(message.length === 0) return;
        setMessage((prev) =>{
            let a = [...prev] 
            a.push(refl.title)
            a.push(<br></br>)
            return(
                [...a]
            )
        });
    }, [refl]);

    const Requestapi = () =>{
        const host = process.env.REACT_APP_IP_ADDR
        const baseURL = "http://" + host + ":10180";
/*
        axios.get(baseURL)
            .then(res => {
                setRefl(res.data)
            })
*/
        axios.post(baseURL, {
            "title": inputMess,
        })
            .then(res => {
                setRefl(res.data)
            })
    }

    const click = (event) => {
        event.preventDefault();
        const name = question.current.value;
        if(name === "") return;
        setMessage((prev) =>{
            let a = [...prev] 
            a.push(name)
            return(
              [...a]
            )
        });
        question.current.value = null;
        inputMess=name
        Requestapi()
    }; 
    return(
        <div>
            <div>
                <MesPr mess={message}/>
            </div>

            <div className={style.message}>
                <form onSubmit={click}>
                    <div >                    
                        <input className={style.text} type="text" placeholder="質問を入力"ref={question}/>
                        <button className={style.button} onClick={click}>送信 ＞ </button>                     
                    </div>
                </form>      
            </div>
        </div>
    );
};

export default ClickSendButton;

