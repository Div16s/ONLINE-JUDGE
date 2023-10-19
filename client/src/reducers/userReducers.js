import { USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants";

export const userUpdateReducer = (state={},action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {loading:true};
        case USER_UPDATE_SUCCESS:
            return {loading:false, userInfo: action.payload, success:true};
        case USER_UPDATE_FAIL:
            return {loading:false, error: action.payload, success:false};
    
        default:
            return state;
    }
}