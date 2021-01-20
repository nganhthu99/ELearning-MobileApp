import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import Accordion from 'react-native-collapsible/Accordion';
import {AuthenticationContext} from "../../../Core/Provider/authentication-provider";
import {getExerciseQuestions, getLessonExercises} from "../../../Core/Service/course-service";
import {CurrentLessonContext} from "../../../Core/Provider/current-lesson-provider";
import NoDataView from "../../Common/no-data-view";
import i18n from 'i18n-js';
import {strings} from "../../../Globals/Localization/string";
import {ContinueCoursesContext} from "../../../Core/Provider/continue-courses-provider";

const CourseDetailExercise= (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const [isLoading, setIsLoading] = useState(true)
    const [activeSections, setActiveSections] = useState([0])
    const [exerciseSections, setExerciseSections] = useState([])

    const {currentLesson, setCurrentLesson} = useContext(CurrentLessonContext)

    const {continueCourses, setContinueCourses} = useContext(ContinueCoursesContext)
    const [isAccessible, setIsAccessible] = useState(false)

    useEffect(() => {
        if (continueCourses.some(returnItem => returnItem.id === props.route.params.courseId)) {
            setIsAccessible(true)
        }
    }, [continueCourses])

    useEffect(() => {
        if (authenticationContext.state.isAuthenticated) {
            if (currentLesson.id) {
                getLessonExercises(authenticationContext.state.token, currentLesson.id)
                    .then((response) => {
                        if (response.status === 200) {
                            setExerciseSections(response.data.payload.exercises)
                        }
                    })
            }
        }
    }, [currentLesson])

    useEffect(() => {
        if (authenticationContext.state.isAuthenticated) {
            const promiseArray = []
            exerciseSections.map((exercise) => {
                promiseArray.push(getExerciseQuestions(authenticationContext.state.token, exercise.id)
                    .then((response) => {
                        if (response.status === 200) {
                            exercise.exercises_questions = response.data.payload.exercises.exercises_questions
                        }
                    }))
            })
            Promise.all(promiseArray)
                .then(() => {
                    setIsLoading(false)
                })
        }
    }, [exerciseSections])

    const _renderHeader = (section, index) => {
        return (
            <View
                key={section.id}
                style={{backgroundColor: theme.background, justifyContent:'center', paddingTop: 10, paddingBottom: 5}}>
                <Text style={{color: theme.primary, fontSize: 15, fontWeight: 'bold', paddingLeft: 5, paddingRight: 5}}>
                    {`Exercise ${index + 1} - ${section.title}`}
                </Text>
            </View>
        );
    };

    const _renderContent = section => {
        const renderQuestionItem = (question, index) => {
            return (
                <View style={{padding: 5}}>
                    <View style={{backgroundColor: theme.primary, padding: 5, flexDirection: 'row'}}>
                        <Text style={{color: theme.background, fontWeight: 'bold', fontSize: 12}}>
                            {`${index + 1}. ${question.content}`}
                        </Text>
                    </View>
                    <View style={{padding: 10}}>
                        {question.exercises_answers && question.exercises_answers.map((answer, index) => {
                            return (
                                <TouchableOpacity key={answer.id}>
                                    <Text style={{paddingBottom: 5}}>
                                        {`${String.fromCharCode(index + 65)}. ${answer.content}`}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            )
        }
        return (
            <View
                key={section.id}
                style={{paddingTop: 5}}>
                {section.exercises_questions.map((question, index) => {
                    return renderQuestionItem(question, index)
                })}
            </View>
        );
    };

    const _updateSections = activeSections => {
        setActiveSections(activeSections);
    };

    if (!authenticationContext.state.isAuthenticated) {
        return (
            <NoDataView message={i18n.t(strings.unauthentication_instruction)}/>
        )
    } else if (!isAccessible) {
        return (
            <NoDataView message={i18n.t(strings.no_data_view_no_enroll)}/>
        )
    } else if (isLoading) {
        return (
            <View style={{marginTop: 20}}>
                <ActivityIndicator size='small'
                                   color={theme.emphasis}/>
            </View>
        )
    } else {
        return (
            <ScrollView style={styles(theme).container}>
                {exerciseSections.length > 0 &&
                <Accordion
                    sections={exerciseSections}
                    activeSections={activeSections}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    expandMultiple
                />}
                {exerciseSections.length === 0 && <NoDataView message={i18n.t(strings.no_data_view_no_exercise)}/>}
            </ScrollView>
        )
    }
};

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
        paddingLeft: 5,
        paddingRight: 5
    },
});

export default CourseDetailExercise;
