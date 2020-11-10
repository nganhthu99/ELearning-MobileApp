import React from 'react';
import {Icon} from "react-native-elements";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MyCoursesStack from "./my-courses-stack";
import SearchStack from "./search-stack";
import AccountStack from "./account-stack";
import HomeStack from "./home-stack";
const Tab = createBottomTabNavigator();

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
        case 'Home':
            return 'Home';
        case 'MyCourses':
            return 'My Courses';
        case 'Search':
            return 'Search';
        case 'Account':
            return 'Account';
    }
}

const MainTab = (props) => {

    // React.useLayoutEffect(() => {
    //     props.navigation.setOptions({
    //         headerTitle: getHeaderTitle(props.route)
    //     });
    // }, [props.navigation, props.route]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home'
                    } else if (route.name === 'MyCourses') {
                        iconName = focused
                            ? 'play'
                            : 'play';
                    } else if (route.name === 'Search') {
                        iconName = focused
                            ? 'search'
                            : 'search';
                    } else if (route.name === 'Account') {
                        iconName = focused
                            ? 'person'
                            : 'person';
                    }
                    return <Icon type='octicon' name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#021F59',
                inactiveTintColor: 'grey',
                labelStyle: {
                    fontWeight: 'bold'
                },
                tabStyle: {
                    backgroundColor: '#AED3F2',
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeStack}
                            options={{title: 'Home'}}/>
            <Tab.Screen name="MyCourses" component={MyCoursesStack}
                            options={{title: 'My Courses'}}/>
            <Tab.Screen name="Search" component={SearchStack}
                            options={{title: 'Search'}}/>
            <Tab.Screen name="Account" component={AccountStack}
                            options={{title: 'Account'}}/>
        </Tab.Navigator>
    )
};

export default MainTab;
