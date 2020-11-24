import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../../../Provider/theme-provider";

const HorizontalAuthorItem = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }

    return(
        <TouchableOpacity style={styles(theme).container} onPress={handleOnClick}>
            <View style={styles(theme).imageContainer}>
                <Image source={require('../../../../assets/course.jpg')}
                       style={styles(theme).image}/>
            </View>
            <View style={styles(theme).textContainer}>
                <Text style={styles(theme).text} numberOfLines={1}>{props.item.name}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    imageContainer: {
        height: 120,
        width: 120,
    },
    image:{
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 60,
        borderWidth: 1,
        borderColor: theme.primaryEmphasis,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: theme.normalText,
        fontWeight:'bold',
        fontSize: 16
    }
})


export default HorizontalAuthorItem;
