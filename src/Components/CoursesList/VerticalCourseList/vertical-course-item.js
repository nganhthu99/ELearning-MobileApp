import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CourseInfo from "../course-info";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import CourseInfo2 from "../course-info-2";

const VerticalCourseItem = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }

    if (props.item["courseImage"]) {
        return (
            <TouchableOpacity style={styles(theme).container}
                              onPress={handleOnClick}>
                <View style={styles(theme).imageContainer}>
                    <Image source={{uri: props.item["courseImage"]}}
                           style={styles(theme).image}/>
                </View>
                <View style={styles(theme).infoContainer}>
                    <CourseInfo2 item={props.item}/>
                </View>
            </TouchableOpacity>
        )
    } else if (props.item["imageUrl"]) {
        return (
            <TouchableOpacity style={styles(theme).container} onPress={handleOnClick}>
                <View style={styles(theme).imageContainer}>
                    <Image source={{uri: props.item["imageUrl"]}} style={styles(theme).image}/>
                </View>
                <View style={styles(theme).infoContainer}>
                    <CourseInfo item={props.item}/>
                </View>
            </TouchableOpacity>
        )
    } else {
        return(
            <View style={{
                height: 0,
                width: '100%',
                backgroundColor: theme.primary,
            }}/>
        )
    }
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 135,
        paddingTop: 15
    },
    imageContainer:{
        flex: 1,
        height: 95,
        width: 95,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 10,
    },
    infoContainer: {
        flex: 3,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    }
})

export default VerticalCourseItem;
