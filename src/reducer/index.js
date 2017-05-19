import { UPDATE_STATE, UPDATE_NODE } from '../constants'
import initialState from '../initionStateData'

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case UPDATE_STATE:
            return Object.assign({}, {testData: action.updateState});

        case UPDATE_NODE:
            return Object.assign({}, {testData: action.updateNode});

        default:
            return state;
    }
}
