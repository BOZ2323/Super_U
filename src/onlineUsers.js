import React from 'react';
import { connect } from 'react-redux';

class OnlineUsers extends React.Component{
    constructor() {
        super()

    }
    render(){
        const { onlineUsers } = this.props;

        return(
            <div className="onlineUsers">
                <div className="friends_container">
                    <h1 id="friends">users online</h1>
                    {onlineUsers.map(
                        user => (
                            <ul className ="friends_list" key={user.id}>
                                <li>
                                    <img className = "friends_image" src={user.image_url} />
                                    <p>{user.first} {user.last}</p>
                                    <br />

                                </li>
                            </ul>
                        ))}
                </div>
            </div>
        );
    }

}

OnlineUsers.defaultProps = {
    onlineUsers: []
};

const mapStateToProps = state => {

    return {
        onlineUsers: state.onlineUsers
    };

};

export default connect(mapStateToProps)(OnlineUsers);
