import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CourseInfo2 from "../course-info-2";
import CourseInfo from "../course-info";

const HorizontalCourseItem = (props) => {
    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }
    if (props.item["imageUrl"]) {
        return (
            <TouchableOpacity style={styles.container} onPress={handleOnClick}>
                <View style={[styles.imageContainer, {flex: 1.2}]}>
                    <Image source={{uri: props.item["imageUrl"]}} style={styles.image}/>
                </View>
                <View style={styles.infoContainer}>
                    <CourseInfo item={props.item}/>
                </View>
            </TouchableOpacity>
        )
    } else if (props.item["courseImage"]){
        return(
            <TouchableOpacity style={styles.container} onPress={handleOnClick}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: props.item["courseImage"]}} style={styles.image}/>
                </View>
                <View style={styles.infoContainer}>
                    <CourseInfo2 item={props.item}/>
                </View>
            </TouchableOpacity>
        )
    } else {
        return <View style={styles.container}></View>
    }
    // console.log(props.item)
    // return (
    //     <View><Text>hello</Text></View>
    // )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer:{
        flex: 2,
        alignItems: 'center',
        marginBottom: 12
    },
    infoContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
})

export default HorizontalCourseItem;
