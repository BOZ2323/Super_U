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
        return (
            <div>
                <h1>chat running!!</h1>
                <div className = "chat-messages-container"ref={elem => (this.elem = elem)}>
                    <p>du bist spitze</p>
                    <p>du bist spitze</p>
                    <p>du bist spitze</p>
                    <p>du bist spitze</p>
                    <p>du bist spitze</p>
                    <p>du bist spitze</p>
                    <p>du bist spitze</p>
                    <p>du bist spitze</p>
                    <p>du bist spitze</p>


                </div>
                <textarea onKeyDown = {this.sendMessage}></textarea>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return(
        console.log('state', state)
    );

};

export default connect(mapStateToProps)(Chat);
