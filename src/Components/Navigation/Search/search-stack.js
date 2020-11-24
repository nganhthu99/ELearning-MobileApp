import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Search from "../../Search/search";
import SearchResult from "../../Search/SearchResult/search-result";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";
import {LanguageContext} from "../../../Provider/language-provider";
import Settings from "../../Settings/settings";
import {TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {SearchHistoryProvider} from "../../../Provider/search-history-provider";
const Stack = createStackNavigator();

const SearchStack = () => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    return (
        <SearchHistoryProvider>
            <Stack.Navigator
                screenOptions={({navigation, route}) => ({
                    headerStyle: {
                        backgroundColor: theme.navigationBar,
                    },
                    headerTitleStyle: {
                        color: theme.primaryEmphasis,
                        fontWeight: 'bold'
                    },
                    headerBackTitleVisible: false,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Settings')
                            }}
                        >
                            <Icon
                                type='ionicons'
                                name='settings'
                                color={theme.primaryEmphasis}
                                size={28}
                            />
                        </TouchableOpacity>
                    ),
                    headerRightContainerStyle: {
                        padding: 5,
                    }
                })}>
                <Stack.Screen name={ScreenName.Search}
                              component={Search}
                              options={{
                                  headerLeft: null,
                                  animationEnabled: true,
                                  title: language.search
                              }}/>
                <Stack.Screen name={ScreenName.SearchResult}
                              component={SearchResult}
                              options={{
                                  animationEnabled: true,
                                  title: language.searchResult
                              }}/>
                <Stack.Screen name={ScreenName.CourseDetail}
                              component={CourseDetail}
                              options={{title: language.courseDetail}}/>
                <Stack.Screen name={ScreenName.AuthorDetail}
                              component={AuthorDetail}
                              options={{title: language.authorDetail}}/>
                <Stack.Screen name={ScreenName.Settings}
                              component={Settings}
                              options={{title: language.settings}}/>
            </Stack.Navigator>
        </SearchHistoryProvider>
    )
}

export default SearchStack
