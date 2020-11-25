import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import SectionHeader from "../../Common/section-header";
import VerticalCourseList from "../../CoursesList/VerticalCourseList/vertical-course-list";
import {authors, courses} from "../../../Data/data";
import VerticalAuthorList from "../../AuthorList/VerticalAuthorList/vertical-author-list";
import {ScreenName} from "../../../Globals/constants";
import {ThemeContext} from "../../../Provider/theme-provider";
import {LanguageContext} from "../../../Provider/language-provider";

const SearchResultAll = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    const handleCoursesSeeAll = () => {
        props.navigation.navigate(ScreenName.CourseList)
    }

    const handleAuthorsSeeAll = () => {
        props.navigation.navigate(ScreenName.AuthorList)
    }

    return (
        <ScrollView style={styles(theme).container}>
            <View style={styles(theme).coursesContainer}>
                <View style={styles(theme).header}>
                    <SectionHeader title={language.courses} handleOnClick={handleCoursesSeeAll}/>
                </View>
                <VerticalCourseList
                    navigation={props.route.params.navigation}
                    items={courses}/>
            </View>
            <View style={styles(theme).authorsContainer}>
                <View style={[styles(theme).header, {paddingLeft: 5, paddingTop: 20}]}>
                    <SectionHeader title={language.authors} handleOnClick={handleAuthorsSeeAll}/>
                </View>
                <VerticalAuthorList
                    navigation={props.route.params.navigation}
                    items={authors}/>
            </View>
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
    coursesContainer: {
        padding: 5
    },
    authorsContainer: {
        padding: 5
    },
    header: {
        paddingTop: 15,
    }
});

export default SearchResultAll;
