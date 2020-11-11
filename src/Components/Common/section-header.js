import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button, Icon} from "react-native-elements";

const SectionHeader = (props) => {
    const handleOnClick = () => {
        props.handleOnClick()
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
            <Button
                onPress={handleOnClick}
                titleStyle={{fontSize: 12, paddingRight: 3}}
                type="clear"
                icon={props.type==='delete' ?
                    <Icon type='octicon'
                          name='trashcan'
                          color='#021F59'
                          size={20}/> :
                    <Icon type='font-awesome'
                          name='angle-double-right'
                          color='#021F59'
                          size={20}/>
                }
                iconRight
                title={props.type==='delete' ? 'Delete All' : "See all"}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        // borderWidth: 2,
        // borderColor: '#000000'
    },
    text: {
        color: '#155FBF',
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default SectionHeader;
