import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import CourseInfo from "../course-info";

const VerticalCourseItem = (props) => {
    const handleOnClick = () => {
        props.navigation.navigate('CourseDetail', {
            item: props.item
        })
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
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#A9CCE3',
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
