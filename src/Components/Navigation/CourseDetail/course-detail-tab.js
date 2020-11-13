import React from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import CourseDetailInformation from "../../CourseDetail/CourseDetailInformation/course-detail-information";
import CourseDetailLesson from "../../CourseDetail/CourseDetailLesson/course-detail-lesson";
import CourseDetailExercise from "../../CourseDetail/CourseDetailExercise/course-detail-exercise";
import CourseDetailComment from "../../CourseDetail/CourseDetailComment/course-detail-comment";

const Tab = createMaterialTopTabNavigator();

const CourseDetailTab = (props) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#021F59',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 12,
                },
                style: {
                    backgroundColor: '#F2F2F2',
                },
                tabStyle:{
                },
            }}
            backBehavior="none">
            <Tab.Screen name='Information' component={CourseDetailInformation}
                        initialParams={{
                            item:props.item,
                            navigation: props.navigation
                        }}
                        options={{title: 'Info...'}}/>
            <Tab.Screen name='Lesson' component={CourseDetailLesson} options={{title: 'Lesson'}}/>
            <Tab.Screen name='Exercise' component={CourseDetailExercise} options={{title: 'Exer...'}}/>
            <Tab.Screen name='Comment' component={CourseDetailComment} options={{title: 'Com...'}}/>
        </Tab.Navigator>
    )
};

export default CourseDetailTab;
