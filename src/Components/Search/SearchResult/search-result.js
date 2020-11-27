import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import SearchResultTab from "../../Navigation/Search/search-result-tab";
import {authors, courses} from "../../../Data/data";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";
import {SearchHistoryContext} from "../../../Provider/search-history-provider";
import SearchBarSection from "../search-bar-section";
import SearchFilterList from "../search-filter-list";

const SearchResult = (props) => {
    const {theme} = useContext(ThemeContext)
    const {searchHistory, setSearchHistory} = useContext(SearchHistoryContext)
    // search bar
    const [searchInput, setSearchInput] = useState("")
    const [searchFocus, setSearchFocus] = useState(false)
    //search filter
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState(courses);

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
            {!searchFocus &&
                <SearchResultTab
                    authors={authors}
                    courses={courses}
                    navigation={props.navigation}/>
            }
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
