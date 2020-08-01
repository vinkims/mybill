import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {openDatabase} from 'react-native-sqlite-storage'; 
import globalStyles from './globalStyles';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const {width, height} = Dimensions.get('screen');

var db = openDatabase({name: 'MyBill.db'});

export default function ViewTimecardScreen({}){

    let [flatlistItems, setFlatlistItems] = useState([]);

    let [tableHead, setTableHead] = useState([]);
    let [widthArr, setWidthArr] = useState([]);

    useEffect(() =>{
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_user', [],
            (tx, results) =>{
                var temp = [];
                for(let i = 0; i < results.rows.length; i++){
                    temp.push(results.rows.item(i));
                }
                setFlatlistItems(temp);
            });
        });
    }, [])

    let listViewItemSeperator = () =>{
        return(
            <View></View>
        );
    }

    let listViewItem = (item) =>{
        return(
            <View
                key = {item.user_id}
                style={styles.listView}
            >
                <Text>Employee id: {item.employee_id}</Text>
                <Text>Company: {item.company}</Text>
                <Text>Date: {item.date}</Text>
                <Text>Start Time: {item.start_time}</Text>
                <Text>End Time: {item.end_time}</Text>
            </View>
        );
    }

    return(
        <View style={globalStyles.container}>
            <FlatList
                data = {flatlistItems}
                ItemSeparatorComponent = {listViewItemSeperator}
                keyExtractor = {(item, index) => index.toString}
                renderItem = {({item}) => listViewItem(item)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listViewSeparator:{
        height: 0.2, 
        width:'100%',
        backgroundColor: '#808080'
    },
    listView:{
        padding: 20
    }
});