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
import OnlineUsers from './onlineUsers';
import Chat from './chat';




// in App all it does, it dictates what happens when certain routes are acquired
// render, you send props (data!)
////// log out //////////////////////////////

export function Logout() {
    return <a className="button_logout" href='/logout'>Log out</a>

}
///////// LINK TO MY PROFILE ///////////////////////
export function LinkToProfile() {
    return <a className="to-my-profile-bttn" href='/'>Profile</a>
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
            <div className="render_div">
                
                {/*friends button*/}
                <div className="menu">
                    <div className="menu_item">
                        <a href="/friends">MY FRIENDS</a>
                    </div>
                    <div className="menu_item">
                        <a href="/onlineUsers">WHO IS ONLINE</a>
                    </div>
                    <div className="menu_item">
                        <a href="/chat">CHAT</a>
                    </div>
                    <div className="menu_item">
                        <a href="/logout">LOGOUT</a>
                    </div>
                </div>
                <ProfilePic
                    image ={this.state.image}
                    first ={this.state.first}
                    last ={this.state.last}
                    id ={this.state.id}
                    clickHandler={this.showUploader}
                />

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
                        <Route path="/onlineUsers" component={OnlineUsers} />
                        <Route path="/chat" component={Chat} />


                    </div>
                </BrowserRouter>
                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage}/>}

            </div>

        );
    }
}
