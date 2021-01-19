import React, {useContext, useEffect, useState} from 'react';
import {Icon} from "react-native-elements";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MyCoursesStack from "./MyCourses/my-courses-stack";
import SearchStack from "./Search/search-stack";
import AccountStack from "./Account/account-stack";
import HomeStack from "./Home/home-stack";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {FavouriteCoursesContext} from "../../Core/Provider/favourite-courses-provider";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";
import {DownloadedCoursesContext} from "../../Core/Provider/downloaded-courses-provider";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import {ActivityIndicator, View} from "react-native";
import {getContinueCoursesService, getFavoriteCoursesService} from "../../Core/Service/course-service";
import {ContinueCoursesContext} from "../../Core/Provider/continue-courses-provider";
import {getStorageUser} from "../../Core/Service/storage-service";

const Tab = createBottomTabNavigator();

const MainTab = (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const {continueCourses, setContinueCourses} = useContext(ContinueCoursesContext)
    const {downloadedCourses, setDownloadedCourses} = useContext(DownloadedCoursesContext)
    const {favouriteCourses, setFavouriteCourses} = useContext(FavouriteCoursesContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (authenticationContext.state.isAuthenticated) {
            const resultContinueCourses = getContinueCoursesService(authenticationContext.state.token)
                .then((response) => {
                    if (response.status === 200) {
                        setContinueCourses(response.data.payload)
                    }
                })
            const resultFavouriteCourses = getFavoriteCoursesService(authenticationContext.state.token)
                .then((response) => {
                    if (response.status === 200) {
                        setFavouriteCourses(response.data.payload)
                    }
                })
            const resultDownloadedCourses = getStorageUser(authenticationContext.state.userInfo.email)
                .then((value) =>{
                    if (value) {
                        setDownloadedCourses(value.download)
                    }
                })
            Promise.all([resultContinueCourses, resultFavouriteCourses, resultDownloadedCourses])
                .then(() => {
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    if (isLoading) {
        return (
            <View style={{marginTop: 40}}>
                <ActivityIndicator size='small'
                                   color={theme.emphasis}/>
            </View>
        )
    } else {
        return (
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if (route.name === ScreenName.HomeStack) {
                            iconName = 'home'
                        } else if (route.name === ScreenName.MyCoursesStack) {
                            iconName = 'play'
                        } else if (route.name === ScreenName.SearchStack) {
                            iconName = 'search'
                        } else if (route.name === ScreenName.AccountStack) {
                            iconName = 'person'
                        }
                        return <Icon type='octicon'
                                     name={iconName}
                                     size={size}
                                     color={color}/>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: theme.emphasis,
                    inactiveTintColor: 'gray',
                    labelStyle: {
                        fontWeight: 'bold'
                    },
                    tabStyle: {
                        backgroundColor: theme.secondary,
                    }
                }}>
                <Tab.Screen name={ScreenName.HomeStack}
                            component={HomeStack}
                            options={{title: i18n.t(strings.home)}}/>
                <Tab.Screen name={ScreenName.MyCoursesStack}
                            component={MyCoursesStack}
                            options={{title: i18n.t(strings.my_courses)}}/>
                <Tab.Screen name={ScreenName.SearchStack}
                            component={SearchStack}
                            options={{title: i18n.t(strings.search)}}/>
                <Tab.Screen name={ScreenName.AccountStack}
                            component={AccountStack}
                            options={{title: i18n.t(strings.account)}}/>
            </Tab.Navigator>
        )
    }
};

export default MainTab;
