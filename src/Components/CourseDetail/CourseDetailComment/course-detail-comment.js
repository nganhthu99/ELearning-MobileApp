import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, FlatList, Image} from "react-native";
import {comments} from "../../../Data/data";
import CommentListItem from "./comment-list-item";
import {Input} from "react-native-elements";
import {ThemeContext} from "../../../Provider/theme-provider";
import {LanguageContext} from "../../../Provider/language-provider";

const CourseDetailComment = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    const renderItem = ({ item }) => {
        return (
            <View style={{height: 100, padding: 5}}>
                <CommentListItem item={item}/>
            </View>
        )
    };
    return (
        <ScrollView style={styles(theme).container}>
            <View style={styles(theme).commentContainer}>
                <View style={styles(theme).imageContainer}>
                    <Image style={styles(theme).image} source={{uri:'https://i.pinimg.com/originals/8a/f7/ed/8af7ed2daec49e34d1dbfeb52ba7a582.jpg'}}/>
                </View>
                <View style={styles(theme).inputContainer}>
                    <Input
                        placeholder={language.commentInput}
                        inputStyle={{color: theme.normalText}}/>
                </View>
            </View>
            <FlatList
                data={comments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: theme.background,
    },
    commentContainer: {
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    imageContainer: {
        width: 100,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: theme.primaryEmphasis
    },
    inputContainer: {
        flex: 2,
        alignSelf: 'flex-end'
    }
});

export default CourseDetailComment;
