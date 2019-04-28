import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import './ToolTip.css';
export default class ToolTip extends Component {
    state = {
        Open: false
    }

    toggle = () => this.setState({ Open: !this.state.Open });

    render() {
        const { url, icon, text, target } = this.props;
        return (
            <div className="tool">
                <a href={url} id={target} className="anchor">
                    <i className={icon}></i>
                </a>

                <Tooltip isOpen={this.state.Open} autohide={false} target={target} toggle={this.toggle}>
                    {text}
                </Tooltip>
            </div>
        );
    }
}