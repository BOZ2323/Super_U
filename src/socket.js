
// front-end socket code here, this file sends data to front!

import * as io from 'socket.io-client';
import {
    onlineUsersEvent,
    userJoined,
    userLeft
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
            store.dispatch(userJoined(userWhoJoined));
        })
        // this is where we will listen for socket events
        // ie where you will write our front-end socket code
        // this fn is responsible for invoking socket
        socket.on('userLeft', (userWhoLeft) => {
            store.dispatch(userLeft(userWhoLeft));
        })
    }
}
