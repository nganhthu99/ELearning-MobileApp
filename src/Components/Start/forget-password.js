import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import {ScreenName} from "../../Globals/constants";
import {renderEmailValidation, validateEmailUtil} from "./render-validation";
import {ThemeContext} from "../../Provider/theme-provider";
import {LanguageContext, LanguageProvider} from "../../Provider/language-provider";

const ForgetPassword = (props) => {
    // State
    const [email, setEmail] = useState("")
    const {theme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    // Control
    const handleEmailInput = (text) => {
        setEmail(text)
    }

    const handleSendEmailButton = () => {
        if (validateEmailUtil(email)) {
            // Service
            props.navigation.navigate(ScreenName.SignIn)
        }
    }

    return(
        <View style={styles(theme).container}>
            <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 16}]}>{language.forgetPwInstruction}</Text>
            <Input placeholder={language.forgetPwEmailInput}
                   inputStyle={{color: theme.normalText}}
                   leftIcon={
                       <Icon type='ionicons'
                             name='mail-outline'
                             color={theme.primaryEmphasis}/>
                   }
                   onChangeText={(text) => handleEmailInput(text)}
            />
            {renderEmailValidation(email)}
            <Button type='outline'
                    buttonStyle={{borderColor: theme.primaryButton}}
                    titleStyle={{color: theme.primaryButton}}
                    title={language.forgetPwEmailButton}
                    containerStyle={{paddingLeft: 40, paddingRight: 40}}
                    onPress={handleSendEmailButton}/>
        </View>
    )
};

const styles = (theme) => (
    StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: theme.background,
            paddingTop: 50
        },
        text: {
            color: theme.normalText,
            padding: 10,
            paddingLeft: 15
        }
    })
)

export default ForgetPassword;
