import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default function FormButton({title, ...rest}){
    return(
        <TouchableOpacity {...rest} style={styles.touchable}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable:{
        height: 40,
        width: width / 1.5,
        borderRadius:5,
        borderColor:'gray',
        borderWidth:1,
        backgroundColor:'#008080',
        marginTop:20
    },
    buttonText:{
        fontSize: 23,
        alignSelf:'center',
        color:'white'
    }
});