import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Button} from 'react-native';

export default function LoginScreen({navigation}){
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    return(
        <View style={styles.container}>
            <Text style={styles.loginText}>Login</Text>
            <TextInput 
                placeholder = 'Username' 
            />
            <TextInput 
                placeholder = 'Password' 
                keyboardType = 'visible-password' 
                value={username}
                onChangeText = {(text) => setUsername(text)}
            />
            <Button
                title='Login'
                onPress={() => navigation.navigate('Timetable')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        paddingTop:30
    },
    loginText:{
        fontSize:20
    },
    textInput:{
        //height:40,
        borderBottomColor:'gray'
        //borderWidth:1
    }
});