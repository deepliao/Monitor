import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoralEducationStatistics = () => {
  const navigation = useNavigation();
  const [score, setScore] = useState(0);
  const [hours, setHours] = useState(0);
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused();

  const handleScorePress = () => {
    navigation.navigate('AddScore')
  };

  const handleHoursPress = () => {
    navigation.navigate('AddVolunteer')
  };

  const calculateData = async () => {
    try {
      const scoreData = await AsyncStorage.getItem('score_data');
      let scoreValue = 0;
      let hoursValue = 0;
      if (scoreData !== null) {
        const scores = JSON.parse(scoreData);
        {
          Object.keys(scores).map((key) => {
            const item = scores[key];
            scoreValue += parseFloat(item.score);
            hoursValue += parseFloat(item.duration);
          })
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

  useEffect(() => {
    if (isFocused) {
      calculateData();
      listItem();
    }
  }, [isFocused]);
  return (
    <>
      <View>
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
      </View>
      <ScrollView style={styles.listsection}>
        {
          items !== null ?
            Object.keys(items).reverse().map((key) => {
              const item = items[key];
              return (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Event', { data: item })
                }}>
                  <View style={styles.listItem}>
                    <View>
                      <Text style={styles.listItemText}>{item.eventName}</Text>
                      <Text style={styles.listItemDate}> • {item.score != 0 ? item.score : item.duration} points</Text>
                    </View>
                    <Image source={require('../resources/arrow.png')} style={styles.arrow} />
                  </View>
                </TouchableOpacity>
              )
            }) : <View />
        }
      </ScrollView>
    </>


  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
  listsection: {
    backgroundColor: '#f5f5f5',
    padding: 5,
    margin: 10,
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
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 0.1,
    borderRadius: 10,
    marginBottom: 3,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  listItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemDate: {
    fontSize: 12,
    color: '#666',
  },
  arrow: {
    width: 22,
    height: 22,
    position:'relative',
    top:8
  }
});

export default MoralEducationStatistics;
