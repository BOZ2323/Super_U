import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import { Link } from "react-router-dom";


export class Logout extends React.Component {
    render(){
        return (
            <div>
                <button><Link to="/logout">log out</Link></button>
            </div>
        );
    }
}


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(e) {
        console.log('handleSubmit, this.state.first', this.state.first);
        axios.post('/login', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(result =>{
                console.log("login client post works!");
                if(result.data.success) {
                    console.log(result);
                    location.replace('/');
                } else {
                    this.setState({
                        error : true
                    });
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    }
    render() {
        return (
            <div className="register_container">
                {this.state.error && <p className="error">Something went wrong! Try again</p>}
                <input className = "login_input" name="email" placeholder="E-Mail address" onChange={this.handleChange} />
                <input className = "login_input" name="password" type="password" placeholder="Password" onChange={this.handleChange} />
                <div className="register">
                    <button className = "login" id="inputId" onClick={this.handleSubmit}>Login</button>
                </div>
            </div>

        );
    }
}
