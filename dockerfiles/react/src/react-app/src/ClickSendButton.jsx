import React from "react"
import {createContext,useContext,useEffect,useState,useRef} from 'react'
import { UserMess } from './App'
import MesPr from './MesPr';
import axios from "axios"
import {v4 as uuidv4 } from "uuid";
                
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
            return(
                [...a]
            )
        });
    }, [refl]);

    const Requestapi = () =>{
        const baseURL = "http://localhost:10180";
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
            <MesPr mess={message}/>
            <form onSubmit={click}>
                <input type="text" placeholder="質問を入力"ref={question}/>
            </form>      
            <button onClick={click}>送信 ＞ </button>
        </div>
    );
};

export default ClickSendButton;

