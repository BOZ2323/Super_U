import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import { BrowserRouter,Link,Route} from 'react-router-dom';
import { Uploader } from './uploader';
import Opp from './opp';
import Profile from './profile';
import {ProfilePic} from './profilePic';
import Friends from './friends';
import {createStore} from 'redux';

// in App all it does, it dictates what happens when certain routes are acquired
// render, you send props (data!)
////// log out //////////////////////////////
export function Logout(props) {
    return <a href='/logout'>Log out</a>
}


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
                const {image_url, users_bio, first, last, id} = data;
                this.setState({
                    image: image_url,
                    users_bio, first, last, id
                });
            }
        );
    }
    setBio(bio) {
        this.setState({
            bio
        });
    }
    setImage(img){
        this.setState({
            image: img,
            uploaderIsVisible: false
        });

    }
    showUploader(){
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
                {/*friends button*/}
                <a className="buttonToFriends" href="/friends">Friends</a>
                <img src = "/logo.png"/>
                <BrowserRouter>
                    <div>
                        <Route
                            path="/profile"
                            render={props => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    id={this.state.id}
                                    bio={this.state.users_bio}
                                    image={this.state.url}
                                    setBio={this.setBio}
                                    clickHandler={this.showUploader}
                                />
                            )} />
                        <Route
                            exact path="/user/:id"
                            render={props => (
                                <Opp {...props} key={props.match.url} />
                            )}
                        />
                        <Route path="/friends" component={Friends} />




                    </div>
                </BrowserRouter>
                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage}/>}

            </div>

        );
    }
}
