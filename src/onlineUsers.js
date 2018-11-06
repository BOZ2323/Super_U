import React from 'react';
import { connect } from 'react-redux';

class OnlineUsers extends React.Component{
    constructor() {
        super()

    }
    render(){
        const { onlineUsers } = this.props;
        console.log('onlineUsers render', this.props.onlineUsers);
        return(
            <div>onlineUsers
                <ul>{onlineUsers.map(user => (<li key={user.id}>{user.first} {user.last}</li>)}</ul>)
            </div>
        )
    }

}

OnlineUsers.defaultProps = {
    onlineUsers: []
}

const mapStateToProps = state => {
console.log('state in mapSTate', state);
    return {
        onlineUsers: state.onlineUsers
    };

};

export default connect(mapStateToProps)(OnlineUsers);
