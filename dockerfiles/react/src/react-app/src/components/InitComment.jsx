import React from "react"

import style from "./InitComment.module.css"

const InitComment = ({}) =>{
    return(
        <div>
            <div className={style.balloon1_left}>
                Q-boへようこそ。<br/>こちらでは琉球大学の情報に関するご質問を承っております。
            </div>
            <br/>
            <div className={style.balloon2_left}>
                質問を入力してください。<br/>（例）<br/>-->夏季休業はいつからですか？
            </div>
        </div>
    )
};

export default InitComment;

