import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../../Home/home";
import MyCourses from "../../MyCourses/my-courses";
import CourseDetail from "../../CourseDetail/course-detail";
import CourseList from "../../CoursesList/VerticalCourseList/course-list";
const Stack = createStackNavigator();

const MyCoursesStack = () => {
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
            <Stack.Screen name='MyCourses'
                          component={MyCourses}
                          options={{
                              headerLeft: null,
                              title: 'My Courses'
                          }}/>
            <Stack.Screen name='CourseDetail' component={CourseDetail} options={{title: 'Course Detail'}}/>
            <Stack.Screen name='CourseList' component={CourseList} options={{title: 'List Courses'}}/>
        </Stack.Navigator>
    )
}

export default MyCoursesStack
