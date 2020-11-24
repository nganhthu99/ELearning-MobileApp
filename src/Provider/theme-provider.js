import React, {createContext, useState} from 'react';
import {themes} from "../Globals/themes";
const ThemeContext = createContext()

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.light)
    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export { ThemeContext, ThemeProvider };

/*
import React, {createContext, useState} from 'react';

const AuthenticationContext = createContext(null);

const AuthenticationProvider = (props) => {
    const user = localStorage.getItem("user");
    const [authentication, setAuthentication] = useState(user)
    return (
        <AuthenticationContext.Provider value={{authentication, setAuthentication}}>
            {props.children}
        </AuthenticationContext.Provider>
    )
};

export { AuthenticationProvider, AuthenticationContext };
 */
