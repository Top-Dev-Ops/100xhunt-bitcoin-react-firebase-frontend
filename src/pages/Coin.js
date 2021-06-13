import React, { Component } from 'react';

import axios from 'axios';

import Header from '../components/Header';
import Background from '../components/Background';
import CoinDescription from '../components/Coin/CoinDescription';
import CoinValue from '../components/Coin/CoinValue';
import CoinComments from '../components/Coin/CoinComments';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

// redux
import { connect } from 'react-redux';
import { setLoading, stopLoading } from '../redux/actions';

const dotenv = require('dotenv');

class Coin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            coin: {}
        }
        dotenv.config();
        this.server_url = process.env.REACT_APP_SERVER_URL;
    }

    componentDidMount() {
        const { id } = this.state;
        this.props.setLoading();
        axios.get(`${this.server_url}/api/coin/${id}`).then(res => {
            this.setState({ coin: res.data });
            this.props.stopLoading();
        }).catch(err => console.log(err));
    }

    render() {
        const { loading } = this.props.user;

        return (
            <>
                <section className="d-flex flex-column mt-0 pt-0">
                    <Header />
                    <Background />

                    {loading ? <Loading /> : <div className="row mx-0" style={{ minHeight: '100vh' }}>
                        <div className="col-12 col-lg-6 offset-lg-2">
                            <CoinDescription coin={this.state.coin} />
                        </div>
                        <div className="col-12 col-lg-2">
                            <CoinValue coin={this.state.coin} />
                        </div>
                        <div className="col-12 col-lg-8 offset-lg-2">
                            <CoinComments coin={this.state.coin} coin_id={this.state.id} />
                        </div>
                    </div>}
                    <Footer />
                </section>
            </>
        )
    };
}

const mapStateToProps = state => ({ user: state.user });
const mapActionsToProps = { setLoading, stopLoading };

export default connect(mapStateToProps, mapActionsToProps)(Coin);