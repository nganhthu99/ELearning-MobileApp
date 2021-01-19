import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import MyCourses from "../../MyCourses/my-courses";
import CourseDetail from "../../CourseDetail/course-detail";
import CourseList from "../../CoursesList/VerticalCourseList/course-list";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import {TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import Settings from "../../Settings/settings";
import {AuthenticationContext} from "../../../Core/Provider/authentication-provider";
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";
import DownloadedLessonList from "../../CoursesList/downloaded-lesson-list";
import DownloadedLessonDetail from "../../CourseDetail/downloaded-lesson-detail";

const Stack = createStackNavigator();

const MyCoursesStack = () => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)

    return (
        <Stack.Navigator
            screenOptions={({navigation, route}) => ({
                headerStyle: {
                    backgroundColor: theme.secondary,
                },
                headerTitleStyle: {
                    color: theme.emphasis,
                    fontWeight: 'bold'
                },
                headerBackTitleVisible: false,
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Settings')
                        }}>
                        <Icon
                            type='ionicons'
                            name='settings'
                            color={theme.emphasis}
                            size={28}/>
                    </TouchableOpacity>
                ),
                headerRightContainerStyle: {
                    padding: 5,
                }
            })}>
            <Stack.Screen name={ScreenName.MyCourses}
                          component={MyCourses}
                          options={(authenticationContext.state.isAuthenticated) ? {
                              headerLeft: null,
                              title: i18n.t(strings.my_courses)
                          } : {
                              title: i18n.t(strings.my_courses)
                          }}/>
            <Stack.Screen name={ScreenName.CourseDetail}
                          component={CourseDetail}
                          options={{headerShown: false}}/>
            <Stack.Screen name={ScreenName.CourseList}
                          component={CourseList}
                          options={({ route }) => ({
                              title: route.params.header
                          })}/>
            <Stack.Screen name={ScreenName.DownloadedLessonList}
                          component={DownloadedLessonList}
                          options={{
                              title: 'Downloaded Lessons',
                          }}/>
            <Stack.Screen name={ScreenName.DownloadedLessonDetail}
                          component={DownloadedLessonDetail}
                          options={{
                              title: '',
                              headerShown: false
                          }}/>
            <Stack.Screen name={ScreenName.Settings}
                          component={Settings}
                          options={{
                              title: i18n.t(strings.settings),
                          }}/>
        </Stack.Navigator>
    )
}

export default MyCoursesStack
