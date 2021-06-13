import React, { Component } from 'react';

import Tabs from './Tabs';
import Table from './Table';
import PromotedTable from './PromotedTable';

// redux
import { connect } from 'react-redux';

class Content extends Component {
    constructor() {
        super();
        this.state = { tab: 'all' };
    }

    selectTab = tab => { this.setState({ tab: tab }); }

    render() {
        const { tab } = this.state;

        return (
            <section className="content">
                <Tabs selectTab={this.selectTab} />

                {tab === 'all' && <Table />}
                {tab === 'promoted' && <PromotedTable />}
            </section>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Content);
