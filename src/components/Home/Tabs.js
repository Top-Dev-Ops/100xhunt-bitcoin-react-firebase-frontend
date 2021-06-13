import React, { useState } from 'react';

// redux
import { useSelector } from 'react-redux';

function Tabs({ selectTab }) {
    const [tab, setTab] = useState('all');
    const { authenticated } = useSelector(state => state.user);

    return (
        <div className="row mb-2">
            <div className="col-md-8 col-xl-6 mt-5">
                <ul className="tabs">
                    <li className="nav-item">
                        <button className={tab === 'all' ? 'nav-link active' : 'nav-link'} id="all-tab" type="button" aria-controls="all" onClick={() => { setTab('all'); selectTab('all') }}>All time best</button>
                    </li>
                    <li className="nav-item">
                        <button className={tab === 'today' ? 'nav-link active' : 'nav-link'} id="today-tab" type="button" aria-controls="today" onClick={() => { setTab('today'); selectTab('today') }}>Today's best</button>
                    </li>
                    {authenticated && <li className="nav-item">
                        <button className={tab === 'hunts' ? 'nav-link active' : 'nav-link'} id="hunts-tab" type="button" aria-controls="hunts" onClick={() => { setTab('hunts'); selectTab('hunts') }}>Your hunts</button>
                    </li>}
                </ul>
            </div>
        </div>
    )
}

export default Tabs;