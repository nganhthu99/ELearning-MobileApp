import React, {createContext, useReducer} from 'react';
import {authenticationReducer} from "../Reducer/authentication-reducer";
import {signInAction, signOutAction, updateProfileAction} from "../Action/authentication-action";
const AuthenticationContext = createContext()

const AuthenticationProvider = (props) => {
    const [state, dispatch] = useReducer(authenticationReducer, {
        isAuthenticated: null,
        userInfo: null,
        token: null
    }, undefined)

    return(
        <AuthenticationContext.Provider
            value={{
                state,
                signIn: signInAction(dispatch),
                signOut: signOutAction(dispatch),
                updateProfile: updateProfileAction(dispatch)
            }}>
            {props.children}
        </AuthenticationContext.Provider>
    )
};

export { AuthenticationProvider, AuthenticationContext };
