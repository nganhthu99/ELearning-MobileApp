import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {Video} from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";
import CourseDetailTab from "./course-detail-tab";
import {getCourseDetail} from "../../Core/Service/course-service";
import {ThemeContext} from "../../Core/Provider/theme-provider";

const CourseDetail = (props) => {
    const {theme} = useContext(ThemeContext)
    const [isLoading, setIsLoading] = useState(true)
    const [detail, setDetail] = useState({})
    const [video, setVideo] = useState(null)
    const [youtube, setYoutube] = useState(null)
    let playerRef = useRef(null)

    useEffect(() => {
        getCourseDetail(props.route.params.itemId)
            .then((response) => {
                if(response.status === 200) {
                    setDetail(response.data.payload)
                    setVideo(response.data.payload.promoVidUrl)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const handleOnChangeLesson = (lesson) => {
        if (lesson.video.videoUrl.includes('youtube')) {
            setYoutube(lesson.video.videoUrl.substring(25))
        }
        setVideo(lesson.video.videoUrl)
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
                {!youtube &&
                <Video
                    source={{uri: video}}
                    shouldPlay={false}
                    useNativeControls
                    ref={playerRef}
                    style={{height: 220}}/>}
                {youtube &&
                <YoutubePlayer
                    videoId={youtube}
                    play={false}
                    ref={playerRef}
                    height={220}
                    volume={50}
                    playbackRate={1}
                />}
                {/*<Button title='Seek to'*/}
                {/*        onPress={async () => {await playerRef.current.setPositionAsync(15000)}}/>*/}
                <CourseDetailTab
                    handleOnChangeLesson={handleOnChangeLesson}
                    navigation={props.navigation}
                    itemId={props.route.params.itemId}
                    detail={detail}
                />
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
