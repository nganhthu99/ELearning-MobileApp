import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import {Button} from "react-native-elements";

const StartMenu = (props) => {

    const handleSignInButton = () => {
        props.navigation.navigate('SignIn')
    }

    const handleSignUpButton = () => {
        props.navigation.navigate('SignUp')
    }

    const handleExploreButton = () => {
        props.navigation.navigate('Main')
    }

    return (
        <View style={styles.container}>
            <Image style={styles.textLogo} source={require('../../../assets/icon-logo.png')}/>
            <View style={styles.buttonsContainer}>
                <Button
                    type="outline"
                    icon={{
                        type: 'font-awesome',
                        name: 'sign-in',
                        color: '#021F59'
                    }}
                    iconLeft
                    title="Sign In"
                    onPress={handleSignInButton}/>
                <Button
                    type="outline"
                    icon={{
                        type: 'font-awesome',
                        name: 'user-plus',
                        color: '#021F59'
                    }}
                    iconLeft
                    title="Sign Up"
                    onPress={handleSignUpButton}/>
                <Button
                    type="outline"
                    icon={{
                        type: 'font-awesome',
                        name: 'eye',
                        color: '#021F59'
                    }}
                    iconLeft
                    title="Explore"
                    onPress={handleExploreButton}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F2F2F2',
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

export default StartMenu;
