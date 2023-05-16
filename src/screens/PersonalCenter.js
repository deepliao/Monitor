import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalCenter = () => {

  const data = [
    { date: "2/13", time: 7 },
    { date: "2/14", time: 6 },
    { date: "2/15", time: 4 },
    { date: "2/16", time: 5 }
  ];

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
        <Text style={{textAlign:'center'}}>DAILY FOCUS DURATION</Text>
      </View>

      <View style={styles.chartStyle}>
        <VictoryChart height={280}>
          <VictoryBar
            data={data}
            style={{ data: { fill: '#447bfe' } }}
            x='date'
            y="time"
            labels={({ datum }) => `${datum.time}h`} />
          <VictoryAxis style={{ axis: { stroke: 'none' } }} />
        </VictoryChart>
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
  hours: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  chartStyle: {
    backgroundColor: '#ffffff'
  }
});