// @flow
import * as React from 'react'
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';

import Header from '../../containers/Header';

type Props = {
    auth: Object,
    match: Object,
    location: Object,
    history: Object,
    signIn: Function,
    authenticated: any,
}

export default function (Component: React.AbstractComponent<Props>) {

    class Authentication extends React.Component<Props> {

        componentDidMount() {
            const {authenticated, history} = this.props;
            if (authenticated === null) {
                history.push("/signin");
            }
        }

        componentDidUpdate(prevProps) {
            const {authenticated, history} = this.props;

            if (!authenticated) {
                history.push("/signin");
            }
        }

        render() {
            if (this.props.authenticated) {
                return (
                    <React.Fragment>
                        <Header />
                        <Component {...this.props} />
                    </React.Fragment>
                );
            }
            return null;
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth };
    }

    return compose(
        connect(mapStateToProps),
        withRouter
    )(Authentication);
}