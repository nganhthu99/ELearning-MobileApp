import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../../../Provider/theme-provider";

const CommentListItem = (props) => {
    const {theme} = useContext(ThemeContext)

    return (
        <View style={styles(theme).container}>
            <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 45}}>
                    <Image style={{flex: 1, resizeMode: 'contain', borderRadius: 25, borderWidth: 1, borderColor: theme.primaryEmphasis}} source={{uri:'https://i.pinimg.com/originals/8a/f7/ed/8af7ed2daec49e34d1dbfeb52ba7a582.jpg'}}/>
                </View>
                <View style={{paddingLeft: 10}}>
                    <Text style={{fontSize: 11, color: theme.normalText}}>{props.item.user}</Text>
                    <Text style={{fontSize: 11, color: theme.normalText}}>{props.item.time}</Text>
                </View>
            </View>
            <View style={{flex: 1, paddingLeft: 55}}>
                <Text style={{color: theme.normalText}}>{props.item.content}</Text>
            </View>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: theme.background,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5, borderBottomColor: theme.primaryEmphasis
    },
});

export default CommentListItem;
