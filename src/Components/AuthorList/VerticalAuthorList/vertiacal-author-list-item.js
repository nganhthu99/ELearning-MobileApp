import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../../../Provider/theme-provider";

const VertiacalAuthorListItem = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }

    return(
        <TouchableOpacity style={styles(theme).container} onPress={handleOnClick}>
            <View style={styles(theme).imageContainer}>
                <Image source={require('../../../../assets/course.jpg')} style={styles(theme).image}/>
            </View>
            <View style={styles(theme).infoContainer}>
                <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 16}]}>{props.item.name}</Text>
                <Text style={styles(theme).text}>{`${props.item.courses} courses`}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: theme.listDivider,
        padding: 12,
        paddingLeft: 0,
    },
    imageContainer:{
        width: 95,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 12,
    },
    infoContainer: {
        flex: 8,
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: theme.primaryEmphasis
    },
    text: {
        color: theme.normalText
    }
})
export default VertiacalAuthorListItem;
