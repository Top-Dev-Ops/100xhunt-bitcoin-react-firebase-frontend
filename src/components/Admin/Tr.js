import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, InputGroup } from 'react-bootstrap';

const dotenv = require('dotenv');

class Tr extends Component {
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

    handleApprove = e => {
        this.props.statusUpdate({ ...this.state.coin, approved: e.target.checked });
        this.setState({ coin: { ...this.state.coin, approved: e.target.checked } });
    }

    handlePromote = e => {
        this.props.statusUpdate({ ...this.state.coin, promoted: e.target.checked });
        this.setState({ coin: { ...this.state.coin, promoted: e.target.checked } });
    }

    handleAmount = e => {
        this.props.statusUpdate({ ...this.state.coin, pay_amount: Number(e.target.value) });
        this.setState({ coin: { ...this.state.coin, pay_amount: Number(e.target.value) } });
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
                <td>{coin.votes}</td>
                <td>
                    <Form.Check className="justify-content-center mb-2" type="checkbox" defaultChecked={coin.approved} onChange={this.handleApprove} />{coin.approved && 'Approved'}
                </td>
                <td>
                    <Form.Check className="justify-content-center mb-2" type="checkbox" defaultChecked={coin.promoted} onChange={this.handlePromote} />
                    {coin.promoted && 'Promoted'}
                </td>
                <td>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" name="pay_amount" placeholder="Paid Amount" defaultValue={coin.pay_amount} onChange={this.handleAmount} />
                        </InputGroup>
                    </Form.Group>
                </td>
            </tr>
        )
    }
}

Tr.propTypes = { coin: PropTypes.object.isRequired, statusUpdate: PropTypes.func };

export default withRouter(Tr);