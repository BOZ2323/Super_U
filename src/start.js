// all the rendering takes place here

import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import {Welcome} from './welcome'; // if it is not default it has to be imported like this
import {App} from './app';
import * as io from 'socket.io-client';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducer.js';
import {composeWithDevTools} from 'redux-devtools-extension';
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

// socket stuff
import {initSocket} from './socket';

let elem;
if (location.pathname === '/welcome'){
    elem = <Welcome />
} else{
    elem = (initSocket(store), //pass it the whole redux store as argument
    (
        <Provider store = {store}>
            <App />
        </Provider>
    )
    );

}


ReactDOM.render(
    elem,
    document.querySelector('main')
);
