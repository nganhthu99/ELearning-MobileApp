import {SIGN_OUT, SIGNIN_SUCCESS, UPDATE_PROFILE_SUCCESS} from "../Action/authentication-action";

export const authenticationReducer = (prevState, action) => {
    switch (action.type) {
        case SIGNIN_SUCCESS :
            return {
                ...prevState,
                isAuthenticated: true,
                userInfo: action.data.userInfo,
                token: action.data.token,
            }
        case SIGN_OUT:
            return {
                ...prevState,
                isAuthenticated: false,
                userInfo: null,
                token: null
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...prevState,
                userInfo: action.data.payload
            }
        default:
            throw new Error()
    }
}
