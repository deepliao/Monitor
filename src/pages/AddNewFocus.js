import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNewFocus = () => {
    const durationKey = 'duration_data';
    const navigation = useNavigation();
    const [eventName, seteventName] = useState('');
    const [duration, setduration] = useState(0)
    const [past, setpast] = useState(0)
    const [rest, setrest] = useState(0)

    navigation.setOptions({
        headerShown: true,
        title: 'Add New focus projects',
        headerTitleAlign: 'center',
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ paddingLeft: 15, fontSize: 12 }}>Return</Text>
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity onPress={handleSaveScore}>
                <Text style={{ paddingRight: 10 }}>Save</Text>
            </TouchableOpacity>
        ),
    });

    const handleSaveScore = async () => {
        const focusData = {
            eventName: eventName,
            duration: duration,
            past: past,
            rest: rest
        };
        try {
            const existingData = await AsyncStorage.getItem(durationKey);
            let newData = [];

            if (existingData !== null) {
                newData = JSON.parse(existingData);
            }
            newData.push(focusData);
            await AsyncStorage.setItem(durationKey, JSON.stringify(newData));
            alert('Add New Focus successfully!');
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
                <Text style={styles.label}>Duration:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setduration(text)}
                    value={duration}
                    keyboardType="numeric"
                    placeholder="Enter Duration"
                />
            </View>
        </View>
    )
}

export default AddNewFocus

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