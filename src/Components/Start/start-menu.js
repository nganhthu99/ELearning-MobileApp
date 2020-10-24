import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import {Button} from "react-native-elements";

const StartMenu = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.textLogo} source={require('../../../assets/icon-logo.png')}/>
            <View style={styles.buttonsContainer}>
                <Button
                    type="outline"
                    icon={{ type: 'font-awesome', name: 'sign-in', color: '#021F59'}}
                    iconLeft
                    title="Log In"/>
                <Button
                    type="outline"
                    icon={{ type: 'font-awesome', name: 'user-plus', color: '#021F59'}}
                    iconLeft
                    title="Sign Up"/>
                <Button
                    type="outline"
                    icon={{ type: 'font-awesome', name: 'eye', color: '#021F59'}}
                    iconLeft
                    title="Explore"/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'stretch',
        backgroundColor: '#F2F2F2',
    },
    buttonsContainer: {
        flex:4,
        alignItems: 'stretch',
        justifyContent: 'space-around',

        marginBottom: 100,
        paddingLeft: 40,
        paddingRight: 40,

        //borderWidth: 5,
        //borderColor: '#AAAAAA',
    },
    textLogo: {
        flex: 5,
        width: 370,
        alignSelf: 'center',
        resizeMode: 'contain',

        marginTop: 50,

        //borderWidth: 5,
        //borderColor: '#AAAAAA',
    },
})

export default StartMenu;
