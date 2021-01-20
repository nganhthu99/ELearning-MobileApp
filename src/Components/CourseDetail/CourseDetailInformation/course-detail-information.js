import React, {useContext, useEffect, useState} from 'react';
import {Alert, Share, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import {ContinueCoursesContext} from "../../../Core/Provider/continue-courses-provider";
import {FavouriteCoursesContext} from "../../../Core/Provider/favourite-courses-provider";
import {AuthenticationContext} from "../../../Core/Provider/authentication-provider";
import {
    enrollCourseService, getContinueCoursesService,
    getFavoriteCoursesService,
    updateCourseFavouriteStatus
} from "../../../Core/Service/course-service";
import CourseInfo3 from "../../CoursesList/course-info-3";
import SectionHeader2 from "../../Common/section-header-2";
import HorizontalCourseList from "../../CoursesList/HorizontalCourseList/horizontal-course-list";
import * as WebBrowser from 'expo-web-browser';
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";

const CourseDetailInformation = (props) => {
    const {theme} = useContext(ThemeContext)
    const detail = props.route.params.detail

    const authenticationContext = useContext(AuthenticationContext)
    const {continueCourses, setContinueCourses} = useContext(ContinueCoursesContext)
    const {favouriteCourses, setFavouriteCourses} = useContext(FavouriteCoursesContext)

    const [isFavourite, setIsFavourite] = useState(false)
    const [isEnrolled, setIsEnrolled] = useState(false)

    useEffect(() => {
        setIsFavourite(favouriteCourses.some(returnItem => returnItem.id === detail.id))
    }, [favouriteCourses])

    useEffect(() => {
        setIsEnrolled(continueCourses.some(returnItem => returnItem.id === detail.id))
    }, [continueCourses])

    const errorAuthenticationAlert = () => Alert.alert(
        'Authentication Error',
        'Please Sign In or Sign Up to use this feature',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }
        ]
    );

    const handleFavouriteButton = () => {
        if (!authenticationContext.state.isAuthenticated) {
            errorAuthenticationAlert()
        } else {
            updateCourseFavouriteStatus(detail.id, authenticationContext.state.token)
                .then((response) => {
                    if (response.status === 200) {
                        // setIsFavourite(response.data.likeStatus)
                        getFavoriteCoursesService(authenticationContext.state.token)
                            .then((response) => {
                                if (response.status === 200) {
                                    setFavouriteCourses(response.data.payload)
                                }
                            })
                    }
                })
        }
    }

    const handleEnrollButton = () => {
        if (!authenticationContext.state.isAuthenticated) {
            errorAuthenticationAlert()
        } else if (!isEnrolled) {
            enrollCourseService(authenticationContext.state.token, detail.id)
                .then((response) => {
                    getContinueCoursesService(authenticationContext.state.token)
                        .then((response) => {
                            if (response.status === 200) {
                                setContinueCourses(response.data.payload)
                            }
                        })
                })
                .catch((error) => {
                    WebBrowser.openBrowserAsync('http://dev.letstudy.org/payment/'+detail.id)
                        .then(() => {
                            console.log('open google chrome')
                        })
                })
        }
    }

    const handleShareButton = () => {
        Share.share({
            message: 'http://dev.letstudy.org/course-detail/'+detail.id
        });
    }

    return (
        <ScrollView style={styles(theme).container}>
            <View style={{padding: 5}}>
                <CourseInfo3 course={{
                    title: detail.title,
                    price: detail.price,
                    createdAt: detail.createdAt,
                    totalHours: detail.totalHours,
                    ratedNumber: detail.ratedNumber
                }}
                             author={detail.instructor}
                />
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                    onPress={handleFavouriteButton}
                    style={!isFavourite?
                        {flex: 1, flexDirection: 'row', margin: 2, borderColor: theme.danger, borderWidth: 1, justifyContent:'center', alignItems: 'center'}:
                        {flex: 1, flexDirection: 'row', margin: 2, borderColor: theme.background, backgroundColor: theme.danger, borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={!isFavourite?
                        {fontWeight: 'bold', paddingRight: 5, color: theme.danger}:
                        {fontWeight: 'bold', paddingRight: 5, color: theme.background}}>{!isFavourite ? i18n.t(strings.like) : i18n.t(strings.liked)}</Text>
                    <Icon type='octicon'
                          name='heart'
                          size={35}
                          color={!isFavourite ? theme.danger : theme.background}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleEnrollButton}
                    style={!isEnrolled?
                        {flex: 1, flexDirection: 'row', margin: 2, borderColor: theme.primary, borderWidth: 1, justifyContent:'center', alignItems: 'center'}:
                        {flex: 1, flexDirection: 'row', margin: 2, borderColor: theme.background, backgroundColor: theme.primary, borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={!isEnrolled?
                        {fontWeight: 'bold', paddingRight: 5, color: theme.primary}:
                        {fontWeight: 'bold', paddingRight: 5, color: theme.background}}>{!isEnrolled ? i18n.t(strings.enroll) : i18n.t(strings.enrolled)}</Text>
                    <Icon type='ionicons'
                          name='person-add'
                          size={35}
                          color={!isEnrolled ? theme.primary : theme.background}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: theme.primary, borderWidth: 1, margin: 2}}
                onPress={handleShareButton}>
                <Text style={{fontWeight: 'bold', paddingRight: 5, color: theme.primary}}>{i18n.t(strings.share)}</Text>
                <Icon type='ionicons'
                      name='share'
                      size={35}
                      color={theme.primary}/>
            </TouchableOpacity>
            <View style={{padding: 5, paddingTop: 10}}>
                <Text style={styles(theme).headerText}>
                    {i18n.t(strings.description)}
                </Text>
                <Text style={styles(theme).text}>
                    {detail.description}
                </Text>
                <Text style={styles(theme).headerText}>
                    {i18n.t(strings.field)}
                </Text>
                <View>
                    {detail["learnWhat"] && detail["learnWhat"].map(learn => {
                        return (
                            <View
                                key={learn}
                                style={{flexDirection: 'row', marginLeft: 20, marginTop: 5}}>
                                <Icon type='octicon'
                                      name='check'
                                      color={theme.emphasis}/>
                                <Text style={[styles(theme).text, {marginLeft: 20}]}>
                                    {learn}
                                </Text>
                            </View>
                        )
                    })}
                </View>
                <Text style={styles(theme).headerText}>
                    {i18n.t(strings.requirement)}
                </Text>
                <Text style={styles(theme).text}>
                    {detail.requirement}
                </Text>
            </View>
            <View style={{paddingTop: 10}}>
                <SectionHeader2 title='Related Courses'/>
                <HorizontalCourseList
                    navigation={props.navigation}
                    items={detail.coursesLikeCategory}/>
            </View>
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
    headerText: {
        color: theme.text,
        paddingBottom: 5,
        fontWeight: 'bold'
    },
    text: {
        color: theme.text,
        paddingBottom: 10,
    }
});

export default CourseDetailInformation;
