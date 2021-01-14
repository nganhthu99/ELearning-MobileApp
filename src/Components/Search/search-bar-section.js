import React, {useContext} from 'react';
import {View} from "react-native";
import {SearchBar} from "react-native-elements";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {SearchHistoryContext} from "../../Core/Provider/search-history-provider";
import {SearchInputContext} from "../../Core/Provider/search-input-provider";
import {ScreenName} from "../../Globals/constants";
import {getSearchHistoryService, searchService} from "../../Core/Service/course-service";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";

const SearchBarSection = (props) => {
    const {theme} = useContext(ThemeContext)
    const {searchInput, setSearchInput} = useContext(SearchInputContext)
    const {setSearchHistory} = useContext(SearchHistoryContext)
    const authenticationContext = useContext(AuthenticationContext)

    const handleOnChangeText = (text) => {
        setSearchInput(text)
    }

    const handleSubmit = () => {
        if (searchInput) {
            // setSearchHistory(preHistory => [...preHistory, {
            //     id: searchInput,
            //     content: searchInput
            // }])
            searchService(searchInput, authenticationContext.state.token)
                .then((response) => {
                    getSearchHistoryService(authenticationContext.state.token)
                        .then((response) => {
                            if (response.status === 200) {
                                setSearchHistory(response.data.payload.data)
                            }
                        })
                    props.navigation.push(ScreenName.SearchResult, {
                        courses: response.data.payload.courses,
                        authors: response.data.payload.instructors
                    })
                })
        }
    }

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5, paddingTop: 25, backgroundColor: theme.secondary}}>
            <SearchBar
                placeholder={i18n.t(strings.search)}
                inputStyle={{color: '#011534', fontSize: 15}}
                containerStyle={{flex: 1, height: 40, padding: 0}}
                inputContainerStyle={{height: 40, backgroundColor: theme.background}}
                lightTheme={true}
                value={searchInput}
                onChangeText={(text)=> handleOnChangeText(text)}
                onSubmitEditing={handleSubmit}
            />
        </View>
    )
};

export default SearchBarSection;
