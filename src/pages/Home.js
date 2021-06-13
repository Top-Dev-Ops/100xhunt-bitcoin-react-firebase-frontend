import React from 'react';

import Header from '../components/Header';
import Background from '../components/Background';
import Content from '../components/Home/Content';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

// redux
import { useSelector } from 'react-redux';

export default function Home() {
    const { loading } = useSelector(state => state.user);

    return (
        <section className="d-flex flex-column mt-5 pt-5 mt-md-0 pt-md-0">
            <Header />
            <Background />
            {loading ? <Loading /> : <Content />}
            <Footer />
        </section>
    )
}