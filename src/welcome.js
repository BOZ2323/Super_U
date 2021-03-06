import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {Registration} from './registration';
import {Login} from './login';




export function Welcome() {
    return (
        <div id="welcome">
            <h1>welcome</h1>
            <img src="/logo.png" />

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />

                </div>
            </HashRouter>
        </div>
    );
}
