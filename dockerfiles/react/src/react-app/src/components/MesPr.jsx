import React from 'react'

import reactStringReplace from "react-string-replace";
import style from "./MesPr.module.css"
const regExp = /(https?:\/\/\S+)/g;
//import style from "./MesPr.module.css"


const MesPr = ({mess}) => {
    
    if (mess.length === 0) return;
    return mess.map((mes,index) => (
        <div key={index}>
            <div>
                {reactStringReplace(mes, regExp, (match, i) => (
                    <a key={i} className={style.mesPr} href={match}>こちら</a>
                ))}
            </div>
        </div>
    ));
}

export default MesPr
