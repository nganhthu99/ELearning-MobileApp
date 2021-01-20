import React, {useContext} from 'react';
import {ThemeContext} from "../../Core/Provider/theme-provider";
import {Text, View} from "react-native";
import {Icon} from "react-native-elements";

const NoDataView = (props) => {
    const {theme} = useContext(ThemeContext)
    return (
        <View style={{
            height: 150,
            borderColor: theme.text,
            borderWidth: 2,
            borderRadius: 10,
            margin: 5,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: theme.background
        }}>
            <Icon type='octicon'
                  name='info'
                  size={50}
                  color={theme.text}/>
            <Text style={{fontSize: 15, color: theme.text, textAlign: 'center'}}>
                {props.message}
            </Text>
        </View>
    )
};

export default NoDataView;
