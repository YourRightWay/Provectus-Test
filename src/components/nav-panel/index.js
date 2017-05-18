import React from 'react';

export default class NavPanel extends React.Component {
    render () {
        let { getState, updateState, updateNode } = this.props;
        return (
            <div className="nav-panel">
                <button onClick={getState}>Get Data</button>
                <button onClick={updateState}>Update State</button>
                <button onClick={updateNode}>Update Node</button>
            </div>
        )
    }
}
