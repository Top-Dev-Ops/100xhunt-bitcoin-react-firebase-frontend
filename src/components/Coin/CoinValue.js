import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CoinValue extends Component {
    render() {
        const {
            date,
            market_cap,
            price,
        } = this.props.coin;

        return (
            <section className="coin-value-form" style={{ justifyContent: 'left' }}>
                <div className="coin-card" style={{ padding: '1rem' }}>
                    <p>Price</p>
                    <h3>{price}</h3>
                    <p>Market Cap</p>
                    <h3>{market_cap}</h3>
                    <p>Launch Date</p>
                    <h3>{date !== undefined && date.substring(0, 10)}</h3>
                </div>
            </section>
        );
    }
}

CoinValue.propTypes = { coin: PropTypes.object };
