import React, { Component } from 'react';

import Tabs from './Tabs';
import Table from './Table';

// redux
import { connect } from 'react-redux';

class Content extends Component {
    constructor() {
        super();
        this.state = {
            tab: 'all',
            banner_top: '',
            banner_left: '',
            banner_right: ''
        };
    }

    selectTab = tab => { this.setState({ tab: tab }); }

    setPromotedCoins = coins => {
        coins.forEach(coin => {
            if (coin.banner_position === 'top') {
                this.setState({ banner_top: coin.banner_url });
            } else if (coin.banner_position === 'left') {
                this.setState({ banner_left: coin.banner_url });
            } else if (coin.banner_position === 'right') {
                this.setState({ banner_right: coin.banner_url });
            }
        });
    }

    render() {
        const { tab, banner_top } = this.state;
        const { user: { authenticated } } = this.props;

        return (
            <>
                {/* <img src={banner_left} alt="banner 2" className="d-none d-md-block banner-left"></img>
                <img src={banner_right} alt="banner 2" className="d-none d-md-block banner-right"></img> */}

                <section className="content">
                    <img src={banner_top} alt="banner 1" className="banner-top"></img>
                    {/* <img src={banner_left} alt="banner 2" className="d-block d-md-none banner-top"></img>
                    <img src={banner_right} alt="banner 2" className="d-block d-md-none banner-top"></img> */}

                    <Table type='promoted' setPromotedCoins={this.setPromotedCoins} />

                    <Tabs selectTab={this.selectTab} />
                    {tab === 'all' && <Table type='all' />}
                    {tab === 'today' && <Table type='today' />}
                    {tab === 'hunts' && authenticated && <Table type='hunts' />}
                </section>
            </>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Content);
