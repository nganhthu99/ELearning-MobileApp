import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {authors, courses, topics} from "../../Data/data";
import ImageButton from "../Common/image-button";
import VerticalCourseList from "../CoursesList/VerticalCourseList/vertical-course-list";
import HorizontalTopicList from "./horizontal-topic-list";
import SectionFooter from "../Common/section-footer";
import SectionHeader2 from "../Common/section-header-2";
import HorizontalAuthorList from "../AuthorList/HorizontalAuthorList/horizontal-author-list";
import SectionHeader from "../Common/section-header";


const Home = (props) => {
    const handleRecommendButton = () => {
        props.navigation.navigate('CourseList', {
            header: 'Recommended Courses',
            items: courses
        })
    }

    const handleNewButton = () => {
        props.navigation.navigate('CourseList', {
            header: 'New Courses',
            items: courses
        })
    }

    const handleSeeAllTopCoursesButton = () => {
        props.navigation.navigate('CourseList', {
            header: 'Top Courses',
            items: courses
        })
    }

    const handleAllAuthorsButton = () => {
        props.navigation.navigate('AuthorList', {
            header: 'Authors',
            items: authors
        })
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <ImageButton handleOnClick={handleRecommendButton}
                                 title='RECOMMEND FOR YOU'
                                 image={require('../../../assets/background_1.jpg')}/>
                </View>
                <View style={styles.buttonContainer}>
                    <ImageButton handleOnClick={handleNewButton}
                                 title='NEW RELEASE'
                                 image={require('../../../assets/background_2.jpg')}/>
                </View>
            </View>
            <View style={styles.hotTopicsContainer}>
                <View style={styles.header}>
                    <SectionHeader2 title='Hot Topics'/>
                </View>
                <View style={{paddingTop: 10}}>
                    <HorizontalTopicList navigation={props.navigation} items={topics}/>
                </View>
            </View>

            <View style={styles.topCoursesContainer}>
                <View style={styles.header}>
                    <SectionHeader2 title='Top Courses'/>
                </View>
                <View>
                    <VerticalCourseList navigation={props.navigation} items={courses}/>
                </View>
                <View>
                    <SectionFooter handleOnClick={handleSeeAllTopCoursesButton}/>
                </View>
            </View>

            <View style={styles.topAuthorsContainer}>
                <View style={styles.header}>
                    <SectionHeader title='Top Authors' handleOnClick={handleAllAuthorsButton}/>
                </View>
                <View>
                    <HorizontalAuthorList
                        navigation={props.navigation}
                        items={authors}/>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
    buttonsContainer: {
        height: 240,
        padding: 5
    },
    buttonContainer: {
        flex: 1,
        paddingBottom: 5,
    },
    hotTopicsContainer: {
        padding: 5,
        paddingTop: 15,
    },
    topCoursesContainer: {
        padding: 5,
        paddingTop: 15,
    },
    topAuthorsContainer: {
        padding: 5
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10
    }
});

export default Home;
