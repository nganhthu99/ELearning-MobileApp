import React, {createContext, useState} from 'react';
import {languages} from "../Globals/languages";
const LanguageContext = createContext()

const LanguageProvider = (props) => {
    const [language, setLanguage] = useState(languages.english)
    return(
        <LanguageContext.Provider value={{language, setLanguage}}>
            {props.children}
        </LanguageContext.Provider>
    )
};

export { LanguageContext, LanguageProvider };
