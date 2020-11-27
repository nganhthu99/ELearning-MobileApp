import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from "react-native";
import SearchHistoryList from "./SearchHistory/search-history-list";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Provider/theme-provider";
import {SearchHistoryContext} from "../../Provider/search-history-provider";
import SearchBarSection from "./search-bar-section";
import SearchFilterList from "./search-filter-list";
import {courses} from "../../Data/data";

const Search = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    // search history
    const {searchHistory, setSearchHistory} = useContext(SearchHistoryContext)
    // search bar
    const [searchInput, setSearchInput] = useState("")
    const [searchFocus, setSearchFocus] = useState(false)
    //search filter
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState(courses);

    // Control
    const handleOnClickHistoryItem = (item) => {
        setSearchInput(item.content)
    }

    const handleOnClickFilterItem = (item) => {
        setSearchInput(item)
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

    const handleSearchOnChange = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearchInput(text)
        } else {
            setFilteredDataSource(masterDataSource);
            setSearchInput(text)
        }
    }

    const handleSearchOnFocus = () => {
        setSearchFocus(true)
    }

    const handleSearchOnBlur = () => {
        setSearchFocus(false)
    }

    useEffect(() => {
        props.navigation.setOptions({
            headerShown: !searchFocus
        })
    },[searchFocus])

    return (
        <View style={styles(theme).container}>
            <SearchBarSection
                handleOnChangeText={handleSearchOnChange}
                handleSubmit={handleSearchSubmit}
                handleOnFocus={handleSearchOnFocus}
                handleOnBlur={handleSearchOnBlur}
                searchInput={searchInput}
                navigation={props.navigation}/>
            {searchFocus && <SearchFilterList
                handleOnClickItem={handleOnClickFilterItem}
                filteredDataSource={filteredDataSource}/>}
            {!searchFocus && <SearchHistoryList
                handleOnClickItem={handleOnClickHistoryItem}/>}
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
