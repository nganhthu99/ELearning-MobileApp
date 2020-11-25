import React, {useContext, useState} from 'react';
import {StyleSheet, View} from "react-native";
import SearchResultTab from "../../Navigation/Search/search-result-tab";
import {authors, courses} from "../../../Data/data";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";
import {SearchHistoryContext} from "../../../Provider/search-history-provider";
import SearchBarSection from "../search-bar-section";

const SearchResult = (props) => {
    const [searchInput, setSearchInput] = useState("")
    const {theme} = useContext(ThemeContext)
    const {searchHistory, setSearchHistory} = useContext(SearchHistoryContext)

    const handleSearchOnChange = (input) => {
        setSearchInput(input)
    }

    const handleSearchSubmit = () => {
        if (searchInput.length > 0) {
            const newHistory = searchHistory.slice()
            setSearchHistory(newHistory.concat({
                id: Math.floor(Math.random() * 100000),
                content: searchInput
            }))
            props.navigation.push(ScreenName.SearchResult)
        }
    }

    return (
        <View style={styles(theme).container}>
            <SearchBarSection
                handleOnChangeText={handleSearchOnChange}
                handleSubmit={handleSearchSubmit}
                searchInput={searchInput}
                navigation={props.navigation}/>
            <SearchResultTab
                authors={authors}
                courses={courses}
                navigation={props.navigation}/>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
});

export default SearchResult;
