import axios from './axios';

// in this file  all the axios requests are dispatched

export async function getFriendsOrWannabees() {
    const { data } = await axios.get('/friendsOrWannabees');
    return {
        type: 'RECEIVE FRIENDS OR WANNABEES',
        friendsWannabees: data
    };
}


//////////// from Davids notnotnot ////////////////////////


export async function receiveUsers() {
    const { data } = await axios.get('/users');
    return {
        type: 'RECEIVE_USERS',
        users: data.users
    };
}

export async function hotify(id) {
    console.log(
        await axios.post('/hot/' + id)
    );
    return {
        type: 'HOTIFY',
        id
    };
}

export async function notify(id) {
    console.log(
        await axios.post('/not/' + id)
    );
    return {
        type: 'NOTIFY',
        id
    };
}
