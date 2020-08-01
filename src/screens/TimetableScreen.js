import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import globalStyles from './globalStyles';
import FormButton from '../components/FormButton';

var db = openDatabase({name: 'MyBill.db'})

export default function TimetableScreen({navigation}){

    useEffect(()=>{
        db.transaction(function (txn){
            txn.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='table_user' ",
            [],
            function(tx, res){
                console.log('item', res.rows.length);
                if (res.rows.length == 0){
                    txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                    txn.executeSql('CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id VARCHAR, company VARCHAR(30), rate INTEGER ,date VARCHAR, start_time VARCHAR(10), end_time VARCHAR(20) )',
                    []);
                };
            } );
        });
    }, []);
    return(
        <View style = {globalStyles.container}>
            <Text>Choose one option for your timetable:</Text>
            <FormButton
                title = 'Create'
                onPress = {() => navigation.navigate('CreateTimecard')}
            />

            <FormButton
                title = 'View'
                onPress = {() => navigation.navigate('ViewTimecard')}
            />
        </View>
    );
}