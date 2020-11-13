import React from 'react';
import {Button, Input} from "react-native-elements";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { Icon } from 'react-native-elements'

const SignIn = (props) => {

    const handleSignInButton = () => {
        props.navigation.navigate('Main')
    }

    const handleGoogleButton = () => {

    }

    const handleForgetPassword = () => {
        props.navigation.navigate('ForgetPassword')
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
                <Input placeholder='Password'
                       secureTextEntry={true}
                       leftIcon={
                           <Icon type='ionicons'
                                 name='lock-outline'
                                 color='#021F59'/>
                       }
                />
                <TouchableOpacity
                    style={{alignSelf: 'flex-end', paddingRight: 10, marginBottom: 20}}
                    onPress={handleForgetPassword}>
                    <Text style={{color:'#2384D9',  textDecorationLine:'underline'}}>Forget password?</Text>
                </TouchableOpacity>
                <Button type='outline'
                        title='Sign In'
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        buttonStyle={{marginBottom: 10}}
                        onPress={handleSignInButton}/>
                <Text style={{alignSelf: 'center', marginBottom: 10}}>OR</Text>
                <Button
                    type="outline"
                    buttonStyle={{borderColor: '#A62103'}}
                    containerStyle={{paddingLeft: 40, paddingRight: 40}}
                    titleStyle={{color: '#A62103'}}
                    icon={{ type: 'font-awesome-5', name: 'google', color: '#590202'}}
                    iconLeft
                    title="Sign In With Google"
                    onPress={handleGoogleButton}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F2F2F2',
    },
    textLogo: {
        flex: 2.5,
        width: 320,
        alignSelf: 'center',
        resizeMode: 'contain',

        // borderWidth: 2,
        // borderColor: '#000000',
    },
    inputContainer: {
        flex: 5,

        // borderWidth: 2,
        // borderColor: '#000000',
    }
});

export default SignIn;
