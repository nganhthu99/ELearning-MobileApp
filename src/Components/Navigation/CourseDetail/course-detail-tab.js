import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import CourseDetailInformation from "../../CourseDetail/CourseDetailInformation/course-detail-information";
import CourseDetailLesson from "../../CourseDetail/CourseDetailLesson/course-detail-lesson";
import CourseDetailExercise from "../../CourseDetail/CourseDetailExercise/course-detail-exercise";
import CourseDetailComment from "../../CourseDetail/CourseDetailComment/course-detail-comment";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";
import {LanguageContext} from "../../../Provider/language-provider";

const Tab = createMaterialTopTabNavigator();

const CourseDetailTab = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: theme.primaryEmphasis,
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
                            item:props.item,
                            navigation: props.navigation
                        }}
                        options={{title: language.information}}/>
            <Tab.Screen name={ScreenName.CourseDetailLesson}
                        component={CourseDetailLesson}
                        initialParams={{
                            handleOnChangeLesson: props.handleOnChangeLesson
                        }}
                        options={{title: language.lesson}}/>
            <Tab.Screen name={ScreenName.CourseDetailExercise}
                        component={CourseDetailExercise}
                        options={{title: language.exercise}}/>
            <Tab.Screen name={ScreenName.CourseDetailComment}
                        component={CourseDetailComment}
                        options={{title: language.comment}}/>
        </Tab.Navigator>
    )
};

export default CourseDetailTab;
