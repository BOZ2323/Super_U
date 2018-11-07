import axios from './axios';
import {
    ACTION_UNFRIEND,
    ACTION_ACCEPT_REQUEST,
    ACTION_GET_FRIENDS_WANNA,
    ACTION_GET_ONLINE_USERS,
    ACTION_USER_JOINED,
    ACTION_LOGGED_OUT
} from './constants';


// in this file  all the axios requests are dispatched

export async function getFriendsOrWannabees() {
    const { data } = await axios.get('/friendsOrWannabees');
    console.log('data action', data);
    return {
        type: ACTION_GET_FRIENDS_WANNA,
        friendsWannabees: data.data
    };

}

export async function acceptFriendRequest(id) {
    const { data } = await axios.post('/accept-friend-request', { id });
    return {
        type: ACTION_ACCEPT_REQUEST,
        value: id
    };
}

export async function unfriend(id) {
    const { data } = await axios.post('/end-friendship', { id });
    return {
        type: ACTION_UNFRIEND,
        value: id
    };
}

export function onlineUsersEvent(onlineUsers){
    console.log("onlineUsers action fired!", onlineUsers);
    return {
        type: ACTION_GET_ONLINE_USERS,
        value: onlineUsers
    };
}
export function userJoined(userWhoJoined){
    console.log("userWhoJoined action fired!", userWhoJoined);
    return {
        type: ACTION_USER_JOINED,
        value: userWhoJoined
    };
}
export function userLeft(userWhoLeft){
    console.log("Action: onlineUsers action userWhoLeft!", userWhoLeft);
    return {
        type: ACTION_LOGGED_OUT,
        value: userWhoLeft
    };
}