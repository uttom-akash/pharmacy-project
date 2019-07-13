import React, { Component } from 'react';
import Button from '../../unitComp/button/Button';
import Post from '../../unitComp/post/Post'

import '../css/Community.css'
class Community extends Component {
    state = {
        edit: false
    }

    ontoggle = () => this.setState({ edit: !this.state.edit });


    render() {
        const { edit } = this.state;

        return (<div className="community">
            <div className="left">
                <Button id="edit" onClick={this.ontoggle} icon={"far fa-edit"} />
                <Button id="tags" text="#tags" />
            </div>
            <div className="middle">
                <Post />
            </div>
            <div className="right">

            </div>
          </div>);
    }
}

export default Community;