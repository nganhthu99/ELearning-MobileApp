import StartMenu from "../Start/start-menu";
import SignUp from "../Start/sign-up";
import SignIn from "../Start/sign-in";
import ForgetPassword from "../Start/forget-password";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import MainTab from "./main-tab";
const Stack = createStackNavigator();

const StartStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#AED3F2',
                },
                headerTitleStyle: {
                    color: '#021F59',
                    fontWeight: 'bold'
                },
                headerBackTitleVisible: false,
            }}>
            <Stack.Screen name="StartMenu" component={StartMenu}
                               options={{
                                   title: 'Start',
                                   headerShown: false
                               }}/>
            <Stack.Screen name="SignUp" component={SignUp}
                               options={{
                                   title: 'Sign Up',
                               }}/>
            <Stack.Screen name="SignIn" component={SignIn}
                               options={{
                                   title: 'Sign In',
                               }}/>
            <Stack.Screen name="ForgetPassword" component={ForgetPassword}
                               options={{
                                   title: 'Forget Password',
                               }}/>
            <Stack.Screen name="Main" component={MainTab}
                               options={{
                                   title: 'Main',
                                   headerShown: false
                               }}/>
        </Stack.Navigator>
    )
}
export default StartStack
