
// front-end socket code here, this file sends data to front!

import * as io from 'socket.io-client';
import {
    onlineUsersEvent,
    userJoined,
    userLeft,
    displayMessage,
    showLastTenMessages
} from "./actions";
let socket;

export function initSocket(store){
    if (!socket){
        socket = io.connect();
        socket.on('onlineUsersEvent', function(listOfUsers){
            store.dispatch(onlineUsersEvent(listOfUsers)); // dispatch means: start the redux
            console.log("listOfUsers", listOfUsers);


        });
        socket.on('userJoined', (userWhoJoined) => {
            console.log('socket.js userJoined', userWhoJoined);
            store.dispatch(userJoined(userWhoJoined));

        });
        socket.on('userLeft', (userWhoLeft) => {
            console.log('socket.js userLeft', userWhoLeft);
            store.dispatch(userLeft(userWhoLeft));

        });
        socket.on('showLastTenMessages', (message) => {
            console.log('socket.js showLastTenMessages', message);
            store.dispatch(showLastTenMessages(message));

        });
        socket.on('displayMessage', (message) => {
            console.log('socket.js displayMessage', message);
            store.dispatch(displayMessage(message));

        });
    }
    return socket;
}
