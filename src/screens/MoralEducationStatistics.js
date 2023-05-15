import React, { useState, useEffect } from 'react';
import { View, Text, Button,ScrollView,FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoralEducationStatistics = () => {
  const navigation = useNavigation();
  const [score, setScore] = useState(0);
  const [hours, setHours] = useState(0);
  const [items, setItems] = useState([]);

  const handleScorePress = () => {
    navigation.navigate('AddScore')
  };

  const handleHoursPress = () => {
    navigation.navigate('AddVolunteer')
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={()=>{
          navigation.navigate('Event', { data: item })
        }}>
        <Text style={styles.listItemText}>{item.eventName}</Text>
        <Text style={styles.listItemDate}>{item.classify}</Text>
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    // 计算得分和志愿小时数
    const calculateData = async () => {
      try {
        const scoreData = await AsyncStorage.getItem('score_data');
        let scoreValue = 0;
        let hoursValue = 0;
        if (scoreData !== null) {
          const scores = JSON.parse(scoreData);
          for (const s of scores) {
            scoreValue += parseInt(s.score);
            hoursValue += parseInt(s.duration);
          }
        }
        setScore(scoreValue);
        setHours(hoursValue);
      } catch (e) {
        console.log(e);
      }
    };
    const listItem = async () => {
      try {
        const scoreData = await AsyncStorage.getItem('score_data');
        const parsedData = JSON.parse(scoreData);
        setItems(parsedData);
      } catch (e) {
        console.log(e);
      }
    }
    calculateData();
    listItem();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Score</Text>
        <Text style={styles.score}>{score}</Text>
        <TouchableOpacity onPress={handleScorePress} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={styles.imageStyle} source={require('../resources/add.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Volunteer Hours</Text>
        <Text style={styles.hours}>{hours}h</Text>
        <TouchableOpacity onPress={handleHoursPress} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={styles.imageStyle} source={require('../resources/add.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
          <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.today}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
  hours: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    fontSize: 16,
  },
  listItemDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default MoralEducationStatistics;
