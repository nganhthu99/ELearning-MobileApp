import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import SearchHistoryItem from "./search-history-item";
import SectionHeader from "../../Common/section-header";
import {ThemeContext} from "../../../Provider/theme-provider";
import {LanguageContext} from "../../../Provider/language-provider";
import {SearchHistoryContext} from "../../../Provider/search-history-provider";

const SearchHistoryList = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)
    const {searchHistory, setSearchHistory} = useContext(SearchHistoryContext)

    const handleDeleteAll = () => {
        setSearchHistory([])
    }

    const handleOnClickItem = (item) => {
        props.handleOnClickItem(item)
    }

    const handleDeleteItem = (item) => {
        const newHistory = searchHistory.filter(returnItem => returnItem.id !== item.id)
        setSearchHistory(newHistory)
    }

    return (
        <ScrollView style={styles(theme).container}>
            <View style={{padding: 5, paddingTop: 20}}>
                <SectionHeader handleOnClick={handleDeleteAll} title={language.recentSearches} type='delete'/>
            </View>
            {
                searchHistory.map((item) => {
                    return (
                        <View
                            key={item.id}
                            style={{height: 65,padding: 5,}}>
                            <SearchHistoryItem
                                key={item.id}
                                item={item}
                                handleOnClick={handleOnClickItem}
                                handleDeleteButton={handleDeleteItem} />
                        </View>
                    )
                })
            }
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});

export default SearchHistoryList;
