import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Tr from './Tr';

// redux
import { connect } from 'react-redux';
import { setLoading, stopLoading } from '../../redux/actions';

const dotenv = require('dotenv');

class Table extends Component {
    constructor() {
        super();
        this.state = {
            coins: []
        }
        dotenv.config();
        this.server_url = process.env.REACT_APP_SERVER_URL;
    }

    componentDidMount() {
        this.getCoins();
    }

    getCoins = () => {
        switch (this.props.type) {
            case 'promoted':
                axios.get(`${this.server_url}/api/coins/promoted`).then(res => {
                    this.setState({ coins: res.data });
                    this.props.setPromotedCoins(res.data);
                }).catch(err => console.log(err));
                break;
            case 'all':
                axios.get(`${this.server_url}/api/coins`).then(res => {
                    this.setState({ coins: res.data });
                }).catch(err => console.log(err));
                break;
            case 'today':
                axios.get(`${this.server_url}/api/coins/today`).then(res => {

                }).catch(err => console.log(err));
                break;
            case 'hunts':
                axios.get(`${this.server_url}/api/coins/hunt`).then(res => {

                }).catch(err => console.log(err));
                break;
            default:
                break;
        }
    }

    render() {
        const coins = this.state.coins.map((coin, index) => {
            return <Tr key={index} coin={coin} />
        });

        return (
            <>
                {this.props.type === 'promoted' && <h3 className="text-white font-weight-bold mt-5">Promoted coins</h3>}
                <section className="table">
                    <table className="w-100">
                        {this.props.type !== 'promoted' && <thead>
                            <tr>
                                <th>Name</th>
                                <th>Market cap</th>
                                <th>Time since launch</th>
                                <th>Votes</th>
                            </tr>
                        </thead>}
                        <tbody>
                            {coins}
                        </tbody>
                    </table>
                </section>
            </>
        )
    }
}

Table.propTypes = { type: PropTypes.string, setPromotedCoins: PropTypes.func };

const mapStateToProps = state => ({ user: state.user });
const mapActionsToProps = { setLoading, stopLoading };

export default connect(mapStateToProps, mapActionsToProps)(Table);