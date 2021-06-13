import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FiArrowUp } from 'react-icons/fi';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loading from '../Loading';

const dotenv = require('dotenv');

class Tr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coin: {},
            vote: false,
            loading: false
        }
        dotenv.config();
        this.server_url = process.env.REACT_APP_SERVER_URL;
    }

    componentDidMount() {
        this.setState({ coin: this.props.coin });
        if (localStorage.getItem(this.props.coin.id) !== null && localStorage.getItem(this.props.coin.id) === true) {
            this.setState({ vote: true });
        } else {
            this.setState({ vote: false });
        }
    }

    handleVotes = e => {
        e.preventDefault();
        this.setState({ loading: true });
        const id = e.target.id.replace('btn_', '');

        axios.put(`${this.server_url}/api/coinvote/${id}`, { updown: this.state.vote }).then(res => {
            if (this.state.vote) {
                this.setState({ coin: { ...this.state.coin, votes: this.state.coin.votes - 1 }, vote: false, loading: false });
                localStorage.setItem(this.state.coin.id, false);
            } else {
                this.setState({ coin: { ...this.state.coin, votes: this.state.coin.votes + 1 }, vote: true, loading: false });
                localStorage.setItem(this.state.coin.id, true);
            }
        }).catch(err => console.log('error: ', err));
    }

    redirect = () => {
        this.props.history.push(`/coin/${this.state.coin.id}`);
    }

    render() {
        const { coin, vote, loading } = this.state;

        return (
            <>
                {loading && <Loading />}
                <tr>
                    <td>
                        <div>
                            <img src={`${coin.logo}`} onClick={this.redirect} alt="logo"></img>
                            <div className="d-none d-sm-flex flex-column name-symbol">
                                <span onClick={this.redirect}>{coin.name} ({coin.symbol})</span>
                            </div>
                        </div>
                    </td>
                    <td>${coin.market_cap}</td>
                    <td>{(coin.date + '').substring(0, 10)}</td>
                    <td>
                        <button type="button" className={`btn btn-sm ${vote ? 'btn-success' : 'btn-outline-success'}`} id={`btn_${coin.id}`} onClick={this.handleVotes}>
                            {!vote && <FiArrowUp />}{' '}{coin.votes}
                        </button>
                    </td>
                </tr>
            </>
        )
    }
}

Tr.propTypes = { coin: PropTypes.object.isRequired };

export default withRouter(Tr);