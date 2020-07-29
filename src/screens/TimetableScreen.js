import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

export default function TimetableScreen({navigation}){
    return(
        <View>
            <Text>See your timetable here</Text>
            <Button
                title = 'Create'
                onPress={() => navigation.navigate('CreateTimecard')}
            />
        </View>
    );
}