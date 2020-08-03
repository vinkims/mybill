import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import globalStyles from './globalStyles';
import FormButton from '../components/FormButton';
import {Card, CardItem} from 'native-base';

var db = openDatabase({name: 'MyBill.db'})

export default function TimetableScreen({navigation}){

    let [flatlistItems, setFlatlistItems] = useState([]);

    useEffect(() =>{
        db.transaction((tx) =>{
            tx.executeSql('SELECT * FROM table_user', [],
            (tx, results) =>{
                var temp = [];
                for (let i = 0; i < results.rows.length; i++){
                    temp.push(results.rows.item(i));
                }
                setFlatlistItems(temp);
                console.log(flatlistItems)
            });
        });
    }, [])

    return(
        <View style={{paddingTop:30}}>
            <Card>
                <CardItem>
                    <View style={styles.tableColumnHeading}>
                        <Text style={styles.cardText}>Company</Text>
                    </View>
                    <View style={[styles.tableColumnHeading, styles.tableColumnSeparator]}>
                        <Text style={styles.cardText}>Hours Worked</Text>
                    </View>
                </CardItem>
                {
                    flatlistItems.map((item, index) =>
                    <CardItem key={index} cardBody style={styles.tableRow}>
                        <View style={[styles.tableDateColumn, styles.tableColumnValue]}>
                            <Text style={styles.cardText}>{item.company}</Text>
                        </View>
                        <View style={[styles.tableColumnValue, styles.tableColumnSeparator]}>
                            <Text style={styles.cardText}>{item.hours_worked}</Text>
                        </View>
                    </CardItem>)
                }
            </Card>
            <View style={globalStyles.container}>
                <Text>Choose one option for timecards:</Text>
                <FormButton
                    title = 'Create'
                    onPress = {() => navigation.navigate('CreateTimecard')}
                />

                <FormButton
                    title = 'View'
                    onPress = {() => navigation.navigate('ViewTimecard')}
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    tableColumnHeading: {
        flex: 1,
        paddingHorizontal: 4
    },
    tableColumnSeparator: {
        borderLeftWidth: 1,
        borderColor: 'gray'
    },
    cardText:{
        fontSize:12
    },
    tableRow: {
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    tableDateColumn: {
        alignItems: 'flex-start',
    },
    tableColumnValue: {
        flex: 1,
        paddingHorizontal: 4,
    },
});