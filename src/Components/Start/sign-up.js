import React from 'react';
import {Button, Input} from "react-native-elements";
import {Image, StyleSheet, View} from "react-native";
import { Icon } from 'react-native-elements'

const SignUp = (props) => {
    const handleSignUpButton = () => {
        props.navigation.navigate('SignIn')
    }

    return (
        <View style={styles.container}>
            <Image style={styles.textLogo} source={require('../../../assets/text-logo.png')}/>
            <View style={styles.inputContainer}>
                <Input placeholder='Username'
                       leftIcon={
                           <Icon type='ionicons'
                                 name='person-outline'
                                 color='#021F59'/>
                       }
                />
                <Input placeholder='Email'
                       leftIcon={
                           <Icon type='ionicons'
                                 name='mail-outline'
                                 color='#021F59'/>
                       }
                />
                <Input placeholder='Password'
                       secureTextEntry={true}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock-outline'
                                 color='#021F59'/>
                       }
                />
                <Input placeholder='Confirm Password'
                       secureTextEntry={true}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock'
                                 color='#021F59'/>
                       }                />
                <Button type='outline'
                        title='Sign Up'
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        onPress={handleSignUpButton}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#F2F2F2",
    },
    textLogo: {
        flex: 2.5,
        width: 320,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    inputContainer: {
        flex: 5,
    },
});

export default SignUp
