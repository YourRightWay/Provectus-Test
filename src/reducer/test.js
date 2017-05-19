import reducer from './index'
import initialStateData from '../initionStateData'
import * as actions from '../actions'
import { UPDATE_STATE, UPDATE_NODE } from '../constants'

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialStateData)
    })
})
