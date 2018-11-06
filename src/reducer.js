import {
    ACTION_UNFRIEND,
    ACTION_ACCEPT_REQUEST,
    ACTION_GET_FRIENDS_WANNA,
    ACTION_GET_ONLINE_USERS
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
    }
    return state;
}
