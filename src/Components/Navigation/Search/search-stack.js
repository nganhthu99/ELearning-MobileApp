import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Search from "../../Search/search";
import SearchResultTab from "./search-result-tab";
import SearchResult from "../../Search/SearchResult/search-result";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorDetail from "../../AuthorDetail/author-detail";
const Stack = createStackNavigator();

const SearchStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#AED3F2',
                },
                headerTitleStyle: {
                    color: '#021F59',
                    fontWeight: 'bold'
                },
                headerBackTitleVisible: false,
            }}>
            <Stack.Screen name='Search'
                          options={{
                              headerLeft: null
                          }}
                          component={Search}/>
            <Stack.Screen name='SearchResult' component={SearchResult} options={{title: 'Search Result'}}/>
            <Stack.Screen name='CourseDetail' component={CourseDetail} options={{title: 'Course Detail'}}/>
            <Stack.Screen name='AuthorDetail' component={AuthorDetail} options={{title: 'Author Detail'}}/>
        </Stack.Navigator>
    )
}

export default SearchStack
