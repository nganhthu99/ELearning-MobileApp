import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../../Home/home";
import CourseList from "../../CoursesList/VerticalCourseList/course-list";
import CourseDetail from "../../CourseDetail/course-detail";
import AuthorList from "../../AuthorList/VerticalAuthorList/author-list";
import AuthorDetail from "../../AuthorDetail/author-detail";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import {TouchableOpacity} from "react-native";
import Settings from "../../Settings/settings";
import {Icon} from "react-native-elements";
import {AuthenticationContext} from "../../../Core/Provider/authentication-provider";
const Stack = createStackNavigator();
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";

const HomeStack = () => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)

    return (
        <Stack.Navigator
            screenOptions={({ navigation, route }) => ({
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
                            navigation.navigate(ScreenName.Settings)
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
            <Stack.Screen name={ScreenName.Home}
                          component={Home}
                          options={(authenticationContext.state.isAuthenticated) ? {
                              headerLeft: null,
                              title: i18n.t(strings.home)
                          } : {
                              title: i18n.t(strings.home)
                          }}/>
            <Stack.Screen name={ScreenName.CourseList}
                          component={CourseList}
                          options={({ route }) => ({
                              title: route.params.header
                          })}/>
            <Stack.Screen name={ScreenName.CourseDetail}
                          component={CourseDetail}
                          options={{
                              headerShown: false
                          }}/>
            <Stack.Screen name={ScreenName.AuthorList}
                          component={AuthorList}
                          options={{
                              title: i18n.t(strings.authors_list)
                          }}/>
            <Stack.Screen name={ScreenName.AuthorDetail}
                          component={AuthorDetail}
                          options={{
                              title: ''
                          }}/>
            <Stack.Screen name={ScreenName.Settings}
                          component={Settings}
                          options={{
                              title: i18n.t(strings.settings)
                          }}/>
        </Stack.Navigator>
    )
}

export default HomeStack
