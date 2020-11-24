import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import VerticalCourseList from "../CoursesList/VerticalCourseList/vertical-course-list";
import {courses} from "../../Data/data";
import SectionHeader2 from "../Common/section-header-2";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext} from "../../Provider/language-provider";

const AuthorDetail = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    return(
        <ScrollView style={styles(theme).container}>
            {/*image container*/}
            <View style={styles(theme).avatarContainer}>
                <Image style={styles(theme).image} source={{uri:'https://i.pinimg.com/originals/8a/f7/ed/8af7ed2daec49e34d1dbfeb52ba7a582.jpg'}}/>
            </View>

            {/*info container*/}
            <View style={styles(theme).infoContainer}>
                <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 16}]}>{props.route.params.item.name}</Text>
                <Text style={styles(theme).text}>{`${props.route.params.item.courses} courses`}</Text>
            </View>

            {/*courses container*/}
            <View style={styles(theme).coursesContainer}>
                <View style={styles(theme).header}>
                    <SectionHeader2 title={language.courses}/>
                </View>
                <VerticalCourseList
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
    avatarContainer: {
        height: 350,
        width: 350,
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        //borderRadius: 175,
        borderWidth: 2,
        borderColor: theme.primaryEmphasis,
        aspectRatio: 1
    },
    infoContainer: {
        alignItems: 'center',
        padding: 10
    },
    text: {
        color: theme.normalText
    },
    header: {
        paddingTop: 15,
        paddingBottom: 10
    },
    coursesContainer: {
        padding: 5
    }
});


export default AuthorDetail;
