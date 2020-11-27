import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../../../Provider/theme-provider";
import ViewMoreText from 'react-native-view-more-text';

const CommentListItem = (props) => {
    const {theme} = useContext(ThemeContext)

    return (
        <View style={styles(theme).container}>
            <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{width: 40, height: 40}}>
                    <Image style={{flex: 1, resizeMode: 'cover', borderWidth: 1, borderColor: theme.primaryEmphasis}} source={{uri:'https://i.pinimg.com/originals/8a/f7/ed/8af7ed2daec49e34d1dbfeb52ba7a582.jpg'}}/>
                </View>
                <View style={{paddingLeft: 10}}>
                    <Text style={{fontSize: 11, color: theme.normalText}}>{props.item.username}</Text>
                    <Text style={{fontSize: 11, color: theme.normalText}}>{props.item.time}</Text>
                </View>
            </View>
            <View style={{flex: 2, paddingLeft: 50}}>
                <ViewMoreText
                    numberOfLines={3}
                    renderViewMore={(onPress) => (
                        <Text onPress={onPress}
                              style={{color:theme.primaryButton, fontSize: 12}}>
                            View more
                        </Text>
                    )}
                    renderViewLess={(onPress) => (
                        <Text onPress={onPress}
                              style={{color:theme.primaryButton, fontSize: 12}}>
                            View less
                        </Text>
                    )}
                    textStyle={{color: theme.normalText, fontSize: 14}}
                >
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
        borderBottomWidth: 1, borderBottomColor: theme.primaryEmphasis,
        paddingBottom: 20,
        paddingTop: 5
    },
});

export default CommentListItem;
