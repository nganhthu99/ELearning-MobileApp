import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import CourseInfo from "../course-info";

const HorizontalCourseItem = (props) => {
    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }
    return(
        <TouchableOpacity style={styles.container} onPress={handleOnClick}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../../assets/course.jpg')} style={styles.image}/>
            </View>
            <View style={styles.infoContainer}>
                <CourseInfo item={props.item}/>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer:{
        flex: 7,
        alignItems: 'center',
        marginBottom: 12
    },
    infoContainer: {
        flex: 6,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
})

export default HorizontalCourseItem;
