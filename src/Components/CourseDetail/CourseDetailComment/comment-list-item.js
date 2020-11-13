import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

const CommentListItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 45}}>
                    <Image style={{flex: 1, resizeMode: 'contain', borderRadius: 25, borderWidth: 1, borderColor: '#021F59'}} source={{uri:'https://i.pinimg.com/originals/8a/f7/ed/8af7ed2daec49e34d1dbfeb52ba7a582.jpg'}}/>
                </View>
                <View style={{paddingLeft: 10}}>
                    <Text style={{fontSize: 11}}>{props.item.user}</Text>
                    <Text style={{fontSize: 11}}>{props.item.time}</Text>
                </View>
            </View>
            <View style={{flex: 1, paddingLeft: 55}}>
                <Text>{props.item.content}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F2F2F2',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5, borderBottomColor: '#021F59'
    },
});

export default CommentListItem;
