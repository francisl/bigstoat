import { compose, createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';


const composeStore = compose(
    applyMiddleware(thunkMiddleware)
)(createStore);

let reducers = combineReducers({
});

export default  composeStore(reducers);
