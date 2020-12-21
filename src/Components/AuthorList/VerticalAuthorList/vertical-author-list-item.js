import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../../../Core/Provider/theme-provider";

const VerticalAuthorListItem = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }

    const avatar = (props.item.avatar) ? props.item.avatar : props.item["user.avatar"]
    const name = (props.item.name) ? props.item.name : props.item["user.name"]
    const subtitle = (props.item.numcourses) ? `${props.item.numcourses} courses` : props.item.major

    return (
        <TouchableOpacity style={styles(theme).container} onPress={handleOnClick}>
            <View style={styles(theme).imageContainer}>
                <Image source={{uri: avatar}} style={styles(theme).image}/>
            </View>
            <View style={styles(theme).infoContainer}>
                <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 16, paddingBottom: 10}]}>{name}</Text>
                <Text style={styles(theme).text}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 120
    },
    imageContainer:{
        width: 95,
        height: 95,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 12,
    },
    infoContainer: {
        flex: 8,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: theme.emphasis
    },
    text: {
        color: theme.text
    }
})
export default VerticalAuthorListItem;
