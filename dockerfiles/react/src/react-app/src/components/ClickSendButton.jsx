import React from "react"
import {createContext,useContext,useEffect,useState,useRef} from 'react'
import { UserMess } from '../App'
import MesPr from './MesPr';
import axios from "axios"
import {v4 as uuidv4 } from "uuid";


import style from "./ClickSendButton.module.css"
                
const ClickSendButton = (props) =>{
    const question = useRef();
    const [message, setMessage] = React.useState([]);
    const [reflmes, setReflmes] = React.useState([]);
    const [refl, setRefl] = React.useState([]);
    const [visible, setVisible] = useState(false);
    const [visible_q, setVisible_q] = useState(false);

    useEffect(() =>{
        const name = props.conIn
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
        setVisible(false)
        setVisible_q(true)
        Requestapi()
    },[props.conIn])

    let inputMess
    useEffect(() => {
        // console.log(message.length)
        if(message.length === 0) return;
        setReflmes((prev) =>{
            let a = [] 
            //let a = [...prev] 
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
        console.log(inputMess)
        axios.post(baseURL, {
            "title": inputMess,
        })
            .then(res => {
                setRefl(res.data)
                setVisible(true)
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
        setVisible(false)
        setVisible_q(true)
        Requestapi()


    }; 


    return(
        <div>
            
            <div style={{ visibility: visible_q ? "visible" : "hidden" }}>
                <div className={style.balloon1_left}>
                    <MesPr mess={message}/>
                </div>
            </div>

            <div style={{ visibility: visible ? "visible" : "hidden" }}>
                <div className={style.balloon3_left}>
                    <MesPr mess={reflmes}/>
                </div>
            </div>
            
            
            <div className={style.message}>
                <form onSubmit={click}>
                    <div>                    
                        <input className={style.text} type="text" placeholder="質問を入力"ref={question} />
                        <button  className={style.flat_border} onClick={click}>送信 ＞ </button> 
                                            
                    </div>
                </form>      
            </div>
        </div>
    );
};


export default ClickSendButton;

