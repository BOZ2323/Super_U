import React from 'react';
import {ProfilePic} from './profilePic';
import Bio from './bio';
import axios from './axios';
import { Uploader } from './uploader';
import { Link } from 'react-router-dom';





export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="profile">
                <h1>{this.props.first} {this.props.last}</h1>
                <ProfilePic
                    image={this.props.image}
                    first={this.props.first}
                    last={this.props.last}
                    id={this.props.id}
                    clickHandler={this.props.showUploader}
                    size="jumbo"
                />
                <Bio bio={this.props.bio} setBio={this.props.setBio} />
                <button><Link to="/friends">friends</Link></button>
            </div>
        );
    }
}
