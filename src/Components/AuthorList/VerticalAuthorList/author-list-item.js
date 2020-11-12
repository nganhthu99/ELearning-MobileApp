import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const AuthorListItem = (props) => {

    const handleOnClick = () => {
        props.navigation.navigate('AuthorDetail', {
            item: props.item
        })
    }

    return(
        <TouchableOpacity style={styles.container} onPress={handleOnClick}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../../assets/course.jpg')} style={styles.image}/>
            </View>
            <View style={styles.infoContainer}>
                <Text style={[styles.text, {fontWeight:'bold', fontSize: 16}]}>{props.item.name}</Text>
                <Text style={styles.text}>{`${props.item.courses} courses`}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#A9CCE3',
        padding: 12,
        paddingLeft: 0,
    },
    imageContainer:{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 12,
    },
    infoContainer: {
        flex: 8,
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        borderRadius: 50
    },
    text: {
        color: '#011534'
    }
})
export default AuthorListItem;
