import StartMenu from "../Start/start-menu";
import SignUp from "../Start/sign-up";
import SignIn from "../Start/sign-in";
import ForgetPassword from "../Start/forget-password";
import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import MainTab from "./main-tab";
import SplashScreen from "../Start/splash-screen";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";
import {AuthenticationContext} from "../../Provider/authentication-provider";

const Stack = createStackNavigator();

const StartStack = () => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)
    const {authentication} = useContext(AuthenticationContext)

    return (
        <Stack.Navigator
            initialRouteName={ScreenName.StartMenu}
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.navigationBar,
                },
                headerTitleStyle: {
                    color: theme.primaryEmphasis,
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
                              title: language.signUp,
                          }}/>
            <Stack.Screen name={ScreenName.SignIn}
                          component={SignIn}
                          options={{
                              title: language.signIn,
                          }}/>
            <Stack.Screen name={ScreenName.ForgetPassword}
                          component={ForgetPassword}
                          options={{
                              title: ''
                          }}/>
            <Stack.Screen name={ScreenName.MainTab}
                          component={MainTab}
                          options={(authentication) ? {
                              headerShown: false,
                              gestureEnabled: false
                          }: {
                              headerShown: false,
                          }}/>
        </Stack.Navigator>
    )
}
export default StartStack
