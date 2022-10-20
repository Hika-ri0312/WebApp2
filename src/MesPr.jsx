import React from 'react'

const MesPr = ({mess}) => {
    
    return mess.map((mes) => (
        <div>
            {mes}
        </div>
    ));
}

export default MesPr