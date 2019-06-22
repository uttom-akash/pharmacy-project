import React from 'react'
import './Card.css'

export default ({ onClick, icon, title, description }) => {
    return (
        <div className="card" onClick={onClick}>
            <div className="card-icon">
                <i className={icon}></i>
            </div>
            <div className="card-body">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
}