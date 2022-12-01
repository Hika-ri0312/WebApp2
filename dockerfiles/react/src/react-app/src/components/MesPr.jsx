import React from 'react'

import style from "./MesPr.module.css"


const MesPr = ({mess}) => {
    
    if (mess.length === 0) return;
    return mess.map((mes,index) => (
        <div  key={index}>
            
            <a>{mes}</a>
            
            
        </div>
    ));
}

export default MesPr
