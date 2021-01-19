import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View} from "react-native";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import {
    getCategoryCoursesService, getContinueCoursesService, getFavoriteCoursesService,
    getNewCoursesService, getRecommendedCoursesService,
    getTopRatingCoursesService,
    getTopSellingCoursesService, updateCourseFavouriteStatus
} from "../../../Core/Service/course-service";
import {ScreenName} from "../../../Globals/constants";
import VerticalCourseItem from "./vertical-course-item";
import {AuthenticationContext} from "../../../Core/Provider/authentication-provider";
import SwipeableVerticalCourseItem from "./swipeable-vertical-course-item";
import {FavouriteCoursesContext} from "../../../Core/Provider/favourite-courses-provider";
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";
import NoDataView from "../../Common/no-data-view";

const constLimit = 5
const startPage = 1

const CourseList = (props) => {
    // State
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const {favouriteCourses, setFavouriteCourses} = useContext(FavouriteCoursesContext)
    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState(props.route.params.items)
    const [page, setPage] = useState(1)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [service, setService] = useState(() => {
        switch (props.route.params.header) {
            case i18n.t(strings.top_rating_courses):
                return (limit, page) => getTopRatingCoursesService(limit, page)
            case i18n.t(strings.top_selling_courses):
                return (limit, page) => getTopSellingCoursesService(limit, page)
            case i18n.t(strings.new_release):
                return (limit, page) => getNewCoursesService(limit, page)

            case i18n.t(strings.recommend_for_you):
                return (limit, page) => getRecommendedCoursesService(limit, page, authenticationContext.state.userInfo.id)

            case i18n.t(strings.continue_learning):
                return () => getContinueCoursesService(authenticationContext.state.token)
            case i18n.t(strings.favourite):
                return () => getFavoriteCoursesService(authenticationContext.state.token)

            case i18n.t(strings.courses):
                return () => {}

            default: {
                return (props.route.params.category) ?
                    (limit, page) => getCategoryCoursesService(limit, page, props.route.params.category) :
                    null
            }
        }
    })
    const header = props.route.params.header

    // Listen
    useEffect(() => {
        if (header === i18n.t(strings.top_rating_courses) ||
            header === i18n.t(strings.top_selling_courses) ||
            header === i18n.t(strings.continue_learning) ||
            header === i18n.t(strings.favourite) ||
            header === i18n.t(strings.courses)) {
            // do nothing
            setPage(p => p + 1)
            setIsLoading(false)
        } else { // new, category, recommend
            service(constLimit, startPage)
                .then((response) => {
                    if (response.status === 200) {
                        setPage(p => p + 1);
                        (response.data.payload.rows) ?
                            setCourses(response.data.payload.rows) :
                            setCourses(response.data.payload)
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
        return () => {}
    }, [])

    // Control
    const handleOnRefresh = () => {
        if (header === i18n.t(strings.courses)) {
            // do nothing
        } else {
            setIsRefreshing(true)
            service(constLimit, startPage)
                .then((response) => {
                    if (response.status === 200) {
                        setPage(startPage + 1);
                        if (response.data.payload.rows) {
                            setCourses(response.data.payload.rows)
                        } else {
                            setCourses(response.data.payload)
                        }
                    }
                })
                .finally(() => {
                    setIsRefreshing(false)
                })
        }
    }

    const handleOnEndReached = () => {
        if (header === i18n.t(strings.continue_learning) ||
            header === i18n.t(strings.favourite) ||
            header === i18n.t(strings.courses) ) {
            // do nothing
        } else { //new, top rate, top sell (page), category, recommend (offset)
            service(constLimit, page)
                .then((response) => {
                    if (response.status === 200) {
                        setPage(p => p + 1);
                        if (header === i18n.t(strings.new_release) ||
                            header === i18n.t(strings.top_rating_courses) ||
                            header === i18n.t(strings.top_selling_courses)){
                            const copyCourses = courses.slice()
                            setCourses(copyCourses.concat(response.data.payload.slice(0, constLimit)))
                        } else {
                            const copyCourses = courses.slice()
                            if (response.data.payload.rows) {
                                setCourses(copyCourses.concat(response.data.payload.rows))
                            } else {
                                setCourses(copyCourses.concat(response.data.payload))
                            }
                        }
                    }
                })
        }
    }

    const handleOnClick = (item) => {
        props.navigation.navigate(ScreenName.CourseDetail, {
            itemId: item.id
        })
    }

    const handleOnDelete = (courseId) => {
        updateCourseFavouriteStatus(courseId, authenticationContext.state.token)
            .then((response) => {
                if (response.status === 200) {
                    setFavouriteCourses(prev => prev.filter(returnItem => returnItem.id !== courseId))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    // View
    const renderItem = ({ item }) => {
        if (props.route.params.header === i18n.t(strings.favourite)) {
            return (
                <SwipeableVerticalCourseItem
                    handleOnClick={handleOnClick}
                    handleOnDelete={handleOnDelete}
                    key={item.id}
                    item={item}/>
            )
        } else {
            return (
                <VerticalCourseItem
                    handleOnClick={handleOnClick}
                    key={item.id}
                    item={item}/>
            );
        }
    };

    if (isLoading) {
        return (
            <View style={{marginTop: 20}}>
                <ActivityIndicator size='small'
                                   color={theme.emphasis}/>
            </View>
        )
    } else {
        if (courses.length === 0 || (header === i18n.t(strings.favourite) && favouriteCourses.length === 0)) {
            return (
                <NoDataView message={`There's no courses matched or available.`}/>
            )
        } else return (
            <FlatList
                data={header === i18n.t(strings.favourite) ? favouriteCourses : courses}
                renderItem={renderItem}
                ItemSeparatorComponent={() => (
                    <View style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: theme.primary,
                    }}/>
                )}
                style={{padding: 5, backgroundColor: theme.background}}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing}
                                    onRefresh={handleOnRefresh}/>
                }
                onEndReachedThreshold={2}
                onEndReached={handleOnEndReached}/>
        )
    }
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
    list: {
        padding: 5
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10
    }
});

export default CourseList;
