import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {userUpdateReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    // userLogin: userLoginReducer,
    // userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
};

//creating middleware
const middleware = [thunk];

//creating store // (...)->spread operator
export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

