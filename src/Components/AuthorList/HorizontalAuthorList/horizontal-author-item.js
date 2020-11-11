import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const HorizontalAuthorItem = (props) => {

    const handleOnClick = () => {
        props.navigation.navigate('AuthorDetail', {
            item: props.item
        })
    }

    return(
        <TouchableOpacity style={styles.container} onPress={handleOnClick}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../../assets/course.jpg')}
                       style={styles.image}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text} numberOfLines={1}>{props.item.name}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    imageContainer: {
        height: 120,
        width: 120,
    },
    image:{
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#021F59',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#011534',
        fontWeight:'bold',
        fontSize: 16
    }
})


export default HorizontalAuthorItem;
