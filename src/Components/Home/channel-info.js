import React from 'react';
import {StyleSheet, View, Text} from "react-native";

const ChannelInfo = (props) => {
    return(
        <View style={styles.container}>
            <Text style={{fontWeight:'bold'}}>{props.item.name}</Text>
            <Text>{`${props.item.amount} courses`}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AED3F2',
        padding: 10
    },
});

export default ChannelInfo;
