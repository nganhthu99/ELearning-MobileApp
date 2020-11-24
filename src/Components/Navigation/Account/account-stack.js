import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Account from "../../Account/account";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";
import {LanguageContext} from "../../../Provider/language-provider";
import {TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import Settings from "../../Settings/settings";
const Stack = createStackNavigator();

const AccountStack = () => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    return (
        <Stack.Navigator
            screenOptions={({navigation, route}) => ({
                headerStyle: {
                    backgroundColor: theme.navigationBar,
                },
                headerTitleStyle: {
                    color: theme.primaryEmphasis,
                    fontWeight: 'bold'
                },
                headerBackTitleVisible: false,
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Settings')
                        }}
                    >
                        <Icon
                            type='ionicons'
                            name='settings'
                            color={theme.primaryEmphasis}
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
                          options={{
                              headerLeft: null,
                              title: language.account
                          }}/>
            <Stack.Screen name={ScreenName.Settings}
                          component={Settings}
                          options={{
                              title: language.settings,
                          }}/>
        </Stack.Navigator>
    )
}

export default AccountStack
