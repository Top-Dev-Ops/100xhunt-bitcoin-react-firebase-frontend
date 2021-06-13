import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.jpg';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="col-xl-10 offset-xl-1">
                    <Link to="/">Copyright © 2021. All Rights Reserved by 100xHunt</Link>
                    <img src={logo} alt="logo"></img>
                    <div>
                        <Link to="/disclaimer">Disclaimer</Link>
                        <Link to="/privacypolicy">Privacy Policy</Link>
                        <Link to="/terms">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        );
    }
}
