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
                        <p>Q-boへようこそ！<br/>ここでは琉球大学知能情報コースに関する質問にお答えします。</p>
                    </div>
                </div>
            </div>

            <div className={style.balloon6}>
                <div className={style.faceicon}>
                    <img src={background}/>
                </div>
                <div className={style.chatting}>
                    <div className={style.says}>
                        <p>質問を入力してください。<br/>（記入例）<br/>  ☞ 期末試験はいつからですか？</p>
                    </div>
                </div>
            </div>

        </div>
    )
    
};


export default InitComment;

