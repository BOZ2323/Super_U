import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import { Link } from 'react-router-dom';
import { Uploader } from './uploader';



export class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image: '',
            bio: '',
            first: '',
            last: '',
            id: '',
            error: false,
            uploaderIsVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
    }
    componentDidMount(){
        console.log('App component works');
        axios.get('/user').then(
            ({data}) => {
                console.log('data',data);
                const {image_url, bio, first, last, id} = data;
                this.setState({
                    image: image_url,
                    bio, first, last, id
                });
            }
        );
    }
    setImage(img){
        this.setState({
            image: img,
            uploaderIsVisible: false
        });

    }
    showUploader(){
        console.log('uploader works');
        console.log(this.state.uploaderIsVisible);
        this.setState({
            uploaderIsVisible: true
        });
    }
    render(){
        if(!this.state.id){
            return null;
        }
        return (
            <div>
                <ProfilePic
                    image ={this.state.image}
                    first ={this.state.first}
                    last ={this.state.last}
                    id ={this.state.id}
                    clickHandler={this.showUploader}
                />
                <img src = "/logo.png"/>
                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage}/>}

            </div>

        );
    }
}

export function ProfilePic(props){
    if(!props.id){
        return <img src="practice-cartoon.png"/>
    }
    else{
        console.log('props.image_url:', props.image);
        const image = props.image || '/logo.png'

        return(
            <img className="profilePic" onClick={props.clickHandler} src={image}/>

            // className ="image_title"
        );
    }
}
