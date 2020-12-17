export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS"
export const SIGN_OUT = "SIGN_OUT"
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS"

export const signInAction = (dispatch) => (response) => {
    dispatch({
        type: SIGNIN_SUCCESS,
        data: response.data
    })
}

export const signOutAction = (dispatch) => () => {
    dispatch({
        type: SIGN_OUT,
    })
}

export const updateProfileAction = (dispatch) => (response) => {
    dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        data: response.data
    })
}

