import React from 'react';

import promote_svg from '../../assets/img/promote.svg';
import promote_1 from '../../assets/img/promote_1.png';

export default function PromoteCard() {
    return (
        <section className="coin-form">
            <div className="custom-card">
                <div className="custom-card-header text-center">
                    <img src={promote_svg} className="mx-auto" alt="promote-logo"></img>
                    <h1 className="mt-2">Promote your coin</h1>
                </div>
                <div className="custom-card-body">
                    <p>Get the visibility you need.</p>
                    <p>By promoting on coinhunt, your coin will be visible on top of all other coins.</p>
                    <img src={promote_1} className="mx-auto" alt="promote"></img>
                    <p>To promote your coin</p>
                    <a href="mailto:contact@100xhunt.cc">Mail to: contact@100xhunt.cc</a>
                </div>
                <div className="custom-card-footer">
                    Do never pay anyone for a promotion on our platform, unless you received a confirmation email from this address.
                </div>
            </div>
        </section>
    );
}
