import React from 'react';
import { connect } from 'react-redux';
import {
    getFriendsOrWannabees,
    unfriend,
    acceptFriendRequest
} from "./actions";
import { Link } from "react-router-dom";


class Friends extends React.Component {
    // constructor(){
    //     super();
    //
    // }
    componentDidMount(){
        console.log("friends component mounted");
        this.props.dispatch(getFriendsOrWannabees());


    }
    render() {
        const { friends, wannabees, dispatch } = this.props;
        console.log('friends and wannabees', friends, wannabees);

        if(!friends && !wannabees) {
            return null;
        }

        return (

            <div className="friends_container">
                <h1 id="friends">your friends</h1>
                {this.props.friends.map(
                    friendsWannabees => (
                        <div className ="friends_list" key={friendsWannabees.id}>
                            {friendsWannabees.first} {friendsWannabees.last}
                            <img className = "friends_image" src={friendsWannabees.image_url} />
                            <button className = "button_farewell" onClick={() => dispatch(unfriend(friendsWannabees.id))}>farewell</button>
                        </div>
                    )
                )}
                <h1 id="wannabees">want to be friends</h1>
                {this.props.wannabees.map(
                    friendsWannabees => (
                        <div className ="wannabees_list"key={friendsWannabees.id}>
                            {friendsWannabees.first} {friendsWannabees.last}
                            <img className ="friends_image" src={friendsWannabees.image_url} />

                            <button className = "button_farewell" onClick={() => dispatch(acceptFriendRequest(friendsWannabees.id))}>Accept</button>
                            {/* acceptFriendsRequest sends an action back to the reducer*/}
                        </div>
                    )
                )}
            </div>
        );
    }

}
const mapStateToProps = state => {
    console.log('state in mapSTate', state);
    return {
        friends: state.friendsWannabees && state.friendsWannabees.filter(
            f => f.accepted
        ),
        wannabees: state.friendsWannabees && state.friendsWannabees.filter(
            w => !w.accepted
        )
    };

};

export default connect(mapStateToProps)(Friends);
