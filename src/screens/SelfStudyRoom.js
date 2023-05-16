import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelfStudyRoom = () => {
  const navigation = useNavigation();
  const durationKey = 'duration_data';
  const [lists, setLists] = useState([]);

  navigation.setOptions({
    headerShown: true,
    title: 'Self-Study Room',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity onPress={{ handleSaveScore }} style={{ paddingLeft: 20 }}>
        <Image source={require('../resources/reduce.png')} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('AddNewFocus')} style={{ paddingRight: 20 }}>
        <Image source={require('../resources/add.png')} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>
    ),
  });

  const handleSaveScore = () => {


  };
  
  useEffect(() => {
    const listItem = async () => {
      try {
        const focusData = await AsyncStorage.getItem(durationKey);
        const parsedData = JSON.parse(focusData);
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
        <View>
          <View key={item.eventName} style={styles.listItem}>
            <View style={styles.textContainer}>
              <Text style={styles.eventName}>{item.eventName}</Text>
              <Text style={styles.duration}> {item.duration} min</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Timeing',{ data: item })}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Start</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      ))}
    </View>
  )
}

export default SelfStudyRoom


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
  textContainer: {
    flexDirection: 'column', // 新增：设置上下排列
    alignItems: 'flex-start', // 新增：左对齐
    flex: 1, // 新增：占据剩余空间
    marginRight: 8,
  },
  eventName: {
    fontSize: 23,
    marginBottom: 4, // 新增：添加下方留白
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#447bfe',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonText: {
    fontSize: 16,
    color: 'white', // 新增：设置字体颜色为白色
    padding: 5
  },
});