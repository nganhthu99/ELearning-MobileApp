import React, {useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import HorizontalCourseList from "../../CoursesList/HorizontalCourseList/horizontal-course-list";
import {courses} from "../../../Data/data";
import CourseInfo from "../../CoursesList/course-info";
import SectionHeader2 from "../../Common/section-header-2";
import {ThemeContext} from "../../../Provider/theme-provider";
import {RegisteredCoursesContext} from "../../../Provider/registered-courses-provider";
import {DownloadedCoursesContext} from "../../../Provider/downloaded-courses-provider";
import {FavouriteCoursesContext} from "../../../Provider/favourite-courses-provider";
import {AuthenticationContext} from "../../../Provider/authentication-provider";
import ViewMoreText from "react-native-view-more-text";

const CourseDetailInformation = (props) => {
    const item = props.route.params.item
    const {theme} = useContext(ThemeContext)
    const {authentication} = useContext(AuthenticationContext)
    const {registeredCourses, setRegisteredCourses} = useContext(RegisteredCoursesContext)
    const {downloadedCourses, setDownloadedCourses} = useContext(DownloadedCoursesContext)
    const {favouriteCourses, setFavouriteCourses} = useContext(FavouriteCoursesContext)

    const [isRegistered, setIsRegistered] = useState(
        (registeredCourses.some(returnItem => returnItem.id === item.id))
    )

    const [isDownloaded, setIsDownloaded] = useState(
        (downloadedCourses.some(returnItem => returnItem.id === item.id))
    )
    const [isFavourite, setIsFavourite] = useState(
        (favouriteCourses.some(returnItem => returnItem.id === item.id))
    )

    const alert = () => Alert.alert(
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

    const handleRegisteredButton = () => {
        if (authentication) {
            if (isRegistered) {
                Alert.alert(
                    'Message',
                    'Do you want to register to this course?',
                    [
                        {
                            text: 'OK',
                            onPress: () => setIsRegistered(!isRegistered)
                        },
                        {
                            text: 'Cancel',
                            onPress: () => {
                            },
                            style: 'cancel'
                        }
                    ]
                );
            } else {
                Alert.alert(
                    'Message',
                    'Do you want to unregister this course?',
                    [
                        {
                            text: 'OK',
                            onPress: () => setIsRegistered(!isRegistered)
                        },
                        {
                            text: 'Cancel',
                            onPress: () => {
                            },
                            style: 'cancel'
                        }
                    ]
                );
            }
            setIsRegistered(!isRegistered)
        }
        else {
            alert()
        }
    }

    const handleDownloadedButton = () => {
        if (authentication) setIsDownloaded(!isDownloaded)
        else {
            alert()
        }
    }

    const handleFavouriteButton = () => {
        if (authentication) setIsFavourite(!isFavourite)
        else {
            alert()
        }
    }

    const handleShareButton = () => {
        if (authentication) {
            Share.share({
                message: 'Share course'
            })
        }
        else {
            alert()
        }
    }

    useEffect(() => {
        if (isFavourite) {
            if (!favouriteCourses.some(returnItem => returnItem.id === item.id)) {
                const newFavourite = favouriteCourses.slice()
                setFavouriteCourses(newFavourite.concat(item))
            }
        } else {
            const newFavourite = favouriteCourses.filter(returnItem => returnItem.id !== item.id)
            setFavouriteCourses(newFavourite)
        }
    },[isFavourite])

    useEffect(() => {
        if (isRegistered) {
            if (!registeredCourses.some(returnItem => returnItem.id === item.id)) {
                const newRegistered = registeredCourses.slice()
                setRegisteredCourses(newRegistered.concat(item))
            }
        } else {
            const newRegistered = registeredCourses.filter(returnItem => returnItem.id !== item.id)
            setRegisteredCourses(newRegistered)
        }
    },[isRegistered])

    useEffect(() => {
        if (isDownloaded) {
            if (!downloadedCourses.some(returnItem => returnItem.id === item.id)) {
                const newDownloaded = downloadedCourses.slice()
                setDownloadedCourses(newDownloaded.concat(item))
            }
        } else {
            const newDownloaded = downloadedCourses.filter(returnItem => returnItem.id !== item.id)
            setDownloadedCourses(newDownloaded)
        }
    },[isDownloaded])

    return (
        <ScrollView style={styles(theme).container}>
            <View style={{padding: 5}}>
                <CourseInfo item={item}/>
            </View>
            <View style={{flexDirection: "row", justifyContent:'space-evenly', padding: 5}}>
                <TouchableOpacity
                    onPress={handleFavouriteButton}
                    style={(isFavourite && authentication) ? styles(theme).pressedButton : styles(theme).unPressedButton}>
                    <Icon type='octicon'
                          name='heart'
                          size={35}
                          iconStyle={(isFavourite && authentication) ? styles(theme).pressedIcon : styles(theme).unPressedIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleRegisteredButton}
                    style={(isRegistered && authentication) ? styles(theme).pressedButton : styles(theme).unPressedButton}>
                    <Icon type='octicon'
                          name='pencil'
                          size={35}
                          iconStyle={(isRegistered && authentication) ? styles(theme).pressedIcon : styles(theme).unPressedIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleDownloadedButton}
                    style={(isDownloaded && authentication) ? styles(theme).pressedButton : styles(theme).unPressedButton}>
                    <Icon type='ionicons'
                          name='cloud-download'
                          size={35}
                          iconStyle={(isDownloaded && authentication) ? styles(theme).pressedIcon : styles(theme).unPressedIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleShareButton}
                    style={{flex: 1, borderColor:theme.primaryButton, borderWidth: 1}}>
                    <Icon type='ionicons'
                          name='share'
                          size={35}
                          iconStyle={styles(theme).unPressedIcon}/>
                </TouchableOpacity>
            </View>
            <View style={{padding: 5, paddingTop: 20}}>
                <ViewMoreText
                    numberOfLines={5}
                    renderViewMore={(onPress) => (
                        <Text onPress={onPress}
                              style={{color:theme.primaryButton, fontSize: 16}}>
                            View more
                        </Text>
                    )}
                    renderViewLess={(onPress) => (
                        <Text onPress={onPress}
                              style={{color:theme.primaryButton, fontSize: 16}}>
                            View less
                        </Text>
                    )}
                    textStyle={{color: theme.normalText}}
                >
                    <Text>
                        {item.overview}
                    </Text>
                </ViewMoreText>
            </View>
            <View style={{padding: 5}}>
                <View style={{paddingTop: 5, paddingBottom: 10}}>
                    <SectionHeader2 title='Related Courses'/>
                </View>
                <HorizontalCourseList
                    navigation={props.navigation}
                    items={courses}/>
            </View>
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
    pressedButton: {
        flex: 1,
        backgroundColor: theme.primaryButton,
        borderColor:theme.background,
        borderWidth: 1,
    },
    pressedIcon: {
        color: theme.background
    },
    unPressedButton : {
        flex: 1,
        borderColor:theme.primaryButton,
        borderWidth: 1,
    },
    unPressedIcon: {
        color: theme.primaryButton
    }
});

export default CourseDetailInformation;
