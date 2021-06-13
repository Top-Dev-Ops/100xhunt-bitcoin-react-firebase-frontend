import React, { Component } from 'react';
import { FaAlignJustify } from 'react-icons/all';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions';

import logo from '../assets/logo.jpg';

class Header extends Component {
    state = {
        isOpen: false,
        star: true,
    };

    handleToggle = () => { this.setState({ isOpen: !this.state.isOpen }); };

    logout = () => {
        this.props.logoutUser();
    }

    render() {
        const { authenticated, credentials: { admin } } = this.props.user;

        return (
            <section className="header">
                <nav className="navbar">
                    <Link to="/">
                        <span><img src={logo} alt="logo"></img>100xHunt</span>
                    </Link>
                    <div className="nav-center">
                        <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                            {/* <li><Link to="/simple">Simple</Link></li> */}
                            {admin !== undefined && admin === true && <li><Link to="/admin">Admin</Link></li>}
                            <li><Link to="/coin">Add coin</Link></li>
                            <li><Link to="/promote">Promote</Link></li>
                            <li><Link to="/newsletter">Newsletter</Link></li>
                            {authenticated ? <li><Link to="/" onClick={this.logout}>Logout</Link></li> : <li><Link to="/login">Login</Link></li>}
                        </ul>
                        <ul className="nav-mobile">
                            <li>
                                <button type="button" className="nav-btn" onClick={this.handleToggle}><FaAlignJustify className="nav-icon" /></button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </section>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });

const mapActionsToProps = { logoutUser };

Header.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(Header);
