import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Button, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {openDatabase} from 'react-native-sqlite-storage'; 
import globalStyles from './globalStyles';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {Card, CardItem} from 'native-base';

const {width, height} = Dimensions.get('screen');

var db = openDatabase({name: 'MyBill.db'});

export default function ViewTimecardScreen({navigation}){

    let [flatlistItems, setFlatlistItems] = useState([]);

    useEffect(() =>{
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_user', [],
            (tx, results) =>{
                var temp = [];
                for(let i = 0; i < results.rows.length; i++){
                    temp.push(results.rows.item(i));
                }
                setFlatlistItems(temp);
                console.log(flatlistItems)
            });
        });
    }, [])

    function deleteOrEdit(userID){
        console.log('User ID', userID)
        Alert.alert(
            'Select',
            'Edit or delete Timecard',
            [
                { text: 'Edit', onPress: () => editTimecard(userID)},
                {text: 'Delete', onPress: () => deleteTimecard(userID)}
            ]
        );
    }

    // delete Timecard
    function deleteTimecard(userID){
        console.log('user id', userID)
        db.transaction((tx) =>{
            tx.executeSql('DELETE FROM table_user where user_id=?',
            [userID],
            (tx, results) =>{
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0){
                    Alert.alert(
                        'Success',
                        'Timecard successfully deleted',
                        [
                            {
                                text: 'Ok', 
                                onPress: () => navigation.navigate('ViewTimecard')
                            },
                        ],
                    );
                }else alert('Delete failed!');
            })
        })
    }

    //edit Timecard
    function editTimecard(userID){
        navigation.navigate('EditTimecard', 
        {
            user_id: userID
        })
    }


    return(
        <View style={{paddingTop:30}}> 
            <Text style={{paddingLeft:10}}>Time Cards</Text>
            <Card>
                <CardItem cardBody>
                    <View style={styles.tableColumnHeading}>
                        <Text style={styles.cardText}>Employee ID</Text>
                    </View>
                    <View style={[styles.tableColumnHeading, styles.tableColumnSeparator]}>
                        <Text style={styles.cardText}>Billable Rate</Text>
                    </View>
                    <View style={[styles.tableColumnHeading, styles.tableColumnSeparator]}>
                        <Text style={styles.cardText}>Company</Text>
                    </View>
                    <View style={[styles.tableColumnHeading, styles.tableColumnSeparator]}>
                        <Text style={styles.cardText}>Date</Text>
                    </View>
                    <View style={[styles.tableColumnHeading, styles.tableColumnSeparator]}>
                        <Text style={styles.cardText}>Start Time</Text>
                    </View>
                    <View style={[styles.tableColumnHeading, styles.tableColumnSeparator]}>
                        <Text style={styles.cardText}>End Time</Text>
                    </View>
                    <View style={[styles.tableColumnHeading, styles.tableColumnSeparator]}>
                        <Text style={styles.cardText}>Edit/Delete</Text>
                    </View>
                    
                </CardItem>
                {
                    flatlistItems.map((item, index) =>
                        <CardItem key={index} cardBody style={styles.tableRow}>
                            <View style={[styles.tableDateColumn, styles.tableColumnValue]}>
                                <Text style={styles.cardText}>{item.employee_id}</Text>
                            </View>
                            <View style={[styles.tableColumnValue, styles.tableColumnSeparator]}>
                                <Text style={styles.cardText}>{item.rate}</Text>
                            </View>
                            <View style={[styles.tableColumnValue, styles.tableColumnSeparator]}>
                                <Text style={styles.cardText}>{item.company}</Text>
                            </View>
                            <View style={[styles.tableColumnValue, styles.tableColumnSeparator]}>
                                <Text style={styles.cardText}>{item.date}</Text>
                            </View>
                            <View style={[styles.tableColumnValue, styles.tableColumnSeparator]}>
                                <Text style={styles.cardText}>{item.start_time}</Text>
                            </View>
                            <View style={[styles.tableColumnValue, styles.tableColumnSeparator]}>
                                <Text style={styles.cardText}>{item.end_time}</Text>
                            </View>
                            <View style={[styles.tableColumnValue, styles.tableColumnSeparator]}>
                                <Button
                                    title = 'E/D'
                                    onPress = {() => deleteOrEdit(index)}
                                />
                            </View>
                            
                        </CardItem>
                    )
                }
            </Card>

            <View style={styles.buttonView}>

                <FormButton
                    title = 'Create Timecard'
                    onPress = {() => navigation.navigate('CreateTimecard')}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    head: { 
        height: 40, 
        backgroundColor: '#808B97' 
    },
    HeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
    },
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
    buttonView:{
        alignItems:'center'
    }
});