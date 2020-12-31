import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
  focusReducer,
  innerReducer,
  screenReducer,
  allScreensFocusReducer,
} from './redux-focus/focusReducer';
const reducers = combineReducers({
  focusState: focusReducer,
  innerFocusState: innerReducer,
  screenState: screenReducer,
  allScreensState: allScreensFocusReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
