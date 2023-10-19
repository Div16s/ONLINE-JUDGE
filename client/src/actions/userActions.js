import axios from 'axios';
import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from '../constants/userConstants';

export const updateProfile = (user) => async (dispatch,getState) => {
    try {
        dispatch({type:USER_UPDATE_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config  = {
            headers: {
                "Content-type":"application/json",
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.post("https://localhost:8000/profile",user,config);

        dispatch({type:USER_UPDATE_SUCCESS,payload:data});

        dispatch({type:USER_LOGIN_SUCCESS,payload:data});

        localStorage.setItem("userInfo",JSON.stringify(data));

    } catch (error) {
        dispatch({type:USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
    }
}