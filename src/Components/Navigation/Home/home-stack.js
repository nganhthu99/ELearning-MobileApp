import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../../Home/home";
import CourseList from "../../CoursesList/VerticalCourseList/course-list";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorList from "../../AuthorList/VerticalAuthorList/author-list";
import AuthorDetail from "../../AuthorDetail/author-detail";
const Stack = createStackNavigator();

const HomeStack = () => {
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
            <Stack.Screen name='Home'
                          options={{
                              headerLeft: null,
                          }}
                          component={Home}/>
            <Stack.Screen name='CourseList' component={CourseList} options={{title: 'List Courses'}}/>
            <Stack.Screen name='CourseDetail' component={CourseDetail} options={{title: 'Course Detail'}}/>
            <Stack.Screen name='AuthorList' component={AuthorList} options={{title: 'List Authors'}}/>
            <Stack.Screen name='AuthorDetail' component={AuthorDetail} options={{title: 'Author Detail'}}/>
        </Stack.Navigator>
    )
}

export default HomeStack
