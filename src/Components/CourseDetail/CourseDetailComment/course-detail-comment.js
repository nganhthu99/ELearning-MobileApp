import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList, Text, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import {comments} from "../../../Data/data";
import CommentListItem from "./comment-list-item";
import {Button, Icon, Input, Overlay} from "react-native-elements";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import StarRating from "react-native-star-rating";
import {AuthenticationContext} from "../../../Core/Provider/authentication-provider";
import {getCourseDetail, getUserRatingCourse, updateUserRatingCourse} from "../../../Core/Service/course-service";
import {ScreenName} from "../../../Globals/constants";

const CourseDetailComment = (props) => {
    const {theme} = useContext(ThemeContext)
    const authenticationContext = useContext(AuthenticationContext)
    const [isLoading, setIsLoading] = useState(true)
    const [starRating, setStarRating] = useState({
        formalityPoint: 0,
        contentPoint: 0,
        presentationPoint: 0
    })
    const [isCommentOverlayVisible, setIsCommentOverlayVisible] = useState(false)
    const [inputComment, setInputComment] = useState("")
    const [listRating, setListRating] = useState(props.route.params.detail.ratings.ratingList)

    useEffect(() => {
        getUserRatingCourse(authenticationContext.state.token, props.route.params.detail.id)
            .then((response) => {
                if (response.status === 200 && response.data.payload) {
                    setStarRating({
                        formalityPoint: response.data.payload.formalityPoint,
                        contentPoint: response.data.payload.contentPoint,
                        presentationPoint: response.data.payload.presentationPoint
                    })
                    setInputComment(response.data.payload.content)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const handleOnFormalityStarPress = (point) => {
        setStarRating(rating => ({
            formalityPoint: point,
            contentPoint: rating.contentPoint,
            presentationPoint: rating.presentationPoint
        }))
    }

    const handleOnContentStarPress = (point) => {
        setStarRating(rating => ({
            formalityPoint: rating.formalityPoint,
            contentPoint: point,
            presentationPoint: rating.presentationPoint
        }))
    }

    const handleOnPresentationStarPress = (point) => {
        setStarRating(rating => ({
            formalityPoint: rating.formalityPoint,
            contentPoint: rating.contentPoint,
            presentationPoint: point
        }))
    }

    const toggleOverlay = () => {
        setIsCommentOverlayVisible(!isCommentOverlayVisible);
    }

    const handleCommentOnChangeText = (text) => {
        setInputComment(text)
    }

    const handleSubmitButton = () => {
        if (inputComment.length > 0) {
            setIsLoading(true)
            updateUserRatingCourse(authenticationContext.state.token, props.route.params.detail.id, starRating.formalityPoint, starRating.contentPoint, starRating.presentationPoint, inputComment)
                .then((response) => {
                    if (response.status === 200) {
                        getCourseDetail(props.route.params.detail.id)
                            .then((response) => {
                                if(response.status === 200) {
                                    setListRating(response.data.payload.ratings.ratingList)
                                }
                            })
                            .finally(() => {
                                setIsLoading(false)
                            })
                    }
                })
                .catch((error) => {
                    console.log('ERRORRRRR', error)
                    Alert.alert(
                        'Error',
                        'Please try again later.',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                }
                            }
                        ]
                    )
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    /*const handleCommentOnSubmit = () => {
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
    }*/

    const commentInputModal = () => {
        return (
            <Overlay
                overlayStyle={{height: 300, width: '100%', justifyContent: 'center'}}
                isVisible={isCommentOverlayVisible}
                onBackdropPress={toggleOverlay}>
                <View>
                    <View style={{paddingLeft: 10, paddingBottom: 20}}>
                        <Text style={{color: theme.emphasis,fontWeight:'bold', fontSize: 18}}>Add Comment</Text>
                    </View>
                    <Input multiline
                           placeholder='Enter your comment'
                           inputStyle={{color: theme.text, maxHeight: 120}}
                           onChangeText={(text) => handleCommentOnChangeText(text)}/>
                    <Button type='outline'
                            title='Update'
                            containerStyle={{paddingLeft: 40, paddingRight: 40, paddingTop: 10}}
                            onPress={toggleOverlay}/>
                </View>
            </Overlay>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{padding: 5}}>
                <CommentListItem item={item}/>
            </View>
        )
    };

    if (isLoading) {
        return (
            <View style={{marginTop: 20}}>
                <ActivityIndicator size='small'
                                   color={theme.emphasis}/>
            </View>
        )
    } else {
        return (
            <ScrollView style={styles(theme).container}>
                <View style={{margin: 5, paddingBottom: 30}}>
                    {/*Rating formality*/}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5,
                        paddingTop: 20,
                        paddingBottom: 0}}>
                        <Text style={{color: theme.emphasis, fontWeight: 'bold', fontSize: 16, paddingRight: 40}}>
                            Rate formality
                        </Text>
                        <StarRating
                            iconSet={'Ionicons'}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            maxStars={5}
                            rating={starRating.formalityPoint}
                            starSize={28}
                            fullStarColor={theme.bright}
                            containerStyle={{justifyContent: 'flex-start', alignItems: 'center'}}
                            selectedStar={(rating) => handleOnFormalityStarPress(rating)}/>
                    </View>

                    {/*Rating content*/}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5,
                        paddingTop: 10,
                        paddingBottom: 0
                    }}>
                        <Text style={{color: theme.emphasis, fontWeight: 'bold', fontSize: 16, paddingRight: 40}}>
                            Rate content
                        </Text>
                        <StarRating
                            iconSet={'Ionicons'}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            maxStars={5}
                            rating={starRating.contentPoint}
                            starSize={28}
                            fullStarColor={theme.bright}
                            containerStyle={{justifyContent: 'flex-start', alignItems: 'center'}}
                            selectedStar={(rating) => handleOnContentStarPress(rating)}/>
                    </View>

                    {/*Rating presentation*/}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5,
                        paddingTop: 10,
                        paddingBottom: 0
                    }}>
                        <Text style={{color: theme.emphasis, fontWeight: 'bold', fontSize: 16, paddingRight: 40}}>
                            Rate presentation
                        </Text>
                        <StarRating
                            iconSet={'Ionicons'}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            maxStars={5}
                            rating={starRating.presentationPoint}
                            starSize={28}
                            fullStarColor={theme.bright}
                            containerStyle={{justifyContent: 'flex-start', alignItems: 'center'}}
                            selectedStar={(rating) => handleOnPresentationStarPress(rating)}/>
                    </View>

                    {/*Comment section*/}
                    <TouchableOpacity
                        onPress={toggleOverlay}
                        style={{flexDirection: 'row', padding: 5, paddingTop: 10, paddingBottom: 20}}>
                        <Icon
                            type='font-awesome'
                            name='comment-o'
                            color={theme.emphasis}/>
                        <Text style={{color: theme.primary, fontWeight: 'bold', fontSize: 16, marginLeft: 8}}>
                            Comment
                        </Text>
                    </TouchableOpacity>
                    {commentInputModal()}
                    {inputComment.length > 0 &&
                    <Input
                        multiline
                        disabled
                        value={inputComment}
                        disabledInputStyle={{color: theme.text, fontWeight: 'bold'}}
                        inputStyle={{fontSize: 14, color: theme.text, maxHeight: 200}}/>
                    }

                    {/*Button submit*/}
                    <Button
                        type="outline"
                        title='Submit Rating'
                        icon={{
                            type: 'ionicons',
                            name: 'cloud-upload',
                            color: theme.emphasis
                        }}
                        iconLeft
                        onPress={handleSubmitButton}
                        buttonStyle={{borderColor: theme.primary, marginRight: 40, marginLeft: 40}}
                        titleStyle={{color: theme.primary}}/>
                </View>
                <FlatList
                    data={listRating}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => (
                        <View style={{
                            height: 1,
                            width: '100%',
                            backgroundColor: theme.primary,
                        }}/>
                    )}
                    keyExtractor={item => item.id}
                    style={{padding: 5}}/>
            </ScrollView>
        )
    }
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: theme.background,
    },
    commentContainer: {
        borderWidth: 1, borderColor: '#000000', borderRadius: 10,
        margin: 5,
        paddingTop: 20
    },
});

export default CourseDetailComment;
