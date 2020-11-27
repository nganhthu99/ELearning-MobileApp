import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../../../Provider/theme-provider";
import Accordion from 'react-native-collapsible/Accordion';
import {courses} from "../../../Data/data";

const CourseDetailExercise= (props) => {
    const {theme} = useContext(ThemeContext)
    const [activeSections, setActiveSections] = useState([])

    const SECTIONS = courses[0].exercise

    const _renderHeader = section => {
        return (
            <View style={{borderTopWidth: 1, borderTopColor: theme.primaryButton, borderBottomWidth: 1, borderBottomColor: theme.primaryButton, backgroundColor: theme.primaryButton, justifyContent:'center', paddingTop: 10, paddingBottom: 10}}>
                <Text style={{color: theme.background, fontSize: 16, fontWeight: 'bold', paddingLeft: 5, paddingRight: 5}}>{`${section.id}.  ${section.title}`}</Text>
            </View>
        );
    };

    const _renderContent = section => {
        return (
            <View style={{paddingLeft: 5, paddingRight: 5, paddingTop: 10}}>
                <Text style={{color: theme.normalText}}>{section.content}</Text>
            </View>
        );
    };

    const _updateSections = activeSections => {
        setActiveSections(activeSections);
    };

    return (
        <ScrollView style={styles(theme).container}>
            <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
            />
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});

export default CourseDetailExercise;
