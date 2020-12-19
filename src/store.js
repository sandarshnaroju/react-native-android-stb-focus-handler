import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import focusReducer from './redux-focus/focusReducer';
const reducers = combineReducers({
  focusState: focusReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
