import React, { Component } from 'react';
import { Spinner, Modal, ModalBody, ModalHeader } from 'reactstrap'
import './Ask.css'
import Button from '../button/Button';

class Ask extends Component {
    state = {
        title: "",
        tag: "",
        image: null,
        imageName: "",

        tags: [],
        images: [],
        imagesName: [],

        ask: "",
        error: {},
        loading: false
    };

    onFileChange = ev => {
        const pro = ev.target.files[0];
        if (!pro) return;

        this.setState({ imageName: pro.name })


        let reader = new FileReader();
        reader.onload = ev => {
            this.setState({ image: reader.result });
        };

        reader.readAsDataURL(pro);
    };

    onFilePush = () => {
        const { image, imageName, images, imagesName } = this.state;
        let tempNames = imagesName;
        tempNames.push(imageName);

        let tempImages = images;
        tempImages.push(image);


        this.setState({ imagesName: tempNames, images: tempImages, imageName: "", image: null });
    }


    onTagPush = () => {
        const { tags, tag } = this.state;
        let tempTags = tags;
        tempTags.push(tag);
        this.setState({ tags: tempTags, tag: "" });
    }




    onChange = ev => this.setState({ [ev.target.name]: ev.target.value });

    onSubmit = ev => {
        ev.preventDefault();
        const { userName, userEmail, password, profilePicture } = this.state;
        let error = {};
        error = this.onValidate();
        this.setState({ error });

        console.log(Object.keys(error));

        if (Object.keys(error).length === 0) {
            this.setState({ loading: true });
            this.props
                .onRegister({ userName, userEmail, password, profilePicture })
                .catch(err => {
                    this.setState({ loading: false });
                    error.global = err.response.data.error;
                    this.setState({ error });
                });
        }
    };

    // onValidate = () => {
    //     const { userEmail, password, confirmPassword, userName } = this.state;
    //     let error = {};
    //     if (!userName) error.userName = "user name can't be blank..";
    //     if (!password) error.password = "password can't be blank..";
    //     if (password !== confirmPassword)
    //         error.confirmPassword = "password doesn't match";
    //     if (!validator.isEmail(userEmail)) error.userEmail = "email is not valid..";

    //     return error;
    // };

    getView = () => {
        const {
            title,
            tag,
            imageName,
            ask,
            error,
            loading
        } = this.state;
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;

        return (
            <Modal isOpen={this.props.modal} centered={true} fade={true} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle} close={closeBtn}>Ask..</ModalHeader>
                <ModalBody>

                    <form onSubmit={this.onSubmit} className="ask-form">
                        <input className="title" type="text" name="title" value={title} onChange={this.onChange} placeholder="Title"></input>

                        <div className="tag-grp">
                            <input type="text" name="tag" value={tag} onChange={this.onChange} placeholder="#tags"></input>
                            <Button onClick={this.onTagPush} icon="fa fa-check" id="ok"></Button>
                        </div>

                        <input
                            type="file"
                            name="pro-pic"
                            onChange={this.onFileChange}
                            className="pro-file"
                            id="pic"
                            style={{ width: "0px", height: "0px", opacity: "0" }}
                        />
                        <div className="img-grp">
                            <label htmlFor="pic" className="file-chooser">
                                <i className="far fa-image" />
                            </label>
                            <Button onClick={this.onFilePush} icon="fa fa-check" id="ok"></Button>
                        </div>
                        <p>{imageName}</p>
                        <textarea type="text" name="ask" value={ask} onChange={this.onChange} placeholder="write here...."></textarea>

                        <button className="btn">Post</button>

                        {this.state.error.global && (
                            <div className="error">
                                <label>{this.state.error.global}</label>
                            </div>

                        )}
                    </form>
                </ModalBody>
            </Modal>
        );
    };

    render() {
        return (
            <React.Fragment>
                {this.state.loading ? (
                    <Spinner type="grow" className="spinner" />
                ) : (
                        this.getView()
                    )}
            </React.Fragment>
        );
    }
}

export default Ask;