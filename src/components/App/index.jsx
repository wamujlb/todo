// @flow
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../../pages/Home";
import Private from "../Auth/Private";
import Todos from "../../pages/Todos";
import SignIn from "../../pages/Sign/In";
import {fetchUser} from '../../actions/auth';

type Props = {
    fetchUser: Function,
}

class App extends React.PureComponent<Props> {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact path="/" component={Private(Home)} />
                    <Route path="/todos" component={Private(Todos)} />
                    <Route path="/signin" component={SignIn} />
                </React.Fragment>
            </Router>
        );
    }
}

export default connect(null, {fetchUser})(App)