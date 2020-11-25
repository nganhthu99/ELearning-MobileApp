import React, {useContext, useState} from 'react';
import {View, StyleSheet} from "react-native";
import SearchHistoryList from "./SearchHistory/search-history-list";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Provider/theme-provider";
import {SearchHistoryContext} from "../../Provider/search-history-provider";
import SearchBarSection from "./search-bar-section";

const Search = (props) => {
    // State
    const [searchInput, setSearchInput] = useState("")
    const {theme} = useContext(ThemeContext)
    const {searchHistory, setSearchHistory} = useContext(SearchHistoryContext)

    // Control
    const handleOnClickItem = (item) => {
        setSearchInput(item.content)
    }

    const handleSearchSubmit = () => {
        if (searchInput.length > 0) {
            const newHistory = searchHistory.slice()
            setSearchHistory(newHistory.concat({
                id: Math.floor(Math.random() * 100000),
                content: searchInput
            }))
            props.navigation.navigate(ScreenName.SearchResult)
        }
    }

    const handleSearchOnChange = (input) => {
        setSearchInput(input)
    }

    return (
        <View style={styles(theme).container}>
            <SearchBarSection
                handleOnChangeText={handleSearchOnChange}
                handleSubmit={handleSearchSubmit}
                searchInput={searchInput}
                navigation={props.navigation}/>
            <SearchHistoryList
                handleOnClickItem={handleOnClickItem}/>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
});

export default Search;
