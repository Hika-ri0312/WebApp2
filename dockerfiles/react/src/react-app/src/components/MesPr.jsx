import React from 'react'

const MesPr = ({mess}) => {
    
    if (mess.length === 0) return;
    return mess.map((mes,index) => (
        <div key={index}>
            
            {mes}
        </div>
    ));
}

export default MesPr
