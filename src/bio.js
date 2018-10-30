// text area in the render , two button
// if else between two different option showing the button 'edit ' or
// as soon as you submit make a database request

import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';



export default class Bio extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            bioTextareaIsVisible: false,
            bio: '',
        };

        this.showTextarea=this.showTextarea.bind(this);
        this.hideTextarea=this.hideTextarea.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    showTextarea() {
        this.setState({
            bioTextareaIsVisible: true
        });
    }
    hideTextarea() {
        this.setState({
            bioTextareaIsVisible: false
        });
    }
    handleChange(e) {
        this.setState({
            bio: e.target.value
        });
        // console.log(this.state.bio);
    };
    handleSubmit() {
        axios.post('/add-bio.json', {
            bio: this.state.bio,

        })
            .then(result => {
                console.log("RESULT OF SAVING BIO: ", result);
                this.setState({
                    bioTextareaIsVisible: false,
                    bio: result.data.users_bio
                });

            })
            .catch(err => {
                console.log("Error in saving bio: ", err.message);
            })
    }

    render() {
        if(this.state.bioTextareaIsVisible) {
            return (
                <div>
                    <p>{this.props.bio || this.state.bio}</p>
                    <textarea id="textarea-bio"
                        onChange={this.handleChange}
                    ></textarea>
                    <br />
                    <button onClick={this.handleSubmit}>Save</button>
                    <button id="bttn-hide-textbio" onClick={this.hideTextarea}>Cancel</button>
                </div>
            );
        } else {
            return(
                <div>
                    <p id="displayed-bio">Updated: {this.state.bio || this.props.bio}</p>
                    <p><button id="bttn-show-textbio" onClick={this.showTextarea}>
                        Edit</button> your profile
                    </p>
                </div>
            )
        }
    }
}
