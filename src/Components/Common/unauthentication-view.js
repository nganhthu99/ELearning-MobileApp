import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {Button} from "react-native-elements";
import {ScreenName} from "../../Globals/constants";

const UnauthenticationView = (props) => {
    const {theme} = useContext(ThemeContext)

    const handleGoBackButton = () => {
        props.navigation.navigate(ScreenName.StartMenu)
    }

    return (
        <View style={styles(theme).container}>
            <Text style={[styles(theme).text, {fontWeight:'bold', fontSize: 16, textAlign: 'center'}]}>
                Please Sign In to see more
            </Text>
            <View>
                <Button type='outline'
                        title='Go Back'
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
