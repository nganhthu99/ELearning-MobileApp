import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {authors, courses, topics} from "../../Data/data";
import ImageButton from "../Common/image-button";
import VerticalCourseList from "../CoursesList/VerticalCourseList/vertical-course-list";
import HorizontalTopicList from "./horizontal-topic-list";
import SectionHeader2 from "../Common/section-header-2";
import HorizontalAuthorList from "../AuthorList/HorizontalAuthorList/horizontal-author-list";
import SectionHeader from "../Common/section-header";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";

const Home = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    // Control
    const handleRecommendButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            header: language.recommendForYou,
            items: courses
        })
    }

    const handleNewButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            header: language.newRelease,
            items: courses
        })
    }

    const handleSeeAllTopCoursesButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            header: language.topCourses,
            items: courses
        })
    }

    const handleAllAuthorsButton = () => {
        props.navigation.navigate(ScreenName.AuthorList, {
            header: language.listAuthors,
            items: authors
        })
    }

    return(
        <ScrollView style={styles(theme).container}>
            <View style={styles(theme).buttonsContainer}>
                <View style={styles(theme).buttonContainer}>
                    <ImageButton handleOnClick={handleRecommendButton}
                                 title={language.recommendForYou}
                                 image={require('../../../assets/background_1.jpg')}/>
                </View>
                <View style={styles(theme).buttonContainer}>
                    <ImageButton handleOnClick={handleNewButton}
                                 title={language.newRelease}
                                 image={require('../../../assets/background_2.jpg')}/>
                </View>
            </View>
            <View style={styles(theme).hotTopicsContainer}>
                <View style={styles(theme).header}>
                    <SectionHeader2 title={language.hotTopics}/>
                </View>
                <View style={{paddingTop: 10}}>
                    <HorizontalTopicList navigation={props.navigation} items={topics}/>
                </View>
            </View>

            <View style={styles(theme).topCoursesContainer}>
                <View style={styles(theme).header}>
                    <SectionHeader title={language.topCourses} handleOnClick={handleSeeAllTopCoursesButton}/>
                </View>
                <View>
                    <VerticalCourseList navigation={props.navigation} items={courses}/>
                </View>
            </View>

            <View style={styles(theme).topAuthorsContainer}>
                <View style={styles(theme).header}>
                    <SectionHeader title={language.topAuthors} handleOnClick={handleAllAuthorsButton}/>
                </View>
                <View>
                    <HorizontalAuthorList navigation={props.navigation} items={authors}/>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
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
