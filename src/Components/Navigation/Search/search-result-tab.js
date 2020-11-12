import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import React from 'react';
import CourseList from "../../CoursesList/VerticalCourseList/course-list";
import SearchResultAll from "../../Search/SearchResult/search-result-all";
import AuthorList from "../../AuthorList/VerticalAuthorList/author-list";
import VerticalCourseItem from "../../CoursesList/VerticalCourseList/vertical-course-item";
import VerticalCourseList from "../../CoursesList/VerticalCourseList/vertical-course-list";

const SearchResultTab = (props) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#021F59',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontWeight: 'bold'
                },
                style: {
                    backgroundColor: '#F2F2F2',
                },
            }}
            backBehavior="none">
            <Tab.Screen name='All'
                        component={SearchResultAll}
                        initialParams={{
                            courses:props.courses,
                            authors:props.courses,
                            navigation: props.navigation
                        }}/>
            <Tab.Screen name='Courses'
                        component={CourseList}
                        initialParams={{
                            header: 'Courses Result',
                            items:props.courses,
                            navigation: props.navigation
                        }}/>
            <Tab.Screen name='Authors'
                        component={AuthorList}
                        initialParams={{
                            header: 'Authors Result',
                            items:props.authors,
                            navigation: props.navigation
                        }}/>
        </Tab.Navigator>
    )
};
export default SearchResultTab;
