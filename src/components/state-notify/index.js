import React from 'react';

export default class StateNotify extends React.Component {
    render () {
        let { data } = this.props;
        return (
            <div className="get-state">
                <span>{data}</span>
            </div>
        )
    }
}
