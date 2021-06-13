import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import newsletter from '../../assets/img/newsletter.svg';

const dotenv = require('dotenv');

export default function NewsletterCard() {
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);

    dotenv.config();
    const server_url = process.env.REACT_APP_SERVER_URL;

    const submit = e => {
        e.preventDefault();
        setEmail('');
        axios.post(`${server_url}/api/subscribe`, { email: email }).then(res => {
            setShow(true);
        }).catch(err => console.log('err: ', err));
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <section className="newsletter-form">
            <div className="custom-card">
                <div className="newsletter-card">
                    <img src={newsletter} alt="newsletter"></img>
                    <div className="d-flex flex-column">
                        <h3 className="font-weight-bold mb-2">Subscribe to our newsletter</h3>
                        <span>Get the best hight potential coins right into your inbox.</span>

                        <Form className="mt-4" onSubmit={submit}>
                            <Form.Control type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            <button type="submit" className="btn btn-success text-uppercase mt-3 w-100">Submit</button>
                        </Form>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thank you for subcription</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}
