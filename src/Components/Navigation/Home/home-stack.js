import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../../Home/home";
import CourseList from "../../CoursesList/VerticalCourseList/course-list";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorList from "../../AuthorList/VerticalAuthorList/author-list";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";
import {LanguageContext} from "../../../Provider/language-provider";
import {ScrollView, Text, TouchableOpacity} from "react-native";
import Settings from "../../Settings/settings";
import {Icon} from "react-native-elements";
const Stack = createStackNavigator();

const HomeStack = () => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    return (
        <Stack.Navigator
            screenOptions={({ navigation, route }) => ({
                headerStyle: {
                    backgroundColor: theme.navigationBar,
                },
                headerTitleStyle: {
                    color: theme.primaryEmphasis,
                    fontWeight: 'bold'
                },
                headerBackTitleVisible: false,
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Settings')
                        }}
                    >
                        <Icon
                            type='ionicons'
                            name='settings'
                            color={theme.primaryEmphasis}
                            size={28}
                        />
                    </TouchableOpacity>
                ),
                headerRightContainerStyle: {
                    padding: 5,
                }
            })}>
            <Stack.Screen name={ScreenName.Home}
                          component={Home}
                          options={{
                              headerLeft: null,
                              title: language.home
                          }}/>
            <Stack.Screen name={ScreenName.CourseList}
                          component={CourseList}
                          options={{title: language.listCourses}}/>
            <Stack.Screen name={ScreenName.CourseDetail}
                          component={CourseDetail}
                          options={{title: language.courseDetail}}/>
            <Stack.Screen name={ScreenName.AuthorList}
                          component={AuthorList}
                          options={{title: language.listAuthors}}/>
            <Stack.Screen name={ScreenName.AuthorDetail}
                          component={AuthorDetail}
                          options={{title: language.authorDetail}}/>
            <Stack.Screen name={ScreenName.Settings}
                          component={Settings}
                          options={{
                              title: language.settings,
                          }}/>
        </Stack.Navigator>
    )
}

export default HomeStack
