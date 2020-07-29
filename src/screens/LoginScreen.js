import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import globalStyles from './globalStyles';

export default function LoginScreen({navigation}){
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    // save username and login
    saveSession = () => {
        console.log(username, password)
        navigation.navigate('Timetable')
    }

    return(
        <View style={globalStyles.container}>
            <Text style={styles.loginText}>Login</Text>
            <FormInput
                labelName = 'Username'
                value = {username}
                onChangeText = {(text) => setUsername(text)}
            />

            <FormInput
                labelName = 'Password'
                value = {password}
                onChangeText = {(text) => setPassword(text)}
            />
            
            <FormButton
                title = 'Login'
                onPress = {this.saveSession}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loginText:{
        fontSize:20
    },
});