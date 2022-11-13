import React from 'react'

const MesPr = ({mess}) => {
    
    if (mess.length === 0) return;
    return mess.map((mes,index) => (
        <li key={index}>
            {mes} 
        </li>
    ));
}

export default MesPr
