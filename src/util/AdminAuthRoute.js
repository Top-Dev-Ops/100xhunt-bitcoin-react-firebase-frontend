import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AdminAuthRoute = ({ component: Component, authenticated, credentials: { admin }, ...rest }) => {
    console.log(admin);
    return (
        <Route
            {...rest}
            render={(props) =>
                admin !== undefined && admin === true ? <Component {...props} /> : <Redirect to='/' />}
        />
    );
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    credentials: state.user.credentials
});

AdminAuthRoute.propTypes = {
    user: PropTypes.object
};

export default connect(mapStateToProps)(AdminAuthRoute);