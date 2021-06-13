import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Tr from './Tr';
import Loading from '../Loading';

// redux
import { connect } from 'react-redux';
import { setLoading, stopLoading } from '../../redux/actions';
import { Button } from 'react-bootstrap';

const dotenv = require('dotenv');

class Table extends Component {
    constructor() {
        super();
        this.state = {
            coins: [],
            loading: false,
        }
        this.coins = [];

        dotenv.config();
        this.server_url = process.env.REACT_APP_SERVER_URL;
    }

    componentDidMount() {
        this.getCoins();
    }

    getCoins = () => {
        axios.get(`${this.server_url}/api/coins`).then(res => {
            this.setState({ coins: res.data });
        }).catch(err => console.log(err));
    }

    update = () => {
        axios.post(`${this.server_url}/api/statusupdate`, this.coins).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    }

    statusUpdate = (coin) => {
        let found = false;
        this.coins.map((item) => {
            if (item.id === coin.id) {
                found = true;
                item.approved = coin.approved;
                item.promoted = coin.promoted;
                item.pay_amount = coin.pay_amount;
            }
        });
        if (!found) this.coins.push(coin);
    }

    render() {
        const coins = this.state.coins.map((coin, index) => {
            return <Tr key={index} coin={coin} statusUpdate={this.statusUpdate} />
        });

        const { loading } = this.state;

        return (
            <section className="admin-table">
                {loading && <Loading />}
                <div>
                    <h3 className="text-white font-weight-bold d-inline">Approve coins</h3>
                    <Button variant="dark" className="px-5 mx-5 py-2 my-3" onClick={this.update}>Update</Button>
                </div>
                <section className="table">
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Market cap</th>
                                <th>Time since launch</th>
                                <th>Votes</th>
                                <th>Approve</th>
                                <th>Promote</th>
                                <th>Paid Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coins}
                        </tbody>
                    </table>
                </section>
            </section>
        )
    }
}

Table.propTypes = { type: PropTypes.string };

const mapStateToProps = state => ({ user: state.user });
const mapActionsToProps = { setLoading, stopLoading };

export default connect(mapStateToProps, mapActionsToProps)(Table);