import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import VerticalCourseList from "../CoursesList/VerticalCourseList/vertical-course-list";
import {courses} from "../../Data/data";
import SectionHeader2 from "../Common/section-header-2";

const AuthorDetail = (props) => {
    return(
        <ScrollView style={styles.container}>
            {/*image container*/}
            <View style={styles.avatarContainer}>
                <Image style={styles.image} source={{uri:'https://i.pinimg.com/originals/8a/f7/ed/8af7ed2daec49e34d1dbfeb52ba7a582.jpg'}}/>
            </View>

            {/*info container*/}
            <View style={styles.infoContainer}>
                <Text style={[styles.text, {fontWeight:'bold', fontSize: 16}]}>{props.route.params.item.name}</Text>
                <Text style={styles.text}>{`${props.route.params.item.courses} courses`}</Text>
            </View>

            {/*courses container*/}
            <View style={styles.coursesContainer}>
                <View style={styles.header}>
                    <SectionHeader2 title='Courses'/>
                </View>
                <VerticalCourseList
                    navigation={props.navigation}
                    items={courses}/>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
    avatarContainer: {
        height: 350,
        width: 350,
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        //borderRadius: 175,
        borderWidth: 2,
        borderColor: '#021F59',
        aspectRatio: 1
    },
    infoContainer: {
        alignItems: 'center',
        padding: 10
    },
    text: {
        color: '#011534'
    },
    header: {
        paddingTop: 15,
        paddingBottom: 10
    },
    coursesContainer: {
        padding: 5
    }
});


export default AuthorDetail;
