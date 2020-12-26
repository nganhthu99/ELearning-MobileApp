import React, {createContext, useState} from 'react';
import {themes} from "../../Globals/themes";
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
