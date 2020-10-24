import React from 'react';
import {Button, Input, SocialIcon} from "react-native-elements";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";

const LogIn = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.textLogo} source={require('../../../assets/text-logo.png')}/>
            <View style={styles.inputContainer}>
                <Input placeholder='Username or Email'
                       leftIcon={{ type: 'font-awesome-5', name: 'user'}}/>
                <Input placeholder='Password'
                       secureTextEntry={true}
                       leftIcon={{ type: 'font-awesome', name: 'key'}}/>
                <TouchableOpacity style={{alignSelf: 'flex-end', paddingRight: 10, marginBottom: 20}}>
                    <Text style={{color:'#2384D9',  textDecorationLine:'underline'}}>Forget password?</Text>
                </TouchableOpacity>
                <Button type='outline'
                        title='Log In'
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        buttonStyle={{marginBottom: 10}}/>
                <Text style={{alignSelf: 'center'}}>OR</Text>
                <Button
                    type="outline"
                    titleStyle={{color: '#A62103'}}
                    buttonStyle={{marginTop: 10}}
                    containerStyle={{paddingLeft: 40, paddingRight: 40}}
                    icon={{ type: 'font-awesome', name: 'google', color: '#590202'}}
                    iconLeft
                    title="Log In With Google"/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'stretch',
        backgroundColor: '#F2F2F2',
    },
    textLogo: {
        flex: 2.5,
        width: 320,
        alignSelf: 'center',
        resizeMode: 'contain',

        //borderWidth: 5,
        //borderColor: '#AAAAAA',
    },
    inputContainer: {
        flex: 5,
        alignItems: 'stretch',

        paddingLeft: 20,
        paddingRight: 20,

        //borderWidth: 10,
        //borderColor: '#AAAAAA',
    }
});

export default LogIn;
