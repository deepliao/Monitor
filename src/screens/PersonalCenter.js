import React, { useState, useEffect } from 'react';
import { View, Text, Button,ScrollView,FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalCenter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Score</Text>
        <Text style={styles.score}>80</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Volunteer Duration</Text>
        <Text style={styles.hours}>20h</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Focus Duration</Text>
        <Text style={styles.hours}>20h</Text>
      </View>
    </View>
  )
}

export default PersonalCenter

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  section: {
    marginBottom: 5,
    backgroundColor: '#f5f5f5',
    padding: 5,
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