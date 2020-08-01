import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimePicker from 'react-native-24h-timepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {openDatabase} from 'react-native-sqlite-storage'; 
import globalStyles from './globalStyles';


const {width, height} = Dimensions.get('screen');

var db = openDatabase({name: 'MyBill.db'});

export default function CreateTimecardScreen({navigation}){

    let [date, setDate] = useState('');

    const [userName, setUserName] = useState('');
    
    let [empID, setEmpID] = useState('');
    let [company, setCompany] = useState('');

    let [startHour, setStartHour] = useState('');
    let [startMinute, setStartMinute] = useState('');
    let [endHour, setEndHour] = useState('');
    let [endMinute, setEndMinute] = useState('');
    let [rate, setRate] = useState(0);

    var startTime = `${startHour}:${startMinute}`;
    var endTime = `${endHour}:${endMinute}`;
    console.log('**Start Time: ', startTime)

    onStartCancel = () =>{
        this.TimePicker.close()
    }

    onEndCancel = () =>{
        this.TimePickerEnd.close()
    }

    saveData = () =>{
        // check for null values
        if (!empID || !company || !rate || !date || !startHour || !startMinute || !endHour || !endMinute){
            alert('Please fill in all details');
            return;
        }
        
        // save data to db
        db.transaction(function (tx){
            tx.executeSql('INSERT INTO table_user(employee_id, company, rate, date, start_time, end_time) VALUES (?,?,?,?,?,?) ', 
            [empID, company, rate ,date, startTime, endTime],
            (tx, results) =>{
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0){
                    //ToastAndroid.show('Details saved successfully', ToastAndroid.SHORT);
                    console.log('save data pressed')
                    navigation.navigate('Timetable')
                }else{
                    //ToastAndroid.show('Error saving details!', ToastAndroid.SHORT);
                    alert('Error saving details!');
                }
            } );
        });
    };


    return(
        <View style={globalStyles.container}>
            <Text>Create a Time Card</Text>
            <FormInput
                labelName = 'Employee ID'
                value = {empID}
                onChangeText = {(text) => setEmpID(text)}
            />

            <FormInput
                labelName = 'Company'
                value = {company}
                onChangeText = {(text) => setCompany(text)}
            />

            <FormInput
                labelName = 'Rate'
                value = {rate}
                onChangeText = {(text) => setRate(text)}
            />

            <DatePicker
                style = {{width: width/1.5}}
                date = {date}
                mode = 'date'
                placeholder = 'Date'
                format = 'DD-MM-YYYY'
                minDate = '01-01-2019'
                maxDate = '01-01-2100'
                confirmBtnText = 'Confirm'
                cancelBtnText = 'Cancel'
                customStyles={{
                    dateIcon:{
                        position:'absolute',
                        left:0,
                        top:4,
                        marginLeft:0
                    },
                    dateInput:{
                        marginLeft:36
                    }
                }}
                onDateChange = {(date) => setDate(date)}
            />

            <View style={styles.timeView}>
                <TouchableOpacity style={styles.timeTouchable} onPress={() => this.TimePicker.open()} >
                    <Text style={{paddingTop:5}}>Start Time</Text>
                    <View style={styles.timeTextView}>
                        <Text style={styles.timeText}>{startHour}</Text>
                        <Text style={styles.timeText}>:</Text>
                        <Text style={styles.timeText}>{startMinute}</Text>
                    </View>   
                    
                </TouchableOpacity>
            </View>

            <View style={styles.timeView}>
                <TouchableOpacity style={styles.timeTouchable} onPress={() => this.TimePickerEnd.open()} >
                    <Text style={{paddingTop:5}}>End Time</Text>
                    <View style={styles.timeTextView}>
                        <Text style={styles.timeText}>{endHour}</Text>
                        <Text style={styles.timeText}>:</Text>
                        <Text style={styles.timeText}>{endMinute}</Text>
                    </View>   
                    
                </TouchableOpacity>
            </View>

            <TimePicker
                ref={ref => {
                    this.TimePicker = ref;
                }}
                onCancel = {this.onStartCancel}
                onConfirm = {(hour, minute) => {
                    setStartHour(hour)
                    setStartMinute(minute)
                    this.TimePicker.close()
                }}

            />

            <TimePicker
                ref={ref => {
                    this.TimePickerEnd = ref;
                }}
                onCancel = {this.onEndCancel}
                onConfirm = {(hour, minute) => {
                    setEndHour(hour)
                    setEndMinute(minute)
                    this.TimePickerEnd.close()
                }}

            />

            <FormButton
                title = 'Submit'
                onPress = {this.saveData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        paddingTop:30
    },
    timeView:{
        height: 40,
        width: width / 1.5,
        paddingTop:5
    },
    timeTouchable:{
        width: width / 1.5,
        borderWidth:1,
        flexDirection:'row',
        height: 40,
        borderBottomColor:'gray'
    },
    timeText:{
        fontSize: 18,
        paddingTop: 5
    },
    timeTextView:{
        flexDirection:'row',
        paddingLeft:20
    }
});