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
    saveSession = async () => {
        console.log(username, password)

        // check for empty values
        if(!username){
            alert('Please fill username');
            return;
        }
        if(!password){
            alert('Please enter your password');
            return;
        }

        // store username
        try{
            await AsyncStorage.setItem('username', username)
        }catch(e){
            console.log('error saving username', e)
        }

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