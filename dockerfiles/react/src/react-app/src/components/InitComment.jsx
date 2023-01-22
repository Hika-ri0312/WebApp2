import React from "react"

import style from "./InitComment.module.css"

import background from "../Webapp2_Q-bo.png";


const InitComment = ({}) =>{
    return(
        <div>

            <div className={style.balloon5}>
                <div className={style.faceicon}>
                    <img src={background}/>
                </div>
                <div className={style.chatting}>
                    <div className={style.says}>
                        <p>Q-boへようこそ。<br/>こちらでは琉球大学の情報に関するご質問を承っております。</p>
                    </div>
                </div>
            </div>

            <div className={style.balloon6}>
                <div className={style.faceicon}>
                    <img src={background}/>
                </div>
                <div className={style.chatting}>
                    <div className={style.says}>
                        <p>質問を入力してください。<br/>（例）<br/>-->夏季休業はいつからですか？</p>
                    </div>
                </div>
            </div>

        </div>
    )
    
};


export default InitComment;

