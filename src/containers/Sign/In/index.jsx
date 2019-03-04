// @flow
import React from "react";
import { connect } from "react-redux";
import compose from 'recompose/compose';
import { withRouter } from "react-router";

import SignInPage from "../../../components/Sign/In";
import { signIn } from "../../../actions/auth";

type Props = {
    auth: Object,
    match: Object,
    location: Object,
    history: Object,
    signIn: Function,
}

class SignIn extends React.PureComponent<Props> {
    componentDidUpdate(prevProps) {
        if (!prevProps.auth && this.props.auth) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <SignInPage signIn={this.props.signIn} />
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default compose(
    connect(mapStateToProps, { signIn }),
    withRouter
)(SignIn)