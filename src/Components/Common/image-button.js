import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const ImageButton = (props) => {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={props.image}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{fontSize: 18, color: '#012840', fontWeight: 'bold'}} numberOfLines={2}>{props.title}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        height: 150,
        //width: 200,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',

        marginTop: 10,

        borderWidth: 3,
        borderColor: '#012840'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default ImageButton;
