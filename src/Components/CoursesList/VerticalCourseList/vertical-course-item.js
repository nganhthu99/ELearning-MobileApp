import React, {useContext} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import CourseInfo from "../course-info";
import {ThemeContext} from "../../../Provider/theme-provider";

const VerticalCourseItem = (props) => {
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
                <CourseInfo item={props.item}/>
            </View>
        </TouchableOpacity>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1.5,
        borderBottomColor: theme.primaryEmphasis,
    },
    imageContainer:{
        height: 90,
        // width: 80,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 12,
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
