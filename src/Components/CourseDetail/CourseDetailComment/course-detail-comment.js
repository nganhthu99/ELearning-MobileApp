import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList, Image, Text, TouchableOpacity, Alert} from "react-native";
import {comments} from "../../../Data/data";
import CommentListItem from "./comment-list-item";
import {Icon, Input} from "react-native-elements";
import {ThemeContext} from "../../../Provider/theme-provider";
import {LanguageContext} from "../../../Provider/language-provider";
import StarRating from "react-native-star-rating";
import {AuthenticationContext} from "../../../Provider/authentication-provider";

const CourseDetailComment = (props) => {
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)
    const {authentication} = useContext(AuthenticationContext)
    const [starRating, setStarRating] = useState(1)
    const [comment, setComment] = useState(comments)
    const [inputComment, setInputComment] = useState("")

    const handleOnStarRatingPress = (rating) => {
        if (authentication) {
            setStarRating(rating)
        } else {
            Alert.alert(
                'Authentication Error',
                'Please Sign In or Sign Up to use this feature',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    }
                ]
            );
        }
    }

    const handleCommentOnChangeText = (text) => {
        setInputComment(text)
    }

    const handleCommentOnSubmit = () => {
        console.log('heelo')
        if (inputComment.length > 0) {
            if (authentication) {
                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const dateTime = date + ' ' + time;

                const newComment = comment.slice()
                setComment(newComment.concat({
                    id: 11,
                    time: dateTime,
                    username: authentication.username,
                    content: inputComment
                }))
            } else {
                Alert.alert(
                    'Authentication Error',
                    'Please Sign In or Sign Up to use this feature',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                        }
                    ]
                );
            }
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{padding: 5}}>
                <CommentListItem item={item}/>
            </View>
        )
    };
    return (
        <ScrollView style={styles(theme).container}>
            <View style={{flexDirection: 'row', padding: 5, paddingTop: 20, paddingBottom: 10}}>
                <Text style={{color: theme.primaryEmphasis, fontWeight: 'bold', fontSize: 22, paddingRight: 40}}>
                    {language.ratingCourse}
                </Text>
                <StarRating
                    iconSet={'Ionicons'}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    maxStars={5}
                    rating={starRating}
                    starSize={28}
                    fullStarColor={theme.star}
                    containerStyle={{justifyContent:'flex-start', alignItems: 'center'}}
                    selectedStar={(rating) => handleOnStarRatingPress(rating)}
                />
            </View>
            <View style={styles(theme).commentContainer}>
                <Input
                    multiline
                    placeholder="Enter you comment"
                    leftIcon={{ type: 'font-awesome', name: 'comment-o', color: theme.primaryEmphasis}}
                    style={styles}
                    label='Comment'
                    labelStyle={{color: theme.primaryEmphasis, paddingBottom: 10}}
                    inputStyle={{fontSize: 14, alignSelf: 'flex-end', color: theme.normalText, maxHeight: 200}}
                    containerStyle={{justifyContent:'center'}}
                    onChangeText={(text) => handleCommentOnChangeText(text)}
                    rightIcon={
                        <TouchableOpacity onPress={handleCommentOnSubmit}>
                            <Icon
                                type='font-awesome'
                                color={theme.primaryEmphasis}
                                name='paper-plane'
                                size={20}
                            />
                        </TouchableOpacity>
                    }
                />
            </View>
            <FlatList
                data={comment}
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
        borderWidth: 1, borderColor: '#000000', borderRadius: 10,
        margin: 5,
        padding: 5,
        paddingTop: 20
    },
});

export default CourseDetailComment;
