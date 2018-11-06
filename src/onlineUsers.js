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
            <div>
                <h1>onlineUsers</h1>
                {onlineUsers.map(
                    user => (
                        <ul key={user.id}>
                            <li>
                                {user.first} {user.last}
                            </li>
                        </ul>
                    ))}
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
