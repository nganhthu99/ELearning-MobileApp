import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../../Home/home";
import Account from "../../Account/account";
const Stack = createStackNavigator();

const AccountStack = () => {
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
            <Stack.Screen name='Account'
                          options={{
                              headerLeft: null
                          }}
                          component={Account}/>
        </Stack.Navigator>
    )
}

export default AccountStack
