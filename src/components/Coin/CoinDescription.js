import React, { Component } from 'react';
import { SiWebpack, AiFillTwitterCircle, AiOutlineMedium, FaTelegramPlane, FaRegCopy } from 'react-icons/all';
import PropTypes from 'prop-types';

export default class CoinDescription extends Component {
    render() {
        const {
            description,
            name,
            ethereum_address,
            chain_address,
            logo,
        } = this.props.coin;

        return (
            <section className="coin-information-form" style={{ justifyContent: 'left' }}>
                <div className="coin-card">
                    <div className="row mb-4">
                        <img src={`${logo}`} className="mx-auto" alt="logo"></img>
                        <div className="coin-card-header">
                            <h2 className="text-white">{name}</h2>
                            <div className="row mx-0">
                                <a href="www.google.com"><SiWebpack className="social-link" /></a>
                                <a href="www.google.com"><AiFillTwitterCircle className="social-link" /></a>
                                <a href="www.google.com"><AiOutlineMedium className="social-link" /></a>
                                <a href="www.google.com"><FaTelegramPlane className="social-link" /></a>
                            </div>
                        </div>
                    </div>

                    {chain_address !== undefined && chain_address !== '' && <div className="row address justify-content-around mb-4">
                        <span>Binance Smart Chain: </span>
                        <span>{chain_address}</span>
                        <FaRegCopy className="ml-2" />
                    </div>}

                    {ethereum_address !== undefined && ethereum_address !== '' && <div className="row address justify-content-around mb-4">
                        <span>Ethereum: </span>
                        <span>{ethereum_address}</span>
                        <FaRegCopy className="ml-2" />
                    </div>}

                    <div className="row">
                        <p>{description}</p>
                    </div>
                </div>
            </section>
        );
    }
}

CoinDescription.propTypes = { coin: PropTypes.object };
