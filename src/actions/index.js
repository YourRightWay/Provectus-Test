import { UPDATE_STATE, UPDATE_NODE } from '../constants'
import { warning } from '../utils'

export const updateState = (state) => {
    warning(state, ['number', 'string', 'boolean', 'symbol'], 'Update state');
    
    let data = state;

    if(!state) {
        console.error('New state must be array or object')
        data = [];
    } else if(!('map' in state)) {
        data = [];
        data.push(state);
    }

    return {type: UPDATE_STATE, updateState: data}
}

export const updateNode = (id, node) => (getState) => {
    warning(id, ['object', 'boolean', 'symbol'], 'Update node');
    
    let tempState = getState,  
        trigger = false;

    function parseState(state) {
        for(let i = 0; i < state.length; i++) {
            if(state[i].id === parseFloat(id)) {
                trigger = true;
                node ? state[i] = node : state[i].isChecked = !state[i].isChecked;
                break 
            } else {
                if(state[i].hasOwnProperty('childs')) {
                    parseState(state[i].childs);
                    if (trigger) { 
                        break 
                    }
                }
            }
        } 

        return state
    }
    
    return {type: UPDATE_NODE, updateNode: parseState(tempState.testData)}
}
