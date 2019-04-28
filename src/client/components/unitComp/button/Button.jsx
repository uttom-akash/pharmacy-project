import React from 'react'
import './Button.css'

export default ({ onClick, icon, id, text }) => {
    return (
        <div onClick={onClick} className="btn-container" id={id}>
            <i class={icon}></i>
            {text}
        </div>
    )

};
