import StartMenu from "../Start/start-menu";
import SignUp from "../Start/sign-up";
import SignIn from "../Start/sign-in";
import ForgetPassword from "../Start/forget-password";
import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import MainTab from "./main-tab";
import SplashScreen from "../Start/splash-screen";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import i18n from "i18n-js";
import {strings} from "../../Globals/Localization/string";

const Stack = createStackNavigator();

const StartStack = () => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.secondary,
                },
                headerTitleStyle: {
                    color: theme.emphasis,
                    fontWeight: 'bold'
                },
                headerBackTitleVisible: false,
            }}>
            <Stack.Screen name={ScreenName.SplashScreen}
                          component={SplashScreen}
                          options={{
                              headerShown: false,
                          }}/>
            <Stack.Screen name={ScreenName.StartMenu}
                          component={StartMenu}
                          options={{
                               headerShown: false,
                               gestureEnabled: false
                          }}/>
            <Stack.Screen name={ScreenName.SignUp}
                          component={SignUp}
                          options={{
                              title: i18n.t(strings.sign_up)
                          }}/>
            <Stack.Screen name={ScreenName.SignIn}
                          component={SignIn}
                          options={{
                              title: i18n.t(strings.sign_in)
                          }}/>
            <Stack.Screen name={ScreenName.ForgetPassword}
                          component={ForgetPassword}
                          options={{
                              title: ''
                          }}/>
            <Stack.Screen name={ScreenName.MainTab}
                          component={MainTab}
                          options={(authenticationContext.state.isAuthenticated) ? {
                              headerShown: false,
                              gestureEnabled: false
                          }: {
                              headerShown: false,
                          }}/>
        </Stack.Navigator>
    )
}

export default StartStack
