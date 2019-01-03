import React from 'react';
import axios from './axios';

export class Uploader extends React.Component {
    constructor(props){
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.uploadProfile = this.uploadProfile.bind(this);
    }


    handleFileChange(e){
        this.file = e.target.files[0];
        this.uploadImage();

    }
    uploadProfile(){
        let formData = new FormData;
        formData.append('file', this.file);
        axios.post('/upProfile', formData)
            .then((response) => {
                this.props.setImage(response.data.users_bio);
                console.log('response',response);
            }).catch(function(err) {console.log(err);});
    }
    uploadImage(){
        let formData = new FormData;
        formData.append('file', this.file);
        axios.post('/upload', formData)
            .then((response) => {
                this.props.setImage(response.data.img_url);
                console.log('response',response);
            }).catch(function(err) {console.log(err);});
    }
    render(){
        return (
            <div className="friends_container">
                <h1 id="friends">upload your picture here</h1>
                <input className="button_farewell" onChange={this.handleFileChange} type="file" name="file" accept="image/*"/>

            </div>
        );
    }
}
