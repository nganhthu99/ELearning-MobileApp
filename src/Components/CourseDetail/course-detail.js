import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import CourseDetailTab from "./course-detail-tab";
import {
    getCourseDetail,
    getLastWatchedLessonService,
    getLessonDetailService,
} from "../../Core/Service/course-service";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import { Video } from 'expo-av';
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";
import {ContinueCoursesContext} from "../../Core/Provider/continue-courses-provider";

const CourseDetail = (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const {continueCourses, setContinueCourses} = useContext(ContinueCoursesContext)
    const [isLoading, setIsLoading] = useState(true)
    const [detail, setDetail] = useState({})
    const [initialLesson, setInitialLesson] = useState(null) //
    const [video, setVideo] = useState({
        url: '',
        currentTime: 0
    })
    let playerRef = useRef(null)

    useEffect(() => {
        let promoVidUrl
        getCourseDetail(props.route.params.itemId)
            .then((response) => {
                if(response.status === 200) {
                    promoVidUrl = response.data.payload.promoVidUrl
                    setDetail(response.data.payload)
                }
            })
            .then(() => {
                if (continueCourses.some(returnItem => returnItem.id === props.route.params.itemId)) {
                    getLastWatchedLessonService(authenticationContext.state.token, props.route.params.itemId)
                        .then((response) => {
                            if (response.status === 200) {
                                setVideo({
                                    url: response.data.payload.videoUrl,
                                    currentTime: response.data.payload.currentTime,
                                })
                                return response.data.payload
                            }
                        })
                        .then((video) => {
                            getLessonDetailService(authenticationContext.state.token, props.route.params.itemId, video.lessonId)
                                .then((response) => {
                                    if (response.status === 200) {
                                        const newLesson = response.data.payload
                                        newLesson.video = video
                                        setInitialLesson(newLesson)
                                    }
                                    setIsLoading(false)
                                })
                        })
                        .catch((error) => {
                            setVideo({
                                url: promoVidUrl,
                                currentTime: 0
                            })
                        })
                } else {
                    setIsLoading(false)
                    setVideo({
                        url: promoVidUrl,
                        currentTime: 0
                    })
                }
            })
    }, [])

    const handleOnChangeLesson =  (lesson) => {
        setVideo({
            url: lesson.video.videoUrl,
            currentTime: lesson.video.currentTime
        })
    }

    const renderVideo = () => {
        if (video.url.includes('youtube')) {
            return (
                <YoutubePlayer
                    onReady={() => {playerRef.current.seekTo(video.currentTime)}}
                    videoId={video.url.substring(25)}
                    // play={true}
                    ref={playerRef}
                    height={220}
                    volume={50}
                    playbackRate={1}/>
            )
        } else if (video.url) {
            return (
                <Video
                    onLoadStart={async () => {await playerRef.current.setPositionAsync(video.currentTime * 1000)}}
                    source={{uri: video.url}}
                    // shouldPlay={true}
                    volume={1.0}
                    isMuted={false}
                    useNativeControls
                    ref={playerRef}
                    style={{height: 220}}/>
            )
        }
    }

    if (isLoading) {
        return (
            <View style={{marginTop: 40}}>
                <ActivityIndicator size='small'
                                   color={theme.emphasis}/>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                {renderVideo()}
                <CourseDetailTab
                    initialLesson={initialLesson}
                    playerRef={playerRef}
                    handleOnChangeLesson={handleOnChangeLesson}
                    navigation={props.navigation}
                    itemId={props.route.params.itemId}
                    detail={detail}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
});

export default CourseDetail;
