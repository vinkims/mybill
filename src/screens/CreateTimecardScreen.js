import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
//import TimePicker from 'react-native-simple-time-picker';
import TimePicker from 'react-native-24h-timepicker';

const {width, height} = Dimensions.get('screen');

export default function CreateTimecardScreen(){

    let [date, setDate] = useState('');
    
    const [empID, setEmpID] = useState('');
    const [company, setCompany] = useState('');

    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');

    const onStartChange = (hours, minutes) =>{
        setStartHour(hours)
        setStartMinute(minutes)
    }

    onStartCancel = () =>{
        this.TimePicker.close()
    }

    onEndCancel = () =>{
        this.TimePickerEnd.close()
    }


    return(
        <View style={styles.container}>
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
        width: width / 1.5
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