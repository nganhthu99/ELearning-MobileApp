import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {courses} from "../../Data/data";
import HorizontalCourseList from "../CoursesList/HorizontalCourseList/horizontal-course-list";
import SectionHeader from "../Common/section-header";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";
import {AuthenticationContext} from "../../Provider/authentication-provider";
import UnauthenticationView from "../Common/unauthentication-view";
import {RegisteredCoursesContext} from "../../Provider/registered-courses-provider";
import {DownloadedCoursesContext} from "../../Provider/downloaded-courses-provider";
import {FavouriteCoursesContext} from "../../Provider/favourite-courses-provider";

const MyCourses = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)
    const {authentication} = useContext(AuthenticationContext)
    const {registeredCourses} = useContext(RegisteredCoursesContext)
    const {downloadedCourses} = useContext(DownloadedCoursesContext)
    const {favouriteCourses} = useContext(FavouriteCoursesContext)

    const handleContinueLearningButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            items: courses,
            header: language.continueLearning,
        })
    }

    const handleRegisteredButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            items: registeredCourses,
            header: language.registered,
        })
    }

    const handleDownloadedButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            items: downloadedCourses,
            header: language.downloaded,
        })
    }

    const handleFavouriteButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            items: favouriteCourses,
            header: language.favourite,
        })
    }
    if (authentication) {
        return (
            <ScrollView style={styles(theme).container}>
                <View style={styles(theme).sectionContainer}>
                    <View style={styles(theme).header}>
                        <SectionHeader title={language.continueLearning} handleOnClick={handleContinueLearningButton}/>
                    </View>
                    <View>
                        <HorizontalCourseList
                            navigation={props.navigation}
                            items={courses}/>
                    </View>
                </View>
                <View style={styles(theme).sectionContainer}>
                    <View style={styles(theme).header}>
                        <SectionHeader title={language.registered} handleOnClick={handleRegisteredButton}/>
                    </View>
                    <View>
                        <HorizontalCourseList
                            navigation={props.navigation}
                            items={registeredCourses}/>
                    </View>
                </View>
                <View style={styles(theme).sectionContainer}>
                    <View style={styles(theme).header}>
                        <SectionHeader title={language.downloaded} handleOnClick={handleDownloadedButton}/>
                    </View>
                    <View>
                        <HorizontalCourseList
                            navigation={props.navigation}
                            items={downloadedCourses}/>
                    </View>
                </View>
                <View style={styles(theme).sectionContainer}>
                    <View style={styles(theme).header}>
                        <SectionHeader title={language.favourite} handleOnClick={handleFavouriteButton}/>
                    </View>
                    <View>
                        <HorizontalCourseList
                            navigation={props.navigation}
                            items={favouriteCourses}/>
                    </View>
                </View>
            </ScrollView>
        )
    } else {
        return (
            <UnauthenticationView navigation={props.navigation}/>
        )
    }
};
const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
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
