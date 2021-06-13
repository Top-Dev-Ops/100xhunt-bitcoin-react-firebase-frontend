import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const dotenv = require('dotenv');

class CoinForm extends Component {
    constructor() {
        super();

        this.state = {
            form: {
                date: new Date()
            },
            errors: {}
        }
        dotenv.config();
        this.server_url = process.env.REACT_APP_SERVER_URL;
    }

    setField = e => {
        this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
        if (!!this.state.errors[e.target.name]) {
            this.setState({ errors: { ...this.state.errors, [e.target.name]: null } });
        }
    }

    setDate = date => {
        this.setState({ form: { ...this.state.form, date: date } });
    }

    validation = () => {
        const { name, symbol, logo, price, market_cap } = this.state.form;
        const errors = {};
        (!name || name === '') && (errors.name = 'can not be blank.');
        (!symbol || symbol === '') && (errors.symbol = 'can not be blank');
        (!logo || logo === '') && (errors.logo = 'can not be blank');
        (!price || price === '') && (errors.price = 'can not be blank');
        (!market_cap || market_cap === '') && (errors.market_cap = 'can not be blank');
        return errors;
    }

    submit = e => {
        e.preventDefault();
        const errors = this.validation();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors: errors });
        } else {
            axios.post(`${this.server_url}/api/coin`, this.state.form).then(res => {
                this.props.history.push('/');
            }).catch(err => console.log('err: ', err));
        }
    }

    render() {
        const { form, errors } = this.state;

        return (
            <section className="coin-form">
                <h3 className="text-white font-weight-bold">Coin listing request</h3>

                <Form onSubmit={this.submit}>
                    <Form.Group>
                        <Form.Control type="text" name="name" placeholder="Name" onChange={this.setField} />
                        <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" name="symbol" placeholder="Symbol" onChange={this.setField} />
                        <Form.Control.Feedback type='invalid'>{errors.symbol}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" name="description" rows={3} placeholder="Description" onChange={this.setField} />
                        <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" name="telegram" placeholder="Telegram" onChange={this.setField} />
                        <Form.Control.Feedback type='invalid'>{errors.telegram}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" name="website" placeholder="Website" onChange={this.setField} />
                        <Form.Control.Feedback type='invalid'>{errors.website}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" name="chain_address" placeholder="Binance Smart Chain contract address" onChange={this.setField} />
                        <Form.Control.Feedback type='invalid'>{errors.chain_address}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" name="ethereum_address" placeholder="Ethereum contract address" onChange={this.setField} />
                        <Form.Control.Feedback type='invalid'>{errors.ethereum_address}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" name="other" rows={3} placeholder="Other links, other blockchain contracts or anything else you would like to add to your coin request" onChange={this.setField} />
                        <Form.Control.Feedback type='invalid'>{errors.other}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" name="logo" placeholder="Logo link" onChange={this.setField} />
                        <Form.Control.Feedback type='invalid'>{errors.logo}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" name="price" placeholder="Actual price" onChange={this.setField} />
                        </InputGroup>
                        <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" name="market_cap" placeholder="Actual market cap" onChange={this.setField} />
                        </InputGroup>
                        <Form.Control.Feedback type='invalid'>{errors.market_cap}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <DatePicker className="form-control" selected={form.date === undefined ? new Date() : form.date} onChange={e => this.setDate(e)} timeInputLabel="Time:" dateFormat="MM/dd/yyyy h:mm aa" showTimeInput />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-lg text-uppercase">Submit</button>
                    </div>
                </Form>
            </section>
        );
    }
}

export default withRouter(CoinForm);