import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import Accordion from 'react-native-collapsible/Accordion';
import {getLessonWithVideoUrl, updateCurrentLearntTimeLessonService} from "../../../Core/Service/course-service";
import {AuthenticationContext} from "../../../Core/Provider/authentication-provider";
import {Icon} from "react-native-elements";
import {CurrentLessonContext} from "../../../Core/Provider/current-lesson-provider";
import * as FileSystem from "expo-file-system";
import {DownloadedCoursesContext} from "../../../Core/Provider/downloaded-courses-provider";
import NoDataView from "../../Common/no-data-view";
import {ContinueCoursesContext} from "../../../Core/Provider/continue-courses-provider";
import {addDownloadStorageUser} from "../../../Core/Service/storage-service";
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";

const CourseDetailLesson = (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const {continueCourses, setContinueCourses} = useContext(ContinueCoursesContext)
    const {downloadedCourses, setDownloadedCourses} = useContext(DownloadedCoursesContext)
    const {currentLesson, setCurrentLesson} = useContext(CurrentLessonContext)

    const [isLoading, setIsLoading] = useState(false)
    const [activeSections, setActiveSections] = useState([0])
    const [courseSections, setCoursesSection] = useState(props.route.params.detail.section)
    const [isAccessible, setIsAccessible] = useState(false)

    const [downloadingLessons, setDownloadingLessons] = useState([])
    const [totalStudied, setTotalStudied] = useState(0)

    const componentWillUnmount = () => {
        console.log('COMPONENT WILL UNMOUNT')
        console.log(currentLesson)
        if (currentLesson.video) {
            let currentTime = null
            let promise
            if (currentLesson.video.videoUrl.includes('youtube')) {
                console.log("YOUTUBE HERE")
                promise = props.route.params.playerRef.current?.getCurrentTime()
                    .then((time) => {
                        console.log(time)
                        currentTime = time
                    })
            } else {
                console.log("MP4 HERE")
                promise = props.route.params.playerRef.current?.getStatusAsync()
                    .then((response) => {
                        console.log(response.positionMillis)
                        currentTime = Number(response.positionMillis) / 1000
                    })
            }
            Promise.all([promise])
                .then(() => {
                    console.log('currenttime: ', currentTime)
                    updateCurrentLearntTimeLessonService(authenticationContext.state.token, currentLesson.id, currentTime)
                        .then((response) => {
                            if (response.status === 200) {
                                console.log('UPDATE latest lesson succeed')
                            }
                        })
                        .catch((error) => {
                            console.log('ERROR: ', error)
                        })
                })
        }
    }

    useEffect(() => {
        if (continueCourses.some(returnItem => returnItem.id === props.route.params.detail.id)) {
            setIsAccessible(true)
            setIsLoading(true)
            if (props.route.params.initialLesson) {
                setCurrentLesson(props.route.params.initialLesson)
            }
            const promiseArray = []
            courseSections.map((section) => {
                section.lesson.map((lesson) => {
                    promiseArray.push(getLessonWithVideoUrl(authenticationContext.state.token, lesson.courseId, lesson.id)
                        .then((response) => {
                            if (response.status === 200) {
                                setTotalStudied(totalStudied => totalStudied + response.data.payload.currentTime)
                                lesson.video = response.data.payload
                            }
                        })
                        .catch((error) => {
                            setIsAccessible(false)
                        })
                    )
                })
            })
            Promise.all(promiseArray)
                .then(() => setIsLoading(false))
        }
    }, [continueCourses])

    // useEffect(() => {
    //     if (continueCourses.some(returnItem => returnItem.id === props.route.params.detail.id)) {
    //         setIsAccessible(true)
    //     }
    // }, [continueCourses])

    const handleOnChangeLesson = (lesson) => {
        if (currentLesson.video) {
            let currentTime = null
            let promise
            if (currentLesson.video.videoUrl.includes('youtube')) {
                promise = props.route.params.playerRef.current?.getCurrentTime()
                    .then((time) => {
                        console.log(time)
                        currentTime = time
                    })
            } else {
                promise = props.route.params.playerRef.current?.getStatusAsync()
                    .then((response) => {
                        console.log(response.positionMillis)
                        currentTime = Number(response.positionMillis) / 1000
                    })
            }
            Promise.all([promise])
                .then(() => {
                    updateCurrentLearntTimeLessonService(authenticationContext.state.token, currentLesson.id, currentTime)
                        .then((response) => {
                            if (response.status === 200) {
                                setCoursesSection(prev => {
                                    const copyCoursesSection = prev.slice()
                                    const st = copyCoursesSection.find((section) => section.id === currentLesson.sectionId)
                                    const ls = st.lesson.find((lesson) => lesson.id === currentLesson.id)
                                    ls.video.currentTime = currentTime
                                    return copyCoursesSection
                                })
                            }
                        })
                        .catch((error) => {
                            console.log('ERROR: ', error)
                        })
                })
        }
        setCurrentLesson(lesson)
        props.route.params.handleOnChangeLesson(lesson)
    }

    const handleDownloadButton = (lesson) => {
        console.log("DOWNLOADNG: ", lesson.id)
        setDownloadingLessons(prev => prev.concat(lesson.id))
        FileSystem.createDownloadResumable(lesson.video.videoUrl,
            FileSystem.documentDirectory + lesson.id + '.mp4',
            {},
            (downloadProgressData) => {
            if (downloadProgressData.totalBytesWritten === downloadProgressData.totalBytesExpectedToWrite) {
                setDownloadingLessons(prev => prev.filter(returnItem => returnItem !== lesson.id))
            }
            }
        )
            .downloadAsync()
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
                lesson.video.videoUrl = uri
                addDownloadStorageUser(authenticationContext.state.userInfo.email, lesson)
                    .then(() => {
                        setDownloadedCourses(prev => prev.concat(lesson))
                    })
            })
    }

    const _renderHeader = (section, index) => {
        return (
            <View
                key={section.id}
                style={{backgroundColor: theme.background, justifyContent:'center', paddingTop: 10, paddingBottom: 10}}>
                <Text style={{color: theme.primary, fontSize: 15, fontWeight: 'bold', paddingLeft: 5, paddingRight: 5}}>
                    {`Section ${index + 1} - ${section.name}`}
                </Text>
            </View>
        );
    };

    const _renderContent = section => {
        const renderLessonIcon = (lesson) => {
            if (downloadedCourses.some(returnItem => returnItem.id === lesson.id)) {
                return <View style={{justifyContent: 'center', alignItems: 'center', flex: 1.5}}>
                            <Icon type="simple-line-icon"
                                  name="check"
                                  color="green"/>
                        </View>

            } else {
                    if (downloadingLessons.some(returnItem => returnItem === lesson.id)) {
                        return <ActivityIndicator style={{justifyContent: 'center', alignItems: 'center', flex: 1.5}}/>
                    } else {
                        if (lesson.video.videoUrl.includes('youtube')) {
                            return <TouchableOpacity
                                onPress={() => handleDownloadButton(lesson)}
                                style={{justifyContent: 'center', alignItems: 'center', flex: 1.5}}>
                                <Icon
                                    type='simple-line-icon'
                                    name='cloud-download'
                                    color={theme.emphasis}/>
                            </TouchableOpacity>
                        } else {
                            return <TouchableOpacity
                                onPress={() => handleDownloadButton(lesson)}
                                style={{justifyContent: 'center', alignItems: 'center', flex: 1.5}}>
                                <Icon
                                    type='simple-line-icon'
                                    name='cloud-download'
                                    color={theme.emphasis}/>
                            </TouchableOpacity>
                        }
                    }
            }
        }
        const renderLessonItem = (lesson, index) => {
            const totalMinutes = (Number(lesson.hours) * 60).toFixed(2)
            const currentTime = (lesson.video.currentTime !== null) ? `${(Number(lesson.video.currentTime)/60).toFixed(2)}` : `0`
            return (
                <TouchableOpacity
                    key={lesson.id}
                    onPress={() => handleOnChangeLesson(lesson)}
                    style={{flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                    <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={(lesson.id === currentLesson.id) ? {fontSize: 10, fontWeight: 'bold', color: theme.text} : {fontSize: 10, color: theme.text}}>{index + 1}</Text>
                    </View>
                    <View style={{flex: 8}}>
                        <Text style={(lesson.id === currentLesson.id) ? {color: theme.text, fontSize: 14, paddingBottom: 8, fontWeight: 'bold'} : {color: theme.text, fontSize: 14, paddingBottom: 8}}>
                            {lesson.name}
                        </Text>
                        {/*${lesson.video.currentTime}*/}
                        <Text style={(lesson.id === currentLesson.id) ? {color: theme.text, fontSize: 10, fontWeight: 'bold'} : {color: theme.text, fontSize: 10}}>
                            {`at ${currentTime} minutes / ${totalMinutes} minutes`}
                        </Text>
                    </View>
                    {renderLessonIcon(lesson)}
                </TouchableOpacity>
            )
        }

        return (
            <View
                key={section.id}
                style={{paddingTop: 5, paddingBottom: 5}}>
                {section.lesson.map((lesson, index) => {
                    return renderLessonItem(lesson, index)
                })}
            </View>
        );
    };

    const _updateSections = activeSections => {
        setActiveSections(activeSections)
    };

    if (!authenticationContext.state.isAuthenticated) {
        return (
            <NoDataView message={i18n.t(strings.unauthentication_instruction)}/>
        )
    } else if (isLoading) {
        return (
            <View style={{marginTop: 20}}>
                <ActivityIndicator size='small'
                                   color={theme.emphasis}/>
            </View>
        )
    } else if (!isAccessible) {
        return (
            <NoDataView message={i18n.t(strings.no_data_view_no_enroll)}/>
        )
    } else {
        return (
            <ScrollView style={styles(theme).container}>
                <View style={{padding: 5}}>
                    <Text style={{color: theme.text, textDecorationLine: "underline"}}>You have studied {(totalStudied / 60).toFixed(2)} minutes</Text>
                </View>
                <Accordion
                    sections={courseSections}
                    activeSections={activeSections}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    expandMultiple
                />
            </ScrollView>
        )
    }
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});

export default CourseDetailLesson;
