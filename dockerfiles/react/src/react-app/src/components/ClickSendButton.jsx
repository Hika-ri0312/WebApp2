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
        // console.log(message.length)
        if(message.length === 0) return;
        setMessage((prev) =>{
            let a = [...prev] 
            a.push(refl.title)
            a.push(refl.source)
            a.push(<br></br>)
            if(refl.source != ""){
                if(refl.source1 != "") {
                    a.push("もしかして、こっち？")
                    a.push("その1")
                    a.push(refl.title1)
                    a.push(refl.source1)
                    if(refl.source2 != "") {
                        a.push("その2")
                        a.push(refl.title2)
                        a.push(refl.source2)
                        if(refl.source3 != "") {
                            a.push("その3")
                            a.push(refl.title3)
                            a.push(refl.source3)
                        }
                    }
                }
            }

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
        setMessage([])
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
            <div className={style.messagesText}>
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

