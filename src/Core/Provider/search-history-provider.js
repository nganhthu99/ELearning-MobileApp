import React, {createContext, useState} from 'react';
const SearchHistoryContext = createContext()

const SearchHistoryProvider = (props) => {
    const [searchHistory, setSearchHistory] = useState([])
    return(
        <SearchHistoryContext.Provider value={{searchHistory, setSearchHistory}}>
            {props.children}
        </SearchHistoryContext.Provider>
    )
};

export { SearchHistoryContext, SearchHistoryProvider };
