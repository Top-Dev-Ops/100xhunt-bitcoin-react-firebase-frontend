import React from 'react';

import { Redirect } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Background from '../components/Background';
import CoinForm from '../components/Coin/CoinForm';
import Footer from '../components/Footer';

export default function AddCoin() {
    const { authenticated } = useSelector(state => state.user);

    return (
        <>
            { authenticated === true ? <section className="d-flex flex-column mt-0 pt-0">
                <Header />
                <Background />
                <CoinForm />
                <Footer />
            </section> : <Redirect to="/login" />
            }
        </>
    )
}

