import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import HorizontalCourseList from "../CoursesList/HorizontalCourseList/horizontal-course-list";
import SectionHeader from "../Common/section-header";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import UnauthenticationView from "../Common/unauthentication-view";
import ImageButton from "../Common/image-button";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";
import {ContinueCoursesContext} from "../../Core/Provider/continue-courses-provider";
import {FavouriteCoursesContext} from "../../Core/Provider/favourite-courses-provider";

const MyCourses = (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const {continueCourses, setContinueCourses} = useContext(ContinueCoursesContext)
    const {favouriteCourses, setFavouriteCourses} = useContext(FavouriteCoursesContext)

    const handleDownloadedButton = () => {
        props.navigation.navigate(ScreenName.DownloadedLessonList)
    }

    const handleRecommendButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            header: i18n.t(strings.recommend_for_you),
            items: []
        })
    }

    const handleContinueLearningButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            items: continueCourses,
            header: i18n.t(strings.continue_learning),
        })
    }

    const handleFavouriteButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            items: favouriteCourses,
            header: i18n.t(strings.favourite),
        })
    }

    if (!authenticationContext.state.isAuthenticated) {
        return (
            <UnauthenticationView navigation={props.navigation}/>
        )
    } else {
        return (
            <ScrollView style={styles(theme).container}>
                <View style={[styles(theme).buttonContainer, {paddingBottom: 0}]}>
                    <ImageButton handleOnClick={handleDownloadedButton}
                                 title='Downloaded Lessons'
                                 image={{uri: 'https://images.pexels.com/photos/1111317/pexels-photo-1111317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}}/>
                </View>
                <View style={styles(theme).buttonContainer}>
                    <ImageButton handleOnClick={handleRecommendButton}
                                 title={i18n.t(strings.recommend_for_you)}
                                 image={{uri: 'https://images.pexels.com/photos/3842751/pexels-photo-3842751.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'}}/>
                </View>
                <View style={styles(theme).sectionContainer}>
                    <SectionHeader title={i18n.t(strings.continue_learning)}
                                   handleOnClick={handleContinueLearningButton}/>
                    <HorizontalCourseList navigation={props.navigation}
                                          items={continueCourses}/>
                </View>
                <View style={styles(theme).sectionContainer}>
                    <SectionHeader title={i18n.t(strings.favourite)}
                                   handleOnClick={handleFavouriteButton}/>
                    <HorizontalCourseList navigation={props.navigation}
                                          items={favouriteCourses}/>
                </View>
            </ScrollView>
        )
    }
};
const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
    sectionContainer: {
        paddingTop: 5,
        paddingBottom: 10,
    },
    header: {
        paddingTop: 5,
        paddingBottom: 15
    },
    buttonContainer: {
        height: 120,
        padding: 5,
    },
})
export default MyCourses;
