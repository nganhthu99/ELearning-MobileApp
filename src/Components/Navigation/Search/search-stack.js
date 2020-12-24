import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Search from "../../Search/search";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import Settings from "../../Settings/settings";
import {SearchHistoryProvider} from "../../../Core/Provider/search-history-provider";
import {AuthenticationContext} from "../../../Core/Provider/authentication-provider";
import SearchBarSection from "../../Search/search-bar-section";
import {SearchInputProvider} from "../../../Core/Provider/search-input-provider";
import SearchResultTab from "../../Search/SearchResult/search-result-tab";
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";

const Stack = createStackNavigator();

const SearchStack = () => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)

    return (
        <SearchHistoryProvider>
            <SearchInputProvider>
                <Stack.Navigator
                    headerMode='screen'
                    screenOptions={({navigation, route}) => ({
                        header: () => <SearchBarSection navigation={navigation}/>
                    })}>
                    <Stack.Screen name={ScreenName.Search}
                                  component={Search}
                                  options={(authenticationContext.state.isAuthenticated) ? {
                                      headerLeft: null,
                                      animationEnabled: true,
                                      title: i18n.t(strings.search)
                                  } : {
                                      animationEnabled: true,
                                      title: i18n.t(strings.search)
                                  }}/>
                    <Stack.Screen name={ScreenName.SearchResult}
                                  component={SearchResultTab}/>
                    <Stack.Screen name={ScreenName.CourseDetail}
                                  component={CourseDetail}
                                  options={{
                                      headerShown: false
                                  }}/>
                    <Stack.Screen name={ScreenName.AuthorDetail}
                                  component={AuthorDetail}/>
                    <Stack.Screen name={ScreenName.Settings}
                                  component={Settings}
                                  options={{title: i18n.t(strings.settings)}}/>
                </Stack.Navigator>
            </SearchInputProvider>
        </SearchHistoryProvider>
    )
}

export default SearchStack
