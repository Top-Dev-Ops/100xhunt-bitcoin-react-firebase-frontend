import React from 'react';

import Header from '../components/Header';
import Background from '../components/Background';
import Footer from '../components/Footer';
import NewsletterCard from '../components/Newsletter/NewsletterCard';

export default function Newsletter() {
    return (
        <>
            <Header />
            <Background />
            <NewsletterCard />
            <Footer />
        </>
    )
}