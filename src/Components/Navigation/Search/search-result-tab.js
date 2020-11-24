import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import React, {useContext} from 'react';
import CourseList from "../../CoursesList/VerticalCourseList/course-list";
import SearchResultAll from "../../Search/SearchResult/search-result-all";
import AuthorList from "../../AuthorList/VerticalAuthorList/author-list";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";
import {LanguageContext} from "../../../Provider/language-provider";

const SearchResultTab = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: theme.primaryEmphasis,
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontWeight: 'bold'
                },
                style: {
                    backgroundColor: theme.background,
                },
            }}
            backBehavior="none">
            <Tab.Screen name={ScreenName.SearchResultAll}
                        component={SearchResultAll}
                        options={{
                            title:language.allTab
                        }}
                        initialParams={{
                            courses:props.courses,
                            authors:props.courses,
                            navigation: props.navigation
                        }}/>
            <Tab.Screen name={ScreenName.CourseList}
                        component={CourseList}
                        options={{
                            title:language.courses
                        }}
                        initialParams={{
                            header: language.courses,
                            items:props.courses,
                            navigation: props.navigation
                        }}/>
            <Tab.Screen name={ScreenName.AuthorList}
                        component={AuthorList}
                        options={{
                            title:language.authors
                        }}
                        initialParams={{
                            header: language.authors,
                            items:props.authors,
                            navigation: props.navigation
                        }}/>
        </Tab.Navigator>
    )
};
export default SearchResultTab;
