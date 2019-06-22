import React from "react";
import "./Searchbar.css";
export default ({ query, onChange,id }) => {
    return (
        <div className="search-container" id={id}>
            <input
                type="text"
                placeholder="Search product..."
                className="search-text"
                value={query}
                onChange={onChange}
            />
            <div className="search-button">
                <i className="fa fa-search" />
            </div>
        </div>
    );
};