import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalCenter = () => {
  const scoreKey = 'score_data';
  const allFocus = 'focus_data';
  const [score, setScore] = useState(0);
  const [hours, setHours] = useState(0);
  const [focus, setFocus] = useState(0);
  const [focuslist, setFocuslist] = useState();
  const [datalist, setDatalist] = useState();
  const isFocused = useIsFocused();

  const calculateData = async () => {
    try {
      const scoreData = await AsyncStorage.getItem(scoreKey);
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

  const getFocusHour = async () => {
    try {
      const focusData = await AsyncStorage.getItem(allFocus);
      console.log('focusData', focusData)
      setFocuslist(JSON.parse(focusData))
      const obj = JSON.parse(focusData);
      const result = [];
      // 循环遍历每个对象
      for (const [key, value] of Object.entries(obj)) {
        // 将每个对象中的数据提取出来，并添加到结果数组中
        const date = new Date(value.date);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
        result.push({ data: parseFloat(value.data), date: formattedDate });
      }
      setDatalist(result);
      let temp = 0;
      if (focusData !== null) {
        const focustimes = JSON.parse(focusData);
        Object.keys(focustimes).map((key) => {
          const item = focustimes[key];
          temp += parseFloat(item.data)
        })
        setFocus(temp);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (isFocused) {
      calculateData()
      getFocusHour()
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Score</Text>
        <Text style={styles.score}>{score}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Volunteer Duration</Text>
        <Text style={styles.hours}>{hours}h</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Focus Duration</Text>
        <Text style={styles.hours}>{focus.toFixed(1)}mins</Text>
        <Text style={{ textAlign: 'center' }}>DAILY FOCUS DURATION</Text>
      </View>

      <View style={styles.chartStyle}>
        {
          datalist === undefined ? <View /> :
            <VictoryChart height={280}>
              {console.log(datalist)}
              <VictoryBar
                data={datalist.slice(0, 5)}
                style={{ data: { fill: '#447bfe' } }}
                x='date'
                y="data" 
                labels={({ datum }) => `${datum.data.toFixed(1)}mins`}/>
              <VictoryAxis style={{ axis: { stroke: 'none' } }} />
            </VictoryChart>
        }
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