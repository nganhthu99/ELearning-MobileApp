import React, {createContext, useState} from 'react';
const SearchInputContext = createContext()

const SearchInputProvider = (props) => {
    const [searchInput, setSearchInput] = useState('')
    return(
        <SearchInputContext.Provider value={{searchInput, setSearchInput}}>
            {props.children}
        </SearchInputContext.Provider>
    )
};

export { SearchInputContext, SearchInputProvider };
