import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {Button} from "react-native-elements";
import i18n from 'i18n-js';
import {strings} from "../../Globals/Localization/string";

const UnauthenticationView = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleGoBackButton = () => {
        props.navigation.popToTop()
    }

    return (
        <View style={styles(theme).container}>
            <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 16, textAlign: 'center'}]}>
                {i18n.t(strings.unauthentication_instruction)}
            </Text>
            <View>
                <Button type='outline'
                        title={i18n.t(strings.go_back)}
                        containerStyle={{paddingLeft: 40, paddingRight: 40}}
                        buttonStyle={{borderColor: theme.primary, marginBottom: 10}}
                        titleStyle={{color: theme.primary}}
                        onPress={handleGoBackButton}/>
            </View>
        </View>
    )
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: 'center'
    },
    text: {
        color: theme.normalText,
        padding: 10,
        paddingLeft: 15
    },
})

export default UnauthenticationView;
