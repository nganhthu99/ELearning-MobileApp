import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import React, {useContext} from 'react';
import CourseList from "../../CoursesList/VerticalCourseList/course-list";
import SearchResultAll from "./search-result-all";
import AuthorList from "../../AuthorList/VerticalAuthorList/author-list";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";

const SearchResultTab = (props) => {
    const {theme} = useContext(ThemeContext)

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: theme.emphasis,
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
                            title: i18n.t(strings.all)
                        }}
                        initialParams={{
                            courses:props.route.params.courses,
                            authors:props.route.params.authors,
                            navigation: props.navigation
                        }}/>
            <Tab.Screen name={ScreenName.CourseList}
                        component={CourseList}
                        options={{
                            title: i18n.t(strings.courses)
                        }}
                        initialParams={{
                            header: i18n.t(strings.courses),
                            items:props.route.params.courses.data,
                            navigation: props.navigation
                        }}/>
            <Tab.Screen name={ScreenName.AuthorList}
                        component={AuthorList}
                        options={{
                            title:i18n.t(strings.authors)
                        }}
                        initialParams={{
                            header: i18n.t(strings.authors),
                            items: props.route.params.authors.data,
                            navigation: props.navigation
                        }}/>
        </Tab.Navigator>
    )
};
export default SearchResultTab;
