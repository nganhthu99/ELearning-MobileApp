import React, {useContext} from 'react';
import {Image, StyleSheet, View} from "react-native";
import {Button} from "react-native-elements";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";

const StartMenu = (props) => {
    // State
    const {theme} = useContext(ThemeContext)

    // Control
    const handleSignInButton = () => {
        props.navigation.navigate(ScreenName.SignIn)
    }

    const handleSignUpButton = () => {
        props.navigation.navigate(ScreenName.SignUp)
    }

    const handleExploreButton = () => {
        props.navigation.navigate(ScreenName.MainTab)
    }

    // View
    return (
        <View style={styles(theme).container}>
            <Image style={styles(theme).textLogo}
                   source={require('../../../assets/icon-logo.png')}/>
            <View style={styles(theme).buttonsContainer}>
                <Button
                    type="outline"
                    title={i18n.t(strings.sign_in)}
                    icon={{
                        type: 'font-awesome',
                        name: 'sign-in',
                        color: theme.emphasis
                    }}
                    iconLeft
                    buttonStyle={{borderColor: theme.primary}}
                    titleStyle={{color: theme.primary}}
                    onPress={handleSignInButton}/>
                <Button
                    type="outline"
                    title={i18n.t(strings.sign_up)}
                    icon={{
                        type: 'font-awesome',
                        name: 'user-plus',
                        color: theme.emphasis
                    }}
                    iconLeft
                    buttonStyle={{borderColor: theme.primary}}
                    titleStyle={{color: theme.primary}}
                    onPress={handleSignUpButton}/>
                <Button
                    type="outline"
                    title={i18n.t(strings.explore)}
                    icon={{
                        type: 'font-awesome',
                        name: 'eye',
                        color: theme.emphasis
                    }}
                    iconLeft
                    buttonStyle={{borderColor: theme.primary}}
                    titleStyle={{color: theme.primary}}
                    onPress={handleExploreButton}/>
            </View>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: theme.background,
    },
    textLogo: {
        flex: 5,
        width: 370,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 50,
    },
    buttonsContainer: {
        flex:4,
        justifyContent: 'space-evenly',
        marginBottom: 80,
        paddingLeft: 40,
        paddingRight: 40,
    }
})

export default StartMenu;
