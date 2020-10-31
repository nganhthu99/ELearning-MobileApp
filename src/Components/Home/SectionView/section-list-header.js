import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";

const SectionListHeader = (props) => {
    return(
        <View style={styles.container}>
            <Text style={{color: '#155FBF', fontSize: 20}}>{props.title}</Text>
            <Button
                titleStyle={{fontSize: 12}}
                type="clear"
                icon={{ type: 'font-awesome', name: 'angle-double-right', color: '#021F59'}}
                iconRight
                title="See all"/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: '#F2F2F2',

        paddingLeft: 5,
    },
});

export default SectionListHeader;
