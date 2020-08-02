import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Button, Alert, ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {openDatabase} from 'react-native-sqlite-storage'; 
import globalStyles from './globalStyles';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-24h-timepicker';

const {width, height} = Dimensions.get('screen');

var db = openDatabase({name: 'MyBill.db'});

export default function EditTimecardScreen({route, navigation}){

    const {user_id} = route.params;
    console.log(user_id)

    let [dataItems, setDataItems] = useState({});

    let [empID, setEmpID] = useState('');
    let [company, setCompany] = useState('');

    let [startHour, setStartHour] = useState('');
    let [startMinute, setStartMinute] = useState('');
    let [endHour, setEndHour] = useState('');
    let [endMinute, setEndMinute] = useState('');
    let [rate, setRate] = useState('');
    let [date, setDate] = useState('');

    var startTime = `${startHour}:${startMinute}`;
    var endTime = `${endHour}:${endMinute}`;

    useEffect(() =>{
        db.transaction((tx) =>{
            setDataItems({});
            tx.executeSql('SELECT * FROM table_user where user_id=?', 
            [user_id],
            (tx, results) => {
                var len = results.rows.length;
                console.log('len', len);
                if (len > 0){
                    setDataItems(results.rows.item(0));
                }else{
                    console.log('No user available')
                }
            });
        });
    }, [])

    onStartCancel = () =>{
        this.TimePicker.close()
    }

    onEndCancel = () =>{
        this.TimePickerEnd.close()
    }

    // update timecard
    saveData = (user_id) =>{
        // check for null values
        if (!empID || !company || !rate || !date || !startHour || !startMinute || !endHour || !endMinute){
            alert('Please fill in all details');
            return;
        }

        // save data to db
        db.transaction((tx) =>{
            tx.executeSql('UPDATE table_user set employee_id=?, company=?, rate=?, date=?, start_time=?, end_time=? where user_id=?',
            [empID, company, rate, date, startTime, endTime, user_id], 
            (tx, results) =>{
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0){
                    Alert.alert(
                        'Success',
                        'Timecard successfully updated',
                        [
                            {
                                text: 'Ok', 
                                onPress: () => navigation.navigate('ViewTimecard')
                            },
                        ],
                    );
                }else alert('Update failed!');
            })
        })
    }

    return(
        <View style={globalStyles.container}>
            <Text>Create a Time Card</Text>
            <FormInput
                labelName = 'Employee ID'
                value = {empID}
                defaultValue = {dataItems.empID}
                onChangeText = {(text) => setEmpID(text)}
            />

            <FormInput
                labelName = 'Company'
                value = {company}
                defaultValue = {dataItems.company}
                onChangeText = {(text) => setCompany(text)}
            />

            <FormInput
                labelName = 'Rate'
                value = {rate}
                defaultValue = {dataItems.rate}
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
        borderBottomWidth:1,
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