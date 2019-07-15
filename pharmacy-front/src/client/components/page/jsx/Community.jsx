import React, { Component } from 'react';
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