import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {courses} from "../../Data/data";
import HorizontalCourseList from "../CoursesList/HorizontalCourseList/horizontal-course-list";
import SectionHeader from "../Common/section-header";

const MyCourses = (props) => {
    const handleContinueLearningButton = () => {
        props.navigation.navigate('CourseList', {
            items: courses,
            header: 'Continue Learning Courses'
        })
    }

    const handleRegisteredButton = () => {
        props.navigation.navigate('CourseList', {
            items: courses,
            header: 'Registered Courses'
        })
    }

    const handleDownloadedButton = () => {
        props.navigation.navigate('CourseList', {
            items: courses,
            header: 'Downloaded Courses'
        })
    }

    const handleFavouriteButton = () => {
        props.navigation.navigate('CourseList', {
            items: courses,
            header: 'Favourite Courses'
        })
    }
    return(
        <ScrollView style={styles.container}>
            <View style={styles.sectionContainer}>
                <View style={styles.header}>
                    <SectionHeader title='Continue Learning' handleOnClick={handleContinueLearningButton}/>
                </View>
                <View>
                    <HorizontalCourseList
                        navigation={props.navigation}
                        items={courses}/>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.header}>
                    <SectionHeader title='Registered' handleOnClick={handleRegisteredButton}/>
                </View>
                <View>
                    <HorizontalCourseList
                        navigation={props.navigation}
                        items={courses}/>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.header}>
                    <SectionHeader title='Downloaded' handleOnClick={handleDownloadedButton}/>
                </View>
                <View>
                    <HorizontalCourseList
                        navigation={props.navigation}
                        items={courses}/>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.header}>
                    <SectionHeader title='Favourite' handleOnClick={handleFavouriteButton}/>
                </View>
                <View>
                    <HorizontalCourseList
                        navigation={props.navigation}
                        items={courses}/>
                </View>
            </View>
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
    sectionContainer: {
        padding: 5,
        paddingBottom: 15,
    },
    header: {
        paddingTop: 5,
        paddingBottom: 15
    }
})
export default MyCourses;
