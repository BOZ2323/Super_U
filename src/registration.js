import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import { Link } from 'react-router-dom';


export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
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
        // console.log('handleSubmit, this.state.first', this.state.first);
        axios.post('/register', {

            first: this.state.first,
            last:this.state.last,
            email: this.state.email,
            password: this.state.password,

        })
            .then(result =>{
                console.log("registration client request works!");
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
            <div>
                {this.state.error && <p className="error">Something went wrong! Try again</p>}
                <input name="first" placeholder="First name" onChange={this.handleChange} />
                <input name="last" placeholder="Last name" onChange={this.handleChange} />
                <input name="email" placeholder="E-Mail address" onChange={this.handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Register</button>
                <button><Link to="/login">Click here to Log in!</Link></button>
            </div>

        );
    }
}
