import React, {useContext} from 'react';
import {Icon} from "react-native-elements";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MyCoursesStack from "./MyCourses/my-courses-stack";
import SearchStack from "./Search/search-stack";
import AccountStack from "./Account/account-stack";
import HomeStack from "./Home/home-stack";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";
import {Text, TouchableOpacity} from "react-native";
import {RegisteredCoursesProvider} from "../../Provider/registered-courses-provider";
import {DownloadedCoursesProvider} from "../../Provider/downloaded-courses-provider";
import {FavouriteCoursesProvider} from "../../Provider/favourite-courses-provider";
const Tab = createBottomTabNavigator();

const MainTab = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    return (
        <RegisteredCoursesProvider>
            <DownloadedCoursesProvider>
                <FavouriteCoursesProvider>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
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
                                return <Icon type='octicon' name={iconName} size={size} color={color} />;
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: theme.primaryEmphasis,
                            inactiveTintColor: 'gray',
                            labelStyle: {
                                fontWeight: 'bold'
                            },
                            tabStyle: {
                                backgroundColor: theme.navigationBar,
                            },
                        }}
                    >
                        <Tab.Screen name={ScreenName.HomeStack}
                                    component={HomeStack}
                                    options={{title: language.home}}/>
                        <Tab.Screen name={ScreenName.MyCoursesStack}
                                    component={MyCoursesStack}
                                    options={{title: language.myCourses}}/>
                        <Tab.Screen name={ScreenName.SearchStack}
                                    component={SearchStack}
                                    options={{title: language.search}}/>
                        <Tab.Screen name={ScreenName.AccountStack}
                                    component={AccountStack}
                                    options={{
                                        startNavigation: props.navigation,
                                        title: language.account
                                    }}/>
                    </Tab.Navigator>
                </FavouriteCoursesProvider>
            </DownloadedCoursesProvider>
        </RegisteredCoursesProvider>
    )
};

export default MainTab;
