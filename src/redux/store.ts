import { createStore, combineReducers, applyMiddleware } from "redux";
import toggleReducer from "./formodal/reducer";
import toggleReducerapp from "./approve/reducer";
import toggleReducerNotify from "./notify/reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import loginReducer from "./Reducers/loginReducer";

const reducer = combineReducers({
  toggleReducer: toggleReducer,
  toggleReducerApp: toggleReducerapp,
  toggleReducerNotify: toggleReducerNotify,
  loginReducer: loginReducer,
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
