import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Image ,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

  const handleAddItem = () => {
    const newItem = { description: 'New Item', date: new Date().toISOString() };
    setItems([...items, newItem]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.description}</Text>
      <Text style={styles.listItemDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Score</Text>
        <Text style={styles.score}>{score}</Text>
        <TouchableOpacity onPress={handleScorePress} style={{alignItems: 'center',justifyContent: 'center'}}>
          <Image  style={styles.imageStyle} source={require('../resources/add.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Volunteer Hours</Text>
        <Text style={styles.hours}>{hours}h</Text>
        <TouchableOpacity onPress={handleHoursPress} style={{alignItems: 'center',justifyContent: 'center'}}>
          <Image  style={styles.imageStyle} source={require('../resources/add.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Button title="Add Item" onPress={handleAddItem} />
        <FlatList data={items} keyExtractor={(item) => item.date} renderItem={renderItem} />
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
  imageStyle:{
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
