import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button, Icon, Input} from "react-native-elements";

const ForgetPassword = (props) => {

    const handleSendEmailButton = () => {
        props.navigation.navigate('SignIn')
    }

    return(
        <View style={styles.container}>
            <Text style={[styles.text, {fontWeight:'bold', fontSize: 16}]}>Enter your registered email to reset password</Text>
            <Input placeholder='Registered Email'
                   leftIcon={
                       <Icon type='ionicons'
                             name='mail-outline'
                             color='#021F59'/>
                   }
            />
            <Button type='outline'
                    title='Send Email Verification'
                    containerStyle={{paddingLeft: 40, paddingRight: 40}}
                    onPress={handleSendEmailButton}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center'
    },
    text: {
        color: '#011534',
        padding: 10,
        paddingLeft: 15
    }
});

export default ForgetPassword;
