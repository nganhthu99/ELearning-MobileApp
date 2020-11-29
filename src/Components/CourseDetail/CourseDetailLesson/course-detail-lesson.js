import React, {useContext, useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../../../Provider/theme-provider";
import Accordion from 'react-native-collapsible/Accordion';
import {courses} from "../../../Data/data";
import Collapsible from 'react-native-collapsible';

const CourseDetailLesson = (props) => {
    const {theme} = useContext(ThemeContext)
    const [activeSections, setActiveSections] = useState([0])
    const SECTIONS = courses[0].lesson

    useEffect(() => {
        props.route.params.handleOnChangeLesson(activeSections)
    }, [activeSections])

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
        setActiveSections(activeSections)
    };

    return (
        <ScrollView style={styles(theme).container}>
            <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
                // expandMultiple
            />
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
});

export default CourseDetailLesson;
