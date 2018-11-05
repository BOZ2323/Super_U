import axios from './axios';

// in this file  all the axios requests are dispatched

export async function getFriendsOrWannabees() {
    const { data } = await axios.get('/friendsOrWannabees');
    return {
        type: 'RECEIVE FRIENDS OR WANNABEES',
        friendsWannabees: data
    };

}

export async function acceptFriendRequest(id) {
    const { data } = await axios.post('/accept-friend-request', { id });
    return {
        type: 'ACCEPT_REQUEST',
        status: id
    };
}

export async function unfriend(id) {
    const { data } = await axios.post('/end-friendship', { id });
    return {
        type: 'END_FRIENDSHIP',
        status: id
    };
}

export function onlineUsers(onlineUsers){
    console.log("onlineUsers action fired!", onlineUsers);
    return {
        type: 'END_FRIENDSHIP',
        status: id
    };
}
export function userJoined(userWhoJoined){
    console.log("onlineUsers action fired!", userWhoJoined);
    return {
        type: 'END_FRIENDSHIP',
        status: id
    };
}
export function userLeft(userWhoJoined){
    console.log("onlineUsers action fired!", userWhoJoined);
    return {
        type: 'END_FRIENDSHIP',
        status: id
    };
}
