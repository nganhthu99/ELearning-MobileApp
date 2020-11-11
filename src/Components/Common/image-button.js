import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const ImageButton = (props) => {
    const handleOnClick = () => {
        props.handleOnClick();
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={props.image}>
                <TouchableOpacity style={styles.button} onPress={handleOnClick}>
                    <Text style={styles.text}>{props.title}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,

        borderWidth: 2,
        borderColor: '#012840'
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
