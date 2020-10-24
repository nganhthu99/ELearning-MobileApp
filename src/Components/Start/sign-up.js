import React from 'react';
import {Button, Input, SocialIcon} from "react-native-elements";
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";

const SignUp = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.textLogo} source={require('../../../assets/text-logo.png')}/>
            <View style={styles.inputContainer}>
                <Input placeholder='Username'
                       leftIconContainerStyle={{marginRight: 7}}
                       leftIcon={{ type: 'font-awesome-5', name: 'user'}}/>
                <Input placeholder='Email'
                       leftIconContainerStyle={{marginRight: 5}}
                       leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}/>
                <Input placeholder='Password'
                       secureTextEntry={true}
                       leftIconContainerStyle={{marginRight: 6}}
                       leftIcon={{ type: 'font-awesome', name: 'key'}}/>
                <Button type='outline'
                        title='Sign Up'
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
                    title="Sign Up With Google"/>
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

export default SignUp;
