import React from 'react';
import {Icon} from "react-native-elements";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MyCoursesStack from "./MyCourses/my-courses-stack";
import SearchStack from "./Search/search-stack";
import AccountStack from "./Account/account-stack";
import HomeStack from "./Home/home-stack";
const Tab = createBottomTabNavigator();

const MainTab = (props) => {
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
                            options={{
                                startNavigation: props.navigation,
                                title: 'Account'}}/>
        </Tab.Navigator>
    )
};

export default MainTab;
