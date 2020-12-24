import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import VerticalCourseList from "../../CoursesList/VerticalCourseList/vertical-course-list";
import VerticalAuthorList from "../../AuthorList/VerticalAuthorList/vertical-author-list";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import SectionHeader3 from "../../Common/section-header-3";
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";

const SearchResultAll = (props) => {
    const {theme} = useContext(ThemeContext)

    return (
        <ScrollView style={styles(theme).container}>
            <View style={styles(theme).coursesContainer}>
                <SectionHeader3
                    title={i18n.t(strings.courses)}
                    number={props.route.params.courses.total}/>
                <VerticalCourseList
                    navigation={props.route.params.navigation}
                    items={props.route.params.courses.data}/>
            </View>
            <View style={styles(theme).authorsContainer}>
                <SectionHeader3
                    title={i18n.t(strings.authors)}
                    number={props.route.params.authors.total}/>
                <VerticalAuthorList
                    navigation={props.route.params.navigation}
                    items={props.route.params.authors.data}/>
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
