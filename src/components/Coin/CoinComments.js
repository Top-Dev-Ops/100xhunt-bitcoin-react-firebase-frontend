import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import propTypes from 'prop-types';

import Comments from './Comments';

// redux
import { connect } from 'react-redux';

const dotenv = require('dotenv');

class CoinComments extends Component {
    constructor() {
        super();

        this.state = {
            comment: '',
            comments: []
        }
        dotenv.config();
        this.server_url = process.env.REACT_APP_SERVER_URL;
    }

    componentDidMount() {
        axios.get(`${this.server_url}/api/comments/${this.props.coin_id}`).then(res => {
            this.setState({ comments: res.data });
        }).catch(err => console.log(err));
    }

    setComments = e => {
        this.setState({ comment: e.target.value });
    }

    submit = () => {
        const { authenticated } = this.props.user;

        if (authenticated) {
            axios.post(`${this.server_url}/api/comment/${this.props.coin_id}`, { comment: this.state.comment })
                .then(res =>
                    axios.get(`${this.server_url}/api/comments/${this.props.coin_id}`)
                        .then(res => { this.setState({ comments: res.data }); }))
                .catch(err => console.log('err: ', err));
            this.setState({ comment: '' });
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        const { photo_url } = this.props.user.credentials;

        return (
            <section className="coin-comments-form" style={{ justifyContent: 'left' }}>
                <div className="coin-card" style={{ padding: '1rem' }}>
                    <div className="d-flex flex-column justify-content-center">
                        <Comments comments={this.state.comments} />
                    </div>

                    <div className="w-100 d-flex flex-column flex-md-row justify-content-around align-items-center">
                        <img className="mb-2 mb-md-0" src={photo_url === undefined ? 'https://i.ibb.co/WtsZ2J5/no-img.png' : photo_url} alt="avatar"></img>
                        <Form.Control className="mb-2 mb-md-0" type="text" name="comments" placeholder="What do you think about this coin?" value={this.state.comment} onChange={this.setComments} />
                        <button type="button" className="btn btn-success" onClick={this.submit}>Submit</button>
                    </div>
                </div>
            </section>
        );
    }
}

CoinComments.propTypes = { coin: propTypes.object, coin_id: propTypes.string };

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withRouter(CoinComments));