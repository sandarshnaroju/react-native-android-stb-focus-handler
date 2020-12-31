import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
  mapsReducer,
  screenReducer,
  allScreensFocusReducer,
} from './redux-focus/focusReducer';
const reducers = combineReducers({
  mapsState: mapsReducer,
  screenState: screenReducer,
  allScreensState: allScreensFocusReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
