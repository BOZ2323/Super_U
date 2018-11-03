console.log("/reducer.js works!");

export default function(state = {}, action) {
    if (action.type == 'RECEIVE FRIENDS OR WANNABEES') {
        state = {
            ...state,
            friendsWannabees: action.friendsWannabees

        };
        console.log('reducer friendsWannabees', state.friendsWannabees);
    }
    // if (action.type == 'HOTIFY' || action.type == 'NOTIFY') {
    //     state = {
    //         ...state,
    //         users: state.users.map(
    //             user => {
    //                 if (user.id == action.id) {
    //                     return {
    //                         ...user,
    //                         hot: action.type == 'HOTIFY'
    //                     };
    //                 } else {
    //                     return user;
    //                 }
    //             }
    //         )
    //     };
    // }
    return state;
}

// the action.users in line 7 is the array I get back from the server
