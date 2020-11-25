import React, {useContext} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../../Provider/theme-provider";

const ImageButton = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClick = () => {
        props.handleOnClick();
    }

    return (
        <View style={styles(theme).container}>
            <ImageBackground style={styles(theme).image} source={props.image}>
                <TouchableOpacity style={styles(theme).button} onPress={handleOnClick}>
                    <Text style={styles(theme).text}>{props.title}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
};
const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: theme.primaryEmphasis
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: '#021F59',
        fontWeight: 'bold'
    }
});
export default ImageButton;
