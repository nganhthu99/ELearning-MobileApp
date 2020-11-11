import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button, Icon} from "react-native-elements";

const SectionFooter = (props) => {

    const handleOnClick = () => {
        props.handleOnClick()
    }

    return(
        <View style={styles.container}>
            <Button
                onPress={handleOnClick}
                titleStyle={{fontSize: 12, paddingRight: 3}}
                type="clear"
                icon={
                    <Icon type='font-awesome'
                          name='angle-double-right'
                          color='#021F59'
                          size={20}/>
                }
                iconRight
                title="See all"/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end'
    }
});

export default SectionFooter;
