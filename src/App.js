import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { history } from './helpers';

// core components
import Admin from "layouts/Admin.js";
import SignIn from "views/SingIn/SingIn";
import ReactNotification from 'react-notifications-component'

function App (){

    return (
        <>
            <ReactNotification/>
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" component={SignIn} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/moderator" component={Admin} />
                    <Redirect from="/" to="/admin/dashboard" />
                </Switch>
            </Router>
        </>
    );
}

export default App;