export default class Store {
    constructor() {
        this._callbacks = [];
    }

    dispatch(action) {
        
        function middleware (state) {
            if(typeof action === 'function') {
                return action(state)
            } 
            
            return action
        }
        
        this._state = this._reducer(this._state, middleware(this._state));
        this._callbacks.forEach(callback => callback())
    }

    get getState() {
        return this._state;
    }
    
    createStore (reducer) { 
        this._reducer = reducer;
        this.dispatch({ type: '__INIT'})
    }

    subscribe(callback) {
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter(cb => cb !== callback)
    }
}
