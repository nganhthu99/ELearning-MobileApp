import React from 'react';
import CourseList from "../../CoursesList/VerticalCourseList/course-list";
import {ScrollView, StyleSheet, View} from "react-native";
import SectionFooter from "../../Common/section-footer";
import SectionHeader from "../../Common/section-header";
import VerticalCourseList from "../../CoursesList/VerticalCourseList/vertical-course-list";
import {authors, courses} from "../../../Data/data";
import VerticalAuthorList from "../../AuthorList/VerticalAuthorList/vertical-author-list";

const SearchResultAll = (props) => {
    const handleCoursesSeeAll = () => {
        props.navigation.navigate('Courses')
    }

    const handleAuthorsSeeAll = () => {
        props.navigation.navigate('Authors')
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.coursesContainer}>
                <View style={styles.header}>
                    <SectionHeader title='Courses' handleOnClick={handleCoursesSeeAll}/>
                </View>
                <VerticalCourseList
                    navigation={props.route.params.navigation}
                    items={courses}/>
            </View>
            <View style={styles.authorsContainer}>
                <View style={[styles.header, {paddingLeft: 5, paddingTop: 20}]}>
                    <SectionHeader title='Authors' handleOnClick={handleAuthorsSeeAll}/>
                </View>
                <VerticalAuthorList
                    navigation={props.route.params.navigation}
                    items={authors}/>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
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
