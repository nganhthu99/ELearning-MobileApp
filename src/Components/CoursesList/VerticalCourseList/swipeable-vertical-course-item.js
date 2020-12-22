import React, {useContext} from 'react';
import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import CourseInfo2 from "../course-info-2";

const SwipeableVerticalCourseItem = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleOnClick = () => {
        props.handleOnClick(props.item)
    }

    const handleOnDelete = () => {
        props.handleOnDelete(props.item.id)
    }

    const renderLeftActions = (progress, dragX, onPress) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <Animated.View style={{transform: [{translateX: trans}]}}>
                <TouchableOpacity
                    onPress={onPress}
                    style={{width: 100, height: '100%', backgroundColor: theme.listDivider, justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{color: '#A62103', paddingBottom: 10}}>DELETE</Text>
                    <Icon name='trash' type='font-awesome-5' color='#A62103' size={30}/>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <Swipeable
            key={props.item.id}
            renderLeftActions={(progress, dragX) =>
                renderLeftActions(progress, dragX, () => {
                    handleOnDelete()
                })
            }>
            <TouchableOpacity style={styles(theme).container}
                              onPress={handleOnClick}>
                <View style={styles(theme).imageContainer}>
                    <Image source={{uri: props.item["courseImage"]}}
                           style={styles(theme).image}/>
                </View>
                <View style={styles(theme).infoContainer}>
                    <CourseInfo2 item={props.item}/>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 135,
        paddingTop: 15
    },
    imageContainer:{
        flex: 1,
        height: 95,
        width: 95,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 10,
    },
    infoContainer: {
        flex: 3,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    }
})

export default SwipeableVerticalCourseItem;
