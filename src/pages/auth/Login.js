import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/all';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Background from '../../components/Background';
import Footer from '../../components/Footer';

// redux
import { connect } from 'react-redux';
import { loginUser, loginWithGoogle } from '../../redux/actions';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    setField = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = e => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(data, this.props.history);
    }

    loginWithGoogle = () => {
        this.props.loginWithGoogle(this.props.history);
    }

    render() {
        return (
            <>
                <Header />
                <Background />

                <section className="login-form">
                    <h1 className="text-white font-weight-bold">Login</h1>

                    <Form onSubmit={this.submit}>
                        <Form.Group>
                            <Form.Control type="email" name="email" placeholder="Email" onChange={this.setField} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.setField} />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-success w-100">Login</button>
                        </div>

                        {/* <StyledFirebaseAuth className="mt-5" uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} /> */}

                        <div className="d-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-light mt-5 w-100 d-flex justify-content-center align-items-center" onClick={this.loginWithGoogle}>
                                <FcGoogle className="mx-2" /><span>Login with Google</span>
                            </button>
                        </div>
                    </Form>

                    <strong className="text-white mt-4">Don't have an account? Signup <Link to="/signup">HERE</Link></strong>
                </section>

                <Footer />
            </>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = { loginUser, loginWithGoogle };

export default connect(mapStateToProps, mapActionsToProps)(Login);