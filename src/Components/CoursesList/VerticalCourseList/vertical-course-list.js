import React, {useContext} from 'react';
import {FlatList, StyleSheet, View, Animated, TouchableOpacity, Text} from "react-native";
import {Icon} from "react-native-elements";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import VerticalCourseItem from "./vertical-course-item";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";
import {LanguageContext} from "../../../Provider/language-provider";
import {RegisteredCoursesContext} from "../../../Provider/registered-courses-provider";
import {DownloadedCoursesContext} from "../../../Provider/downloaded-courses-provider";
import {FavouriteCoursesContext} from "../../../Provider/favourite-courses-provider";

const VerticalCourseList = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    const {registeredCourses, setRegisteredCourses} = useContext(RegisteredCoursesContext)
    const {downloadedCourses, setDownloadedCourses} = useContext(DownloadedCoursesContext)
    const {favouriteCourses, setFavouriteCourses} = useContext(FavouriteCoursesContext)

    let courses
    let setCourses
    let isSwipeable=false
    if (props.header === language.registered ||
        props.header === language.downloaded ||
        props.header === language.favourite) {
        isSwipeable=true
        if (props.header === language.registered) {
            courses = registeredCourses
            setCourses = setRegisteredCourses
        } else if (props.header === language.downloaded) {
            courses = downloadedCourses
            setCourses = setDownloadedCourses
        } else if (props.header === language.favourite) {
            courses = favouriteCourses
            setCourses = setFavouriteCourses
        }
    } else {
        courses = props.items
    }

    //Control
    const handleOnClick = (item) => {
        props.navigation.navigate(ScreenName.CourseDetail, {
            item: item
        })
    }

    const handleDeleteItem = (itemId) => {
        const newListCourses = courses.filter(returnItem => returnItem.id !== itemId)
        setCourses(newListCourses)
    }

    const renderItem = ({ item }) => {
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
        if (isSwipeable) {
            return (
                <Swipeable
                    key={item.id}
                    renderLeftActions={(progress, dragX) =>
                        renderLeftActions(progress, dragX, () => {
                            handleDeleteItem(item.id)
                        })
                    }>
                    <View key={item.id} style={{height: 140, paddingTop: 20}}>
                        <VerticalCourseItem
                            handleOnClick={handleOnClick}
                            key={item.id}
                            item={item}/>
                    </View>
                </Swipeable>
            )
        } else {
            return (
                <View key={item.id} style={{height: 140, paddingTop: 20}}>
                    <VerticalCourseItem
                        handleOnClick={handleOnClick}
                        key={item.id}
                        item={item}/>
                </View>
            );
        }
    };
    return(
        <View style={styles(theme).container}>
            <FlatList data={courses} renderItem={renderItem}/>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
});

export default VerticalCourseList;
