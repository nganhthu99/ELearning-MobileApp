import React, {useContext, useEffect} from 'react';
import {View, FlatList} from "react-native";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {SearchHistoryContext} from "../../Core/Provider/search-history-provider";
import {SearchInputContext} from "../../Core/Provider/search-input-provider";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";
import {deleteSearchHistoryService, getSearchHistoryService} from "../../Core/Service/course-service";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import SearchHistoryItem from "./search-history-item";
import SectionHeader2 from "../Common/section-header-2";
import UnauthenticationView from "../Common/unauthentication-view";

const Search = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const {setSearchInput} = useContext(SearchInputContext)
    const {searchHistory, setSearchHistory} = useContext(SearchHistoryContext)
    const authenticationContext = useContext(AuthenticationContext)

    // Listen
    useEffect(() => {
        if (authenticationContext.state.isAuthenticated) {
            getSearchHistoryService(authenticationContext.state.token)
                .then((response) => {
                    if (response.status === 200) {
                        setSearchHistory(response.data.payload.data)
                    }
                })
        }
    }, [])

    // Control
    const handleOnClickHistoryItem = (item) => {
        setSearchInput(item.content)
    }

    const handleDeleteHistoryItem = (item) => {
        deleteSearchHistoryService(authenticationContext.state.token, item.id)
            .then((response) => {
                if (response.status === 200) {
                    const newHistory = searchHistory.filter(returnItem => returnItem.id !== item.id)
                    setSearchHistory(newHistory)
                }
            })
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

    if (!authenticationContext.state.isAuthenticated) {
        return (
            <UnauthenticationView navigation={props.navigation}/>
        )
    } else {
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
                    <SectionHeader2 title={i18n.t(strings.recent_searches)}/>
                )}
                style={{backgroundColor: theme.background, paddingTop: 10}}
            />
        )
    }
};

export default Search;
