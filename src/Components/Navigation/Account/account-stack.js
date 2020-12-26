import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Account from "../../Account/account";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import {TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import Settings from "../../Settings/settings";
import {AuthenticationContext} from "../../../Core/Provider/authentication-provider";
const Stack = createStackNavigator();
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";

const AccountStack = () => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)

    return (
        <Stack.Navigator
            screenOptions={({navigation, route}) => ({
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
                            size={28}
                        />
                    </TouchableOpacity>
                ),
                headerRightContainerStyle: {
                    padding: 5,
                }
            })}>
            <Stack.Screen name={ScreenName.Account}
                          component={Account}
                          options={(authenticationContext.state.isAuthenticated) ? {
                              headerLeft: null,
                              title: i18n.t(strings.account)
                          } : {
                              title: i18n.t(strings.account)
                          }}/>
            <Stack.Screen name={ScreenName.Settings}
                          component={Settings}
                          options={{
                              title: i18n.t(strings.settings)
                          }}/>
        </Stack.Navigator>
    )
}

export default AccountStack
