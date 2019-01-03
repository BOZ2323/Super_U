import React from 'react';
import { connect } from 'react-redux';
import { initSocket } from './socket';



class Chat extends React.Component {
    constructor(){
        super();
        this.sendMessage = this.sendMessage.bind(this);

    }
    sendMessage(e){

        let socket = initSocket();
        if (e.which === 13 && !e.shiftKey){
            console.log("e.target.value: ", e.target.value);
            let message = e.target.value;
            socket.emit('newMessage', message);
        }
    }
    // this method will run every time the comp updates.
    // ie when user posts a new chat message
    componentDidUpdate(){
        // scrollTop only works if you have a scroll bar.
        this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;

    }

    render() {
        const { message } = this.props;

        return (
            <div className="friends_container" >
                <h1 id="friends">start talking!!</h1>
                <div className = "chat-messages-container"ref={elem => (this.elem = elem)}>
                    {message.map(
                        user => (
                            <ul key={user.id}>
                                <li id="chat_messages">
                                    {user.first} {user.last}   {user.message}
                                </li>
                            </ul>
                        ))}


                </div>
                <textarea onKeyDown = {this.sendMessage}></textarea>

            </div>
        );
    }

}
Chat.defaultProps = {
    message: []
};

const mapStateToProps = state => {
    return {
        message: state.message
    };

};

export default connect(mapStateToProps)(Chat);
