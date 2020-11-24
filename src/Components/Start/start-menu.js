import React, {useContext} from 'react';
import {Image, StyleSheet, View} from "react-native";
import {Button} from "react-native-elements";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";

const StartMenu = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

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

    return (
        <View style={styles(theme).container}>
            <Image style={styles(theme).textLogo} source={require('../../../assets/icon-logo.png')}/>
            <View style={styles(theme).buttonsContainer}>
                <Button
                    type="outline"
                    buttonStyle={{borderColor: theme.primaryButton}}
                    titleStyle={{color: theme.primaryButton}}
                    icon={{
                        type: 'font-awesome',
                        name: 'sign-in',
                        color: theme.primaryEmphasis
                    }}
                    iconLeft
                    title={language.signIn}
                    onPress={handleSignInButton}/>
                <Button
                    type="outline"
                    buttonStyle={{borderColor: theme.primaryButton}}
                    titleStyle={{color: theme.primaryButton}}
                    icon={{
                        type: 'font-awesome',
                        name: 'user-plus',
                        color: theme.primaryEmphasis
                    }}
                    iconLeft
                    title={language.signUp}
                    onPress={handleSignUpButton}/>
                <Button
                    type="outline"
                    buttonStyle={{borderColor: theme.primaryButton}}
                    titleStyle={{color: theme.primaryButton}}
                    icon={{
                        type: 'font-awesome',
                        name: 'eye',
                        color: theme.primaryEmphasis
                    }}
                    iconLeft
                    title={language.explore}
                    onPress={handleExploreButton}/>
            </View>
        </View>
    )
};

const styles = (theme) => (
    StyleSheet.create({
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
        },
    })
)

export default StartMenu;
