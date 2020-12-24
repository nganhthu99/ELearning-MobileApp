import React, {useContext} from 'react';
import {View, StyleSheet, FlatList} from "react-native";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {SearchHistoryContext} from "../../Core/Provider/search-history-provider";
import SearchHistoryItem from "./SearchHistory/search-history-item";
import SectionHeader from "../Common/section-header";
import {SearchInputContext} from "../../Core/Provider/search-input-provider";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";

const Search = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const {setSearchInput} = useContext(SearchInputContext)
    const {searchHistory, setSearchHistory} = useContext(SearchHistoryContext)

    // Control
    const handleOnClickHistoryItem = (item) => {
        setSearchInput(item.content)
    }

    const handleDeleteHistoryItem = (item) => {
        const newHistory = searchHistory.filter(returnItem => returnItem.id !== item.id)
        setSearchHistory(newHistory)
    }

    const handleDeleteAllHistory = () => {
        setSearchHistory([])
    }

    const renderItem = ({item}) => {
        return (
            <SearchHistoryItem
                key={item.id}
                item={item}
                handleOnClick={handleOnClickHistoryItem}
                handleDeleteButton={handleDeleteHistoryItem}
            />
        )
    }

    return (
        <FlatList
            data={searchHistory}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
                <View style={{
                    height: 1,
                    backgroundColor: theme.primary,
                    marginLeft: 5,
                    marginRight: 5
                }}/>
            )}
            ListHeaderComponent={() => (
                <SectionHeader title={i18n.t(strings.recent_searches)} type='delete'
                               handleOnClick={handleDeleteAllHistory}/>
            )}
            style={{paddingTop: 10}}
        />
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
});

export default Search;
