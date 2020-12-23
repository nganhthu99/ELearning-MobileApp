import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import ImageButton from "../Common/image-button";
import VerticalCourseList from "../CoursesList/VerticalCourseList/vertical-course-list";
import HorizontalTopicList from "./horizontal-topic-list";
import SectionHeader2 from "../Common/section-header-2";
import HorizontalAuthorList from "../AuthorList/HorizontalAuthorList/horizontal-author-list";
import SectionHeader from "../Common/section-header";
import {ScreenName} from "../../Globals/constants";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {getTopRatingCoursesService, getTopSellingCoursesService} from "../../Core/Service/course-service";
import {getListIntructors} from "../../Core/Service/instructor-service";
import {getAllCategoryService} from "../../Core/Service/category-service";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";

const Home = (props) => {
    const {theme} = useContext(ThemeContext)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [topRatingCourses, setTopRatingCourses] = useState([])
    const [topSellingCourses, setTopSellingCourses] = useState([])
    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])

    // Listen
    useEffect(() => {
        getAllCategoryService()
            .then((response) => {
                if(response.status === 200) {
                    setCategories(response.data.payload)
                }
            })
            .finally(() => {
                getTopRatingCoursesService(5, 1)
                    .then((response) => {
                        if (response.status === 200) {
                            setTopRatingCourses(response.data.payload)
                        }
                    })
                    .finally(() => {
                        getTopSellingCoursesService(5,1)
                            .then((response) => {
                                if (response.status === 200) {
                                    setTopSellingCourses(response.data.payload)
                                }
                            })
                            .finally(() => {
                                getListIntructors()
                                    .then((response) => {
                                        if (response.status === 200) {
                                            setAuthors(response.data.payload)
                                        }
                                    })
                            })
                    })
            })
    }, [])

    // Control
    const handleOnRefresh = () => {
        setIsRefreshing(true)
        const resultAllCategories = getAllCategoryService()
            .then((response) => {
                if (response.status === 200) {
                    setCategories(response.data.payload)
                }
            })
        const resultTopRatingCourse = getTopRatingCoursesService(5, 1)
            .then((response) => {
                if (response.status === 200) {
                    setTopRatingCourses(response.data.payload)
                }
            })
        const resultTopSellingCourse = getTopSellingCoursesService(5,1)
            .then((response) => {
                if (response.status === 200) {
                    setTopSellingCourses(response.data.payload)
                }
            })
        const resultListAuthors = getListIntructors()
            .then((response) => {
                if (response.status === 200) {
                    setAuthors(response.data.payload)
                }
            })
        Promise.all([resultAllCategories, resultTopRatingCourse, resultTopSellingCourse, resultListAuthors])
            .then(() => {
                setIsRefreshing(false)
            })
    }

    const handleNewButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            header: i18n.t(strings.new_release),
            items: []
        })
    }

    const handleSeeAllTopRatingCoursesButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            header: i18n.t(strings.top_rating_courses),
            items: topRatingCourses
        })
    }

    const handleSeeAllTopSellingCoursesButton = () => {
        props.navigation.navigate(ScreenName.CourseList, {
            header: i18n.t(strings.top_selling_courses),
            items: topSellingCourses
        })
    }

    const handleAllAuthorsButton = () => {
        props.navigation.navigate(ScreenName.AuthorList, {
            items: authors
        })
    }

    return(
        <ScrollView style={styles(theme).container}
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing}
                                        onRefresh={handleOnRefresh} />
                    }>
            <View style={styles(theme).buttonContainer}>
                <ImageButton handleOnClick={handleNewButton}
                             title={i18n.t(strings.new_release)}
                             image={require('../../../assets/background_2.jpg')}/>
            </View>

            <View>
                <SectionHeader2 title={i18n.t(strings.hot_topics)}/>
                <HorizontalTopicList navigation={props.navigation}
                                     items={categories}/>
            </View>

            <View>
                <SectionHeader title={i18n.t(strings.top_rating_courses)}
                               handleOnClick={handleSeeAllTopRatingCoursesButton}/>
                <VerticalCourseList navigation={props.navigation}
                                    items={topRatingCourses}/>
            </View>

            <View>
                <SectionHeader title={i18n.t(strings.top_selling_courses)}
                               handleOnClick={handleSeeAllTopSellingCoursesButton}/>
                <VerticalCourseList navigation={props.navigation}
                                    items={topSellingCourses}/>
            </View>

            <View>
                <SectionHeader title={i18n.t(strings.top_authors)}
                               handleOnClick={handleAllAuthorsButton}/>
                <HorizontalAuthorList navigation={props.navigation}
                                      items={authors}/>
            </View>
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background
    },
    buttonContainer: {
        height: 180,
        padding: 5,
        marginBottom: 10
    }
});

export default Home;
