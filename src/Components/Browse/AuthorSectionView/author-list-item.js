import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";

const AuthorListItem = (props) => {
    return(
        <View style={styles.container}>
            <Image source={{uri: 'https://64.media.tumblr.com/30779ac02fc1f7e9ae34464f3cacdb8f/tumblr_p9uzu5SIT51wti86no1_250.png'}} style={styles.image}/>
            <Text style={{fontWeight:'bold', flex: 2, paddingTop: 10}}>{props.item.name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 250,
        alignItems: 'center',
        //backgroundColor: '#A9CCE3',

        margin: 5,

        //borderWidth: 2,
        //borderColor: '#A9CCE3',
    },
    image:{
        flex: 8,
        width: 180,
        height: 180,
        resizeMode: 'contain',

        margin: 10,

        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#A9CCE3'
    }
})

export default AuthorListItem;
