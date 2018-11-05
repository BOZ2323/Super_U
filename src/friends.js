import React from 'react';
import { connect } from 'react-redux';
import {
    getFriendsOrWannabees,
    endFriendship,
    acceptRequest
} from "./actions";
import { Link } from "react-router-dom";


class Friends extends React.Component {
    constructor(){
        super();

    }
    componentDidMount(){
        console.log("friends component mounted");
        this.props.dispatch(getFriendsOrWannabees());
    }
    render() {
        const { friendsWannabees, dispatch } = this.props;

        return (
            <div>
                <h1>Hi friends!!</h1>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return{
        friendsWannabees: state.friendsWannabees
    };
};

export default connect (mapStateToProps)(Friends);
