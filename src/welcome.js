import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {Registration} from './registration';
import {Login} from './login';
import axios from './axios';

// function Welcome() {
//     return (
//         <div id="welcome">
//             <h1>Welcome!</h1>
//             <img src="/logo.png" />
//             <HashRouter>
//                 <div>
//                     <Route exact path="/" component={Registration} />
//                     <Route path="/login" component={Login} />
//                 </div>
//             </HashRouter>
//         </div>
//     );
// }


export function Welcome(props) {

    return (
        <div>
            <Login />
        </div>
    );
}
