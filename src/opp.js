import React from 'react';
import axios from 'axios';


export default class Opp extends React.Component {
    constructor(){
        super();
        this.state = {

        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        console.log("opp component mounted");
        const oppId = this.props.match.params.id;
        console.log('opps id:', oppId);
        console.log('this.props.match', this.props.match);
        axios.get("/opp.json/" + oppId)
            .then((data) => {
                console.log('data',data);
                this.setState({
                    id: data.data.id,
                    first: data.data.first,
                    last: data.data.last,
                    email: data.data.email,
                    image_url: data.data.image_url,
                    users_bio: data.data.users_bio,
                });

            }).catch(err => {console.log('error in get request opp.json',err);
            });
    }
    render() {
        return (
            <div>
                <h1>Hi {this.state.first}{this.state.last}!!</h1>
                <img src={this.state.image_url} />
                <p>
                    {this.state.email}
                    {this.state.user_bio}
                </p>
            </div>
        );
    }
}








//axios request to the server to get data about the person whos page we are on
// we go to the page, the browser in return gives us information about the users
// component componentDidMount is a lifecycle method that run

//next steps to completing part 5
// make the route dynamic ( done in class)
// in componentDidMount make GET request to server to get info about the user whos
//page we are on, we have to take the id and send it to the server as part of the
//req.
//the server will somehow have to get access to the other persons id////
//capture other persons id
// query the db to get other persons info and then send it back to the client, then
// app.js component
// app should store other persons data in state and render it on the page

// check, if it is me that is logged in, just redirect back to the / route

// edge cases
// logged in user should NOT be able to view their page as Opp
// this.props.history.push('/')

//if you want to have Links to
