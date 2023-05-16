import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { daysBetween } from '../utils/getDate';

const CoundownDay = () => {

  const navigation = useNavigation();
  const dayKey = 'day_data';
  const [lists, setLists] = useState([]);
  

  navigation.setOptions({
    headerShown: true,
    title: 'Countdown Day',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity onPress={{ handleSaveScore }} style={{ paddingLeft: 20 }}>
        <Image source={require('../resources/reduce.png')} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('AddNewDay')} style={{ paddingRight: 20 }}>
        <Image source={require('../resources/add.png')} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>
    ),
  });

  const handleSaveScore = () => {

  };
  useEffect(() => {
    const listItem = async () => {
      try {
        const dayData = await AsyncStorage.getItem(dayKey);
        const parsedData = JSON.parse(dayData);
        setLists(parsedData);
      } catch (e) {
        console.log(e);
      }
    }
    listItem();
  }, []);

  return (
    <View style={styles.container}>
      {lists.map((item) => (
        <View key={item.eventName} style={styles.listItem}>
          <Text style={styles.name}>{item.eventName}</Text>
          <View style={{ backgroundColor: '#447bfe' ,borderRadius:5 }}>
            <Text style={styles.number}>{daysBetween(item.date)} days</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default CoundownDay

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 13,
    marginVertical: 4,
    marginBottom: 20
  },
  name: {
    flex: 1,
    marginRight: 8,
    fontSize: 23,
  },
  number: {
    fontSize: 23,
    color: 'white', // 新增：设置字体颜色为白色
    padding:5
  },
});
