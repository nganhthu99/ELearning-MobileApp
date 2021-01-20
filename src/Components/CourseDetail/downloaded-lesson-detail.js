import React, {useContext, useRef} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Video} from "expo-av";
import {ThemeContext} from "../../Core/Provider/theme-provider";

const DownloadedLessonDetail = (props) => {
    const {theme} = useContext(ThemeContext)
    let playerRef = useRef(null)

    return (
        <View style={styles(theme).container}>
            <Video
                source={{uri: props.route.params.item.video.videoUrl}}
                shouldPlay={false}
                useNativeControls
                ref={playerRef}
                style={{
                    backgroundColor: '#111111',
                    height: 220
                }}/>
            <View style={{padding: 5}}>
                <Text style={{fontSize: 20, paddingBottom: 5 , color: theme.text}}>
                    {props.route.params.item.name}
                </Text>
                <Text style={{fontSize: 14 , color: theme.text}}>
                    {`${props.route.params.item.hours} hours`}
                </Text>
            </View>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: theme.background
    },
});

export default DownloadedLessonDetail;
