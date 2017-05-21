import Store from './index'
import reducer from '../reducer';
var store = new Store({}, reducer);

describe('Check instance store default property', () => {
    it('should have next properties: "_callbacks"', () => {
        const methods = Object.keys(store)
        expect(methods).toContain('_callbacks')
    })
})

describe('Check public API class Store default property', () => {
    it('should have next properties: "dispatch", "getState", "subscribe", "createStore"', () => {
        
        let properties = ['dispatch', 'getState', 'subscribe', 'createStore']
        
        properties.forEach(function (item) {
            expect(Object.getPrototypeOf(store).hasOwnProperty(item)).toBe(true);
        })
    })
})
