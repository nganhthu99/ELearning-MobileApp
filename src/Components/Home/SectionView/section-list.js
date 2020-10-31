import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import CourseInfo from "../course-info";
import SectionListHeader from "./section-list-header";
import SectionListItem from "./section-list-item";

const SectionList = (props) => {
    const renderListItems = (courses) => {
        return courses.map((item) => {
            return <SectionListItem key={item.id} item={item} type={props.type}/>
        })
    }

    return (
        <View style={styles.container}>
            <SectionListHeader title={props.title}/>
            <ScrollView horizontal={true}>
                {renderListItems(props.items)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
        //backgroundColor: '#F2F2F2',

        // borderWidth: 10,
        // borderColor: '#AAAAAA',
    },
});

export default SectionList;
