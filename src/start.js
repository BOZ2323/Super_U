// all the rendering takes place here

import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import {Welcome} from './welcome'; // if it is not default it has to be imported like this




let elem;
if (location.pathname === '/welcome'){
    elem = <Welcome />
} else{
    // elem = <img src="https://via.placeholder.com/300x175" />
    elem = <h1>superuser </h1>
}


ReactDOM.render(
    elem,
    document.querySelector('main')
);

// ReactDOM.render(
//     <Welcome />,
//     document.querySelector('main')
// );






// let elem;
// if (location.pathname == '/welcome'){
//     elem = <Welcome/>
// } else{
//     elem = <img src= "logo.gif" />;
// }
