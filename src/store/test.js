import Store from './index'
import reducer from '../reducer';
var store = new Store({}, reducer);

describe('Check instance store default property', () => {
    it('should have next properties: "_state", "_reducer", "_callbacks"', () => {
        let properties = ['_state', '_reducer', '_callbacks']

        properties.forEach(function (item) { 
            expect(store.hasOwnProperty(item)).toBe(true);
        })
    })
})

describe('Check class Store default property', () => {
    it('should have next properties: "dispatch", "getState", "subscribe"', () => {
        let properties = ['dispatch', 'getState', 'subscribe']

        properties.forEach(function (item) {
            expect(Object.getPrototypeOf(store).hasOwnProperty(item)).toBe(true);
        })
    })
})
