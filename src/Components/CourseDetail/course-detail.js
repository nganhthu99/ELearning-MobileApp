import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import CourseDetailTab from "./course-detail-tab";
import {
    getCourseDetail,
    getLastWatchedLessonService,
    getLessonDetailService,
    getLessonWithVideoUrl
} from "../../Core/Service/course-service";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import { Video } from 'expo-av';
import {Button} from "react-native-elements";
import {AuthenticationContext} from "../../Core/Provider/authentication-provider";

const CourseDetail = (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const [isLoading, setIsLoading] = useState(true)
    const [detail, setDetail] = useState({})
    const [initialLesson, setInitialLesson] = useState(null)

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
                            })
                            .finally(() => {
                                setIsLoading(false)
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                        setVideo({
                            url: promoVidUrl,
                            currentTime: 0
                        })
                    })
            })
    }, [])

    const handleOnChangeLesson =  (lesson) => {
        setVideo({
            url: lesson.video.videoUrl,
            currentTime: lesson.video.currentTime
        })
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
                {!video.url.includes('youtube') &&
                <Video
                    onLoadStart={async () => {await playerRef.current.setPositionAsync(video.currentTime * 1000)}}
                    source={{uri: video.url}}
                    shouldPlay={true}
                    useNativeControls
                    ref={playerRef}
                    style={{height: 220}}/>}
                {video.url.includes('youtube') &&
                <YoutubePlayer
                    onReady={() => {playerRef.current.seekTo(video.currentTime)}}
                    videoId={video.url.substring(25)}
                    play={true}
                    ref={playerRef}
                    height={220}
                    volume={50}
                    playbackRate={1}/>}
                {/*<Button title='Seek to'*/}
                {/*        onPress={async () => {await playerRef.current.setPositionAsync(15000)}}/>*/}
                {/*<Button title='Seek to'*/}
                {/*        onPress={() => {playerRef.current.seekTo(15)}}/>*/}
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
