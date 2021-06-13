import React, { useState } from 'react';

function Tabs({ selectTab }) {
    const [tab, setTab] = useState('all');

    return (
        <div className="row mb-2">
            <div className="col-md-8 col-xl-6 mt-5">
                <ul className="tabs">
                    <li className="nav-item">
                        <button className={tab === 'all' ? 'nav-link active' : 'nav-link'} id="all-tab" type="button" aria-controls="all" onClick={() => { setTab('all'); selectTab('all') }}>All coins</button>
                    </li>
                    <li className="nav-item">
                        <button className={tab === 'promoted' ? 'nav-link active' : 'nav-link'} id="promoted-tab" type="button" aria-controls="today" onClick={() => { setTab('promoted'); selectTab('promoted') }}>Promoted coins</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Tabs;