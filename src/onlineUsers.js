import React from 'react';
import { connect } from 'react-redux';

class OnlineUsers extends React.Component{
    constructor() {
        super()

    }
    render(){
        const { onlineUsers } = this.props;

        return(
            <div className="friends_container">
                <h1 id="friends">These users are online</h1>
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
