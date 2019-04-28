import React from "react";
import "./css/Searchbar.css";
export default ({ query, onChange }) => {
    return (
        <div className="search-container">
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