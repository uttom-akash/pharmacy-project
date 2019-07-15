import React, { Component } from 'react';
import { Popup,Button } from 'semantic-ui-react';
export default class ToolTip extends Component {
    state = {
        Open: false
    }

    toggle = () => this.setState({ Open: !this.state.Open });

    render() {
        const { url, icon, text, target } = this.props;
        return (
                <Popup content={text} trigger={<Button size='mini'><i className={icon}></i></Button>}/>
        );
    }
}