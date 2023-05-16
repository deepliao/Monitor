import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';

const AddNewDay = () => {
    const dayKey = 'day_data';
    const navigation = useNavigation();
    const [eventName, seteventName] = useState('');
    const [date, setDate] = useState(new Date())
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [weekday, setWeekDay] = useState('')
    const [open, setOpen] = useState(false)
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    navigation.setOptions({
        headerShown: true,
        title: 'Add New Day',
        headerTitleAlign: 'center',
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CoundownDay')}>
                <Text style={{ paddingLeft: 15 }}>Return</Text>
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity onPress={handleSaveScore}>
                <Text style={{ paddingRight: 10 }}>Save</Text>
            </TouchableOpacity>
        ),
    });

    const handleSaveScore = async () => {
        const dayData = {
          eventName: eventName,
          date:date
        };
        try {
          const existingData = await AsyncStorage.getItem(dayKey);
          let newData = [];
      
          if (existingData !== null) {
              newData = JSON.parse(existingData);
          }
          newData.push(dayData);
          await AsyncStorage.setItem(dayKey, JSON.stringify(newData));
          alert('Add New Day successfully!');
          navigation.goBack()
        } catch (e) {
          console.log(e);
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.formItem}>
                <Text style={styles.label}>Event Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => seteventName(text)}
                    value={eventName}
                    placeholder="Enter event name"
                />
            </View>
            <View style={styles.formItem}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                    Target Day
                </Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 4,
                        padding: 8,
                        margin: 4,
                        textAlign: 'center',
                        flex: 1,
                    }}>
                        {year ? `${year}-${month}-${day} ${weekday}` : `${year}${month}${day} ${weekday}`}
                    </Text>
                    <Button title="Open" onPress={() => setOpen(true)} />
                </View>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    onConfirm={(date) => {
                        setOpen(false)
                        const Year = date.getFullYear().toString()
                        const Month = (date.getMonth() + 1).toString().padStart(2, '0')
                        const Day = date.getDate().toString().padStart(2, '0')
                        const dayOfWeek = weekdays[date.getDay()]; // 获取星期几的值
                        setYear(Year)
                        setMonth(Month)
                        setDay(Day)
                        setWeekDay(dayOfWeek)
                        setDate(date)
                        console.log("Date", date, year, month, day)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </View>
        </View>
    )
}

export default AddNewDay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    formItem: {
        marginVertical: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginTop: 4,
    },
    picker: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginTop: 4,
    },
});