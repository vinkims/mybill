import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default function FormInput({labelName, ...rest}){
    return(
        <TextInput
            placeholder={labelName}
            style={styles.textInput}
            {...rest}
        />
    );   
}

const styles = StyleSheet.create({
    textInput:{
        width: width/ 1.5,
        height: 40,
        borderBottomColor:'gray',
        borderWidth:1,
        borderColor:'white',
    }
});