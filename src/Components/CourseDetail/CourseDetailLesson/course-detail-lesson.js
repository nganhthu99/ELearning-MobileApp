import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import Accordion from 'react-native-collapsible/Accordion';
import {getLessonWithVideoUrl} from "../../../Core/Service/course-service";
import {AuthenticationContext} from "../../../Core/Provider/authentication-provider";
import {Icon} from "react-native-elements";
import {CurrentLessonContext} from "../../../Core/Provider/current-lesson-provider";
import * as FileSystem from "expo-file-system";
import {setStorageDownloadedVideo} from "../../../Core/Service/async-storage-service";
import {DownloadedCoursesContext} from "../../../Core/Provider/downloaded-courses-provider";
import NoDataView from "../../Common/no-data-view";

const CourseDetailLesson = (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const {downloadedCourses, setDownloadedCourses} = useContext(DownloadedCoursesContext)
    const {currentLesson, setCurrentLesson} = useContext(CurrentLessonContext)
    const [isLoading, setIsLoading] = useState(true)
    const [activeSections, setActiveSections] = useState([0])
    const [courseSections, setCoursesSection] = useState(props.route.params.detail.section)
    const [error, setError] = useState(null)

    useEffect(() => {
        courseSections.map((section) => {
            section.lesson.map((lesson) => {
                getLessonWithVideoUrl(authenticationContext.state.token, lesson.courseId, lesson.id)
                    .then((response) => {
                        if (response.status === 200) {
                            lesson.video = response.data.payload
                        }
                    })
                    .catch((error) => {
                        setError(error)
                    })
            })
        })
        setIsLoading(false)
    }, [])

    const handleOnChangeLesson = (lesson) => {
        setCurrentLesson(lesson)
        props.route.params.handleOnChangeLesson(lesson)
    }

    const handleDownloadButton = (lesson) => {
        console.log('downloading: ', lesson.id)
        console.log(FileSystem.documentDirectory)
        FileSystem.downloadAsync(
            lesson.video.videoUrl,
            FileSystem.documentDirectory + lesson.id +'.mp4'
        )
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
                lesson.video.videoUrl = uri
                setStorageDownloadedVideo(lesson)
                    .then(() => {})
                setDownloadedCourses(prev => prev.concat(lesson))
            })
            .catch(error => {
                console.error(error);
            });
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
        const renderLessonItem = (lesson, index) => {
            return (
                <TouchableOpacity
                    key={lesson.id}
                    onPress={() => handleOnChangeLesson(lesson)}
                    style={{flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                    <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 10}}>{index + 1}</Text>
                    </View>
                    <View style={{flex: 8}}>
                        <Text style={{color: theme.text, fontSize: 14, paddingBottom: 8}}>
                            {lesson.name}
                        </Text>
                        <Text style={{color: theme.text, fontSize: 10}}>
                            {`${lesson.hours} hours`}
                        </Text>
                    </View>
                    {lesson.video && !lesson.video.videoUrl.includes('youtube') &&
                    <TouchableOpacity
                        onPress={() => handleDownloadButton(lesson)}
                        style={{justifyContent: 'center', alignItems: 'center', flex: 1.5}}>
                        <Icon
                            type='simple-line-icon'
                            name='cloud-download'
                            color={theme.emphasis}/>
                    </TouchableOpacity>}
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
            <NoDataView message={`Please sign in to view more.`}/>
        )
    } else if (isLoading) {
        return (
            <View style={{marginTop: 20}}>
                <ActivityIndicator size='small'
                                   color={theme.emphasis}/>
            </View>
        )
    } else if (error) {
        return (
            <NoDataView message={`You must enroll to access this course's lessons.`}/>
        )
    } else {
        return (
            <ScrollView style={styles(theme).container}>
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
