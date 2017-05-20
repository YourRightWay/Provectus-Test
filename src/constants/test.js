import { UPDATE_STATE, UPDATE_NODE } from './index'

describe('Check action types', () => {
    it('should have next types: "UPDATE_STATE", "UPDATE_NODE"', () => {
        expect(UPDATE_NODE).toEqual('UPDATE_NODE');
        expect(UPDATE_STATE).toEqual('UPDATE_STATE');
    })
})
