import React, {useContext, useEffect, useState} from 'react';
import {Image, View, StyleSheet, Text, ActivityIndicator} from "react-native";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Provider/theme-provider";

const SplashScreen = (props) => {
    // State
    const [loading, setLoading] = useState(0)
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        this.timer = setInterval(() => {
            setLoading(loading + 1);
        }, 1)
        if (loading === 100) {
            props.navigation.navigate(ScreenName.StartMenu);
        }
        return () => {
            clearInterval(this.timer)
        }
    }, [loading])

    // View
    return (
        <View style={styles(theme).container}>
            <Image style={styles(theme).iconLogo} source={require('../../../assets/icon-logo.png')}/>
            <Text>{loading}</Text>
            <ActivityIndicator size="small" color={theme.primaryEmphasis} />
            <Image style={styles(theme).textLogo} source={require('../../../assets/text-logo.png')}/>
        </View>
    )
};

const styles = (theme) => (
    StyleSheet.create({
        container: {
            flex:1,
            alignItems: 'center',
            backgroundColor: theme.background,
        },
        iconLogo: {
            flex: 7,
            width: 450,
            resizeMode: 'contain',
        },
        textLogo: {
            flex: 1,
            width: 200,
            resizeMode: 'contain',
            marginBottom: 20,
        }
    })
)

export default SplashScreen;
