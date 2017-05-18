import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store';
import reducer from './reducer';
import { updateState, updateNode } from './actions'
import { getLocalStorage, setLocalStorage } from './utils'
import './style.scss';

import NavPanel from './components/nav-panel'
import FormGroup from './components/form-group'
import StateNotify from './components/state-notify'

let initialState = {
    testData: [
        {
            id: 1,
            name: 'Node 1',
            isChecked: true, 
            childs: [{
                id: 11,
                name: 'Node 1.1',
                isChecked: true,
            }],
        },
        {
            id: 2,
            name: 'Node 2',
            isChecked: false,
            childs: [{
                id: 21,
                name: 'Node 2.1',
                isChecked: true,
                childs: [{
                    id: 211,
                    name: 'Node 2.1.1',
                    isChecked: true,
                }]
            }, {
                id: 22,
                name: 'Node 2.2',
                isChecked: true,
                childs: [{
                    id: 221,
                    name: 'Node 2.2.1',
                    isChecked: true,
                }]
            }]
        }
    ]
}

let oneNode = {
    id: 1322321,
    name: 'Node 1.23431',
    isChecked: true,
};

var store = new Store(
        getLocalStorage('__data') !== null ? 
        getLocalStorage('__data') : initialState, 
    reducer);

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: ''
        };
        
        this.update = this.update.bind(this);
        this.updateNode = this.updateNode.bind(this);
        this.getData = this.getData.bind(this);
        this.parseState = this.parseState.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount () {
        store.subscribe(() => this.forceUpdate())
    }

    update() {
        store.dispatch(updateState({ id: 20,  name: 'Node 2.1', isChecked: true }))
        setLocalStorage("__data", store.getState)
    }

    updateNode () {
        store.dispatch(updateNode(221, oneNode))
        setLocalStorage("__data", store.getState)
    }
    
    getData () {
        this.setState({
            data: JSON.stringify(store.getState)
        })
    }

    handleChange(id) {
        store.dispatch(updateNode(id))
        setLocalStorage("__data", store.getState)
    }

    parseState(state) {

        let createItemState = state.map((data, index) => (
            <FormGroup key={data.id} checked={data.isChecked}
                       handleChange={this.handleChange}
                       id={data.id} name={data.name}>
                {
                    data.hasOwnProperty('childs') ? this.parseState(data.childs) : ''
                }
            </FormGroup>
        ))

        return createItemState
    }
    
    render () {
        return (
            <div>
                <div className='app'>
                    {this.parseState(store.getState.testData)}
                </div>
                
                <StateNotify data={this.state.data}/>
                
                <NavPanel getState={this.getData} 
                          updateState={this.update}
                          updateNode={this.updateNode}/>
                
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);















//
// class App extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             store: testdata
//         };
//
//         this.parseState = this.parseState.bind(this)
//     }
//
//     parseState (state) {
//
//         let createItemState = state.map((data, index) => (
//             <Item key={data.id} checked={data.isChecked} id={data.id} name={data.name}>
//                 {
//                     data.hasOwnProperty('childs') ? this.parseState(data.childs) : ''
//                 }
//             </Item>
//         ))
//
//         return createItemState
//     }
//
//     render () {
//         let { store } = this.state;
//
//         return (
//             <div className='app'>
//                 {this.parseState(store)}
//             </div>
//         )
//     }
// }
//
// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );