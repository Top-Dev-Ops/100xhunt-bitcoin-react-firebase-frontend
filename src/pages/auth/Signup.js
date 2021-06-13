import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Background from '../../components/Background';
import Footer from '../../components/Footer';

// redux
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            errors: {}
        }
    }

    setField = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = e => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.signupUser(data, this.props.history);
    }

    render() {
        return (
            <>
                <Header />
                <Background />

                <section className="login-form">
                    <h1 className="text-white font-weight-bold">Signup</h1>

                    <Form onSubmit={this.submit}>
                        <Form.Group>
                            <Form.Control type="text" name="name" placeholder="Name" onChange={this.setField} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="email" name="email" placeholder="Email" onChange={this.setField} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.setField} />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-success w-100">Signup</button>
                        </div>
                    </Form>

                    <strong className="text-white mt-5">Already have an account? Login <Link to="/login">HERE</Link></strong>
                </section>

                <Footer />
            </>
        );
    }
}

Signup.propTypes = {
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = { signupUser };

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Signup));