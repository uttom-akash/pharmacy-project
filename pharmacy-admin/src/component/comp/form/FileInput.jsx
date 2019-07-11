import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'

export default class FileInput extends Component {
    state = {
        pictureName:"",
        profilePicture:null
    };
    
    fileChange = ev => {
        const pro = ev.target.files[0];
        if (!pro) return;
    
        this.setState({ pictureName: pro.name });
        let reader = new FileReader();
        reader.onload = ev => {
          this.setState({ profilePicture: reader.result });
          this.props.onfileChange({profilePicture:reader.result,pictureName:pro.name})
        };
        reader.readAsDataURL(pro);
    };

    
    render() {
        return (
            <div>
                <Button
                    content="Choose File"
                    labelPosition="right"
                    icon="file"
                    onClick={() =>this.fileInputRef.click()}
                    inverted
                    color={'green'}
                />

                <input
                    ref={(ref)=>this.fileInputRef=ref}
                    type="file"
                    onChange={this.fileChange}
                    hidden
                />
            </div>
        )
    }
}
