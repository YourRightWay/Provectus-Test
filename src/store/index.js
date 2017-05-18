export default class Store {
    constructor(state, reducer) {
        this._state = state;
        this._reducer = reducer;
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

    subscribe(callback) {
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter(cb => cb !== callback)
    }
}
