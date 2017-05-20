import * as actions from './index'
import { UPDATE_STATE, UPDATE_NODE } from '../constants'

describe('Testing actions', () => {
    it('Testing action "updateState"', () => {
        let data = [] || {};
        const expectedAction  = {
            type: UPDATE_STATE,
            updateState: data
        }
        expect(actions.updateState(data)).toEqual(expectedAction)
    })
})
