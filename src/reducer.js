import {
    ACTION_UNFRIEND,
    ACTION_ACCEPT_REQUEST,
    ACTION_GET_FRIENDS_WANNA,
    ACTION_GET_ONLINE_USERS,
    ACTION_USER_JOINED,
    ACTION_USER_LEFT,
    ACTION_DISPLAY_MESSAGE
} from './constants';

console.log("/reducer.js works!");

export default function( state = {}, action ) {
    if (action.type == ACTION_GET_FRIENDS_WANNA){
        console.log('state', state.friendsWannabees);
        state = {
            ...state,
            friendsWannabees: action.friendsWannabees
        };
    } else if (action.type === ACTION_ACCEPT_REQUEST){
        state =  {
            ...state,
            friendsWannabees: state.friendsWannabees.map(
                friend => {
                    if(friend.id === action.value){
                        return {
                            ...friend,
                            accepted: true
                        };
                    } else {
                        return friend;
                    }
                }
            )
        };
    } else if (action.type === ACTION_UNFRIEND){
        state =  {
            ...state,
            friendsWannabees: state.friendsWannabees.filter(
                friend => (friend.id !== action.value )
            )
        };
    }else if (action.type === ACTION_GET_ONLINE_USERS){

        state =  {
            ...state,
            onlineUsers: action.value

        };
    }else if (action.type === ACTION_USER_JOINED){
        state =  {
            ...state,
            onlineUsers: [...state.onlineUsers, action.value]

        };
    }else if (action.type === ACTION_USER_LEFT){
        console.log('ACTION state', state);
        state =  {
            ...state,
            onlineUsers: [...state.onlineUsers.filter(user => user.id !== action.userId)]

        };
    }else if (action.type === ACTION_DISPLAY_MESSAGE){
        console.log('ACTION state', state);
        state =  {
            ...state,
            messages: state.messages

        };


    }
    return state;
}
