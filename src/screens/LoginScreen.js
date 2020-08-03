import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import globalStyles from './globalStyles';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'MyBill.db'});

export default function LoginScreen({navigation}){
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    useEffect(()=>{
        // create database
        db.transaction(function (txn){
            txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='table_user' ",
            [],
            function(tx, res){
                console.log('item', res.rows.length);
                if (res.rows.length == 0){
                    txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                    txn.executeSql('CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id VARCHAR, company VARCHAR(30), rate INTEGER ,date VARCHAR, start_time VARCHAR(10), end_time VARCHAR(20), hours_worked INTEGER )',
                    []);
                };
            } );
        });
    }, []);

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