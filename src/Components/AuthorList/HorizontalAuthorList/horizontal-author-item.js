import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../../../Core/Provider/theme-provider";

const HorizontalAuthorItem = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }

    return(
        <TouchableOpacity style={styles(theme).container} onPress={handleOnClick}>
            <View style={styles(theme).imageContainer}>
                <Image source={{uri: props.item["user.avatar"]}}
                       style={styles(theme).image}/>
            </View>
            <View style={styles(theme).textContainer}>
                <Text style={styles(theme).text} numberOfLines={1}>{props.item["user.name"]}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: 180,
        width: 150,
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
        borderColor: theme.emphasis,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: theme.text,
        fontWeight:'bold',
        fontSize: 16
    }
})


export default HorizontalAuthorItem;
