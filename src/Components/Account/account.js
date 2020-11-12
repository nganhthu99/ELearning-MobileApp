import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {Button, ButtonGroup, Icon, Input, Overlay} from "react-native-elements";

const Account = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [userOverLayVisible, setUserOverLayVisible] = useState(false);
    const [emailOverLayVisible, setEmailOverLayVisible] = useState(false);
    const [passwordOverLayVisible, setPasswordOverLayVisible] = useState(false);

    const toggleUserOverlay = () => {
        setUserOverLayVisible(!userOverLayVisible);
    };

    const toggleEmailOverlay = () => {
        setEmailOverLayVisible(!emailOverLayVisible);
    };

    const togglePasswordOverlay = () => {
        setPasswordOverLayVisible(!passwordOverLayVisible);
    };

    const handleSignOutButton = () => {
        props.navigation.navigate('StartMenu')
    }

    const userOverlay = () => {
        return (
            <Overlay
                overlayStyle={{height: 250, width: '100%', justifyContent: 'center'}}
                isVisible={userOverLayVisible}
                onBackdropPress={toggleUserOverlay}>
                <View>
                    <View style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 10}}>
                        <Text style={{color: '#011534',fontWeight:'bold', fontSize: 16}}>Change Username</Text>
                    </View>
                    <Input placeholder='New Username'
                           leftIcon={
                               <Icon type='ionicons'
                                     name='person'
                                     color='#021F59'/>
                           }
                    />
                    <Button type='outline'
                            title='Update'
                            containerStyle={{paddingLeft: 40, paddingRight: 40}}
                            onPress={toggleUserOverlay}/>
                </View>
            </Overlay>
        )
    }

    const emailOverlay = () => {
        return (
            <Overlay
                overlayStyle={{height: 250, width: '100%', justifyContent: 'center'}}
                isVisible={emailOverLayVisible}
                onBackdropPress={toggleEmailOverlay}>
                <View>
                    <View style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 10}}>
                        <Text style={{color: '#011534',fontWeight:'bold', fontSize: 16}}>Change Email</Text>
                    </View>
                    <Input placeholder='New Email'
                           leftIcon={
                               <Icon type='ionicons'
                                     name='mail'
                                     color='#021F59'/>
                           }
                    />
                    <Button type='outline'
                            title='Update'
                            containerStyle={{paddingLeft: 40, paddingRight: 40}}
                            onPress={toggleEmailOverlay}/>
                </View>
            </Overlay>
        )
    }

    const passwordOverlay = () => {
        return (
            <Overlay
                overlayStyle={{height: 300, width: '100%', justifyContent: 'center'}}
                isVisible={passwordOverLayVisible}
                onBackdropPress={togglePasswordOverlay}>
                <View>
                    <View style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 10}}>
                        <Text style={{color: '#011534',fontWeight:'bold', fontSize: 16}}>Change Password</Text>
                    </View>
                    <Input placeholder='Current Password'
                           secureTextEntry
                           leftIcon={
                               <Icon type='ionicons'
                                     name='lock-outline'
                                     color='#021F59'/>
                           }
                    />
                    <Input placeholder='New Password'
                           secureTextEntry
                           leftIcon={
                               <Icon type='ionicons'
                                     name='lock'
                                     color='#021F59'/>
                           }
                    />
                    <Button type='outline'
                            title='Update'
                            containerStyle={{paddingLeft: 40, paddingRight: 40}}
                            onPress={togglePasswordOverlay}/>
                </View>
            </Overlay>
        )
    }

    return(
        <ScrollView style={styles.container}>
            {/*image container*/}
            <View style={styles.avatarContainer}>
                <Image style={styles.image} source={{uri:'https://i.pinimg.com/originals/8a/f7/ed/8af7ed2daec49e34d1dbfeb52ba7a582.jpg'}}/>
                <TouchableOpacity>
                    <Icon
                        type='font-awesome'
                        name='pencil-square-o'
                        color='#021F59'
                        containerStyle={{alignSelf: 'flex-end'}}/>
                </TouchableOpacity>
            </View>

            {/*info container*/}
            <View style={styles.infoContainer}>
                <Input
                    disabled
                    disabledInputStyle={{color: '#072861', fontWeight: 'bold'}}
                    value='nganhthu99'
                    leftIcon={
                        <Icon
                            type='ionicons'
                            name='person'
                            color='#021F59'
                        />
                    }
                    rightIcon={
                        <TouchableOpacity onPress={toggleUserOverlay}>
                            <Icon
                                type='font-awesome'
                                color='#021F59'
                                name='pencil-square-o'
                            />
                        </TouchableOpacity>
                    }
                />

                {userOverlay()}

                <Input
                    disabled
                    disabledInputStyle={{color: '#072861', fontWeight: 'bold'}}
                    value='nganhthu99@gmail.com'
                    leftIcon={
                        <Icon
                            type='ionicons'
                            name='mail'
                            color='#021F59'
                        />
                    }
                    rightIcon={
                        <TouchableOpacity onPress={toggleEmailOverlay}>
                            <Icon
                                type='font-awesome'
                                color='#021F59'
                                name='pencil-square-o'
                            />
                        </TouchableOpacity>
                    }
                />

                {emailOverlay()}

                <Button
                    type="clear"
                    icon={
                        <Icon
                            type='ionicons'
                            name='lock'
                            color='#021F59'
                        />
                    }
                    iconLeft
                    titleStyle={{paddingLeft: 6}}
                    title="Change Password"
                    onPress={togglePasswordOverlay}/>

                {passwordOverlay()}
            </View>

            {/*settings container*/}
            <View style={styles.settingsContainer}>
                <View style={{flexDirection: 'row', paddingLeft:8, alignItems: 'center'}}>
                    <Icon
                        type='ionicons'
                        name='settings'
                        color='#021F59'
                    />
                    <Text style={{fontSize: 18, paddingLeft: 6, fontWeight: 'bold', color: '#021F59'}}>Settings</Text>
                </View>
                <View style={{flex:5, padding: 10}}>
                    <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: '#021F59', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontSize: 18}}>Light Mode</Text>
                        <Switch
                            trackColor={{ false: "#093174", true: "#AED3F2" }}
                            thumbColor={isEnabled ? "#05AFF2" : "#0D4FBC"}
                            ios_backgroundColor="#093174"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <View style={{height: 80, borderBottomWidth: 0.5, borderBottomColor: '#021F59', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontSize: 18}}>Language</Text>
                        <ButtonGroup
                            containerStyle={{width: 220}}
                            buttonStyle={{borderWidth: 2, borderColor: '#AED3F2'}}
                            buttons={['Vietnamese', 'English']}
                        />
                    </View>
                </View>
            </View>

            <Button
                onPress={handleSignOutButton}
                type="outline"
                buttonStyle={{borderColor: '#A62103'}}
                containerStyle={{padding: 40}}
                titleStyle={{color: '#A62103'}}
                icon={{ type: 'font-awesome', name: 'sign-out', color: '#590202'}}
                iconLeft
                title="Sign Out"/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
    avatarContainer: {
        height: 374,
        width: 350,
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        //borderRadius: 175,
        borderWidth: 2,
        borderColor: '#021F59',
        aspectRatio: 1
    },
    infoContainer: {
        alignItems: 'flex-start'
    },
    settingsContainer: {
        paddingTop: 50
    }
});


export default Account;
