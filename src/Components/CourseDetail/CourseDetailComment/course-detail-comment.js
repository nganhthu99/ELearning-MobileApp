import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Image} from "react-native";
import {comments} from "../../../Data/data";
import CommentListItem from "./comment-list-item";
import {Icon, Input} from "react-native-elements";

const CourseDetailComment = (props) => {
    const renderItem = ({ item }) => {
        return (
            <View style={{height: 100, padding: 5}}>
                <CommentListItem item={item}/>
            </View>
        )
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.commentContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri:'https://i.pinimg.com/originals/8a/f7/ed/8af7ed2daec49e34d1dbfeb52ba7a582.jpg'}}/>
                </View>
                <View style={styles.inputContainer}>
                    <Input placeholder='Comment'/>
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

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F2F2F2',
    },
    commentContainer: {
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#021F59'
    },
    imageContainer: {
        width: 100,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#021F59'
    },
    inputContainer: {
        flex: 2,
        alignSelf: 'flex-end'
    }
});

export default CourseDetailComment;
