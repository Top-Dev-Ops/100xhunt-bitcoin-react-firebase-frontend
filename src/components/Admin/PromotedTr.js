import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, InputGroup } from 'react-bootstrap';

const dotenv = require('dotenv');

class PromotedTr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coin: {}
        }
        dotenv.config();
        this.server_url = process.env.REACT_APP_SERVER_URL;
    }

    componentDidMount() {
        this.setState({ coin: this.props.coin });
    }

    handleAmount = e => {
        this.props.statusUpdate({ ...this.state.coin, pay_amount: Number(e.target.value) });
        this.setState({ coin: { ...this.state.coin, pay_amount: Number(e.target.value) } });
    }

    handleBanner = e => {
        this.props.statusUpdate({ ...this.state.coin, banner_url: e.target.value });
        this.setState({ coin: { ...this.state.coin, banner_url: e.target.value } });
    }

    handleBannerPosition = e => {
        if (e.target.value !== '') {
            this.props.statusUpdate({ ...this.state.coin, banner_position: e.target.value });
            this.setState({ coin: { ...this.state.coin, banner_position: e.target.value } });
        }
    }

    render() {
        const { coin } = this.state;

        return (
            <tr>
                <td>
                    <div>
                        <img src={`${coin.logo}`} alt="logo"></img>
                        <div className="d-none d-sm-flex flex-column">
                            <span>{coin.name} ({coin.symbol})</span>
                        </div>
                    </div>
                </td>
                <td>${coin.market_cap}</td>
                <td>{(coin.date + '').substring(0, 10)}</td>
                <td>
                    <Form.Check className="justify-content-center mb-2" type="checkbox" defaultChecked={coin.approved} disabled />{coin.approved && 'Approved'}
                </td>
                <td>
                    <Form.Check className="justify-content-center mb-2" type="checkbox" defaultChecked={coin.promoted} disabled />
                    {coin.promoted && 'Promoted'}
                </td>
                <td className="pay-amount">
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" name="pay_amount" placeholder="Paid Amount" defaultValue={coin.pay_amount} onChange={this.handleAmount} />
                        </InputGroup>
                    </Form.Group>
                </td>
                <td>
                    <Form.Group>
                        <Form.Control type="text" name="banner_url" placeholder="Banner URL" defaultValue={coin.banner_url} onChange={this.handleBanner} />
                    </Form.Group>
                </td>
                <td>
                    <Form.Control as="select" className="mr-sm-2" value={coin.banner_position} onChange={this.handleBannerPosition}>
                        <option value="">Choose...</option>
                        <option value="top">Top</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                    </Form.Control>
                </td>
            </tr>
        )
    }
}

PromotedTr.propTypes = {
    coin: PropTypes.object.isRequired,
    statusUpdate: PropTypes.func
};

export default withRouter(PromotedTr);