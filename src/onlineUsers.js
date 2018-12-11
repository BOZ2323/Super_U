import React from 'react';
import { connect } from 'react-redux';

class OnlineUsers extends React.Component{
    constructor() {
        super()

    }
    render(){
        const { onlineUsers } = this.props;

        return(
            <div>
                <h1 id="online_users">These users are online</h1>
                {onlineUsers.map(
                    user => (
                        <ul key={user.id}>
                            <li>
                                {user.first} {user.last}
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
