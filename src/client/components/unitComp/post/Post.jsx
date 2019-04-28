import React, { Component } from 'react';
import back from '../../../assets/back.jpg'
import './Post.css'

class Post extends Component {
    state = {
        like: 0,
        less: true
    }


    onClick = () => this.setState({ like: this.state.like + 1 })

    onMore = () => this.setState({ less: !this.state.less })

    render() {
        const { like, less } = this.state;

        return (
            <div className="post" onClick={this.onMore}>
                <div className="title"><h4>how to pay for home delivary</h4></div>
                <div className="author">
                    <img></img>
                    <label id="name">by akash</label>
                    <label id="time">24 hours ago </label>
                </div>
                <div className="images" hidden={less}><img src={back} alt="post"></img></div>
                <div className="description" hidden={less}><p>1:bkash<br />2:on spot<br /> 3:card</p></div>
                <div className="tags"><div>#faq</div><div>#get_started</div></div>
                <hr />
                <div className="stats">
                    <i onClick={this.onClick} className="far fa-thumbs-up">{like}</i>
                    <i className="far fa-thumbs-down">11</i>
                    <i className="far fa-comment">12</i>
                </div>
                <hr hidden={less} />
                <div className="comment" hidden={less}>

                </div>
            </div>);
    }
}

export default Post;
