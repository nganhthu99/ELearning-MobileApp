import React, {useContext, useState} from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import CourseDetailInformation from "./CourseDetailInformation/course-detail-information";
import CourseDetailLesson from "./CourseDetailLesson/course-detail-lesson";
import CourseDetailExercise from "./CourseDetailExercise/course-detail-exercise";
import CourseDetailComment from "./CourseDetailComment/course-detail-comment";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";
import {CurrentLessonProvider} from "../../Core/Provider/current-lesson-provider";

const Tab = createMaterialTopTabNavigator();

const CourseDetailTab = (props) => {
    const {theme} = useContext(ThemeContext)

    return (
        <CurrentLessonProvider>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: theme.emphasis,
                    inactiveTintColor: 'gray',
                    labelStyle: {
                        fontWeight: 'bold',
                        fontSize: 12,
                    },
                    style: {
                        backgroundColor: theme.background,
                    },
                    tabStyle:{
                    },
                }}
                backBehavior="none">
                <Tab.Screen name={ScreenName.CourseDetailInformation}
                            component={CourseDetailInformation}
                            initialParams={{
                                detail: props.detail,
                                navigation: props.navigation
                            }}
                            options={{
                                title: i18n.t(strings.overview)
                            }}/>
                <Tab.Screen name={ScreenName.CourseDetailLesson}
                            component={CourseDetailLesson}
                            initialParams={{
                                initialLesson: props.initialLesson,
                                playerRef: props.playerRef,
                                handleOnChangeLesson: props.handleOnChangeLesson,
                                detail: props.detail
                            }}
                            options={{title: i18n.t(strings.lesson)}}/>
                <Tab.Screen name={ScreenName.CourseDetailExercise}
                            component={CourseDetailExercise}
                            initialParams={{
                                courseId: props.detail.id,
                            }}
                            options={{
                                title: i18n.t(strings.exercise)
                            }}/>
                <Tab.Screen name={ScreenName.CourseDetailComment}
                            component={CourseDetailComment}
                            initialParams={{
                                detail: props.detail
                            }}
                            options={{title: i18n.t(strings.review)}}/>
            </Tab.Navigator>
        </CurrentLessonProvider>
    )
};

export default CourseDetailTab;
