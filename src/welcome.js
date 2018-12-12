import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {Registration} from './registration';
import {Login} from './login';




export function Welcome() {
    return (
        <div className="container">
            <div id="logo_welcome">SUPER(U)</div>
            

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />

                </div>
            </HashRouter>
        </div>
    );
}
