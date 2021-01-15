import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../../../Core/Provider/theme-provider";
import ViewMoreText from 'react-native-view-more-text';
import StarRating from "react-native-star-rating";

const CommentListItem = (props) => {
    const {theme} = useContext(ThemeContext)

    return (
        <View style={styles(theme).container}>
            <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 40, height: 40}}>
                    <Image style={{flex: 1, resizeMode: 'cover', width: '100%', height: '100%', borderRadius: 5, borderWidth: 1, borderColor: theme.emphasis, aspectRatio: 1}}
                           source={{uri:props.item.user.avatar}}/>
                </View>
                <View style={{paddingLeft: 10}}>
                    <Text style={{fontSize: 10, color: theme.text}}>{props.item.user.name}</Text>
                    <Text style={{fontSize: 10, color: theme.text}}>{props.item["updatedAt"].substring(0, 10)}</Text>
                </View>
            </View>
            <View style={{flex: 2, paddingLeft: 50, paddingTop: 5}}>
                <StarRating
                    disabled
                    iconSet={'Ionicons'}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    maxStars={5}
                    rating={props.item["averagePoint"]}
                    starSize={18}
                    fullStarColor={theme.bright}
                    buttonStyle={{margin: 0.5}}
                    containerStyle={{justifyContent:'flex-start'}}/>
                <ViewMoreText
                    numberOfLines={3}
                    renderViewMore={(onPress) => (
                        <Text onPress={onPress}
                              style={{color:theme.primary, fontSize: 10}}>
                            View more
                        </Text>
                    )}
                    renderViewLess={(onPress) => (
                        <Text onPress={onPress}
                              style={{color:theme.primary, fontSize: 10}}>
                            View less
                        </Text>
                    )}
                    textStyle={{color: theme.text, fontSize: 13}}>
                    <Text>
                        {props.item.content}
                    </Text>
                </ViewMoreText>
            </View>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: theme.background,
        paddingTop: 5,
        paddingBottom: 5
    },
});

export default CommentListItem;
