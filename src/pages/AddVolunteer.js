import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import {getDate} from '../utils/getDate';

const AddVolunteer = () => {
  const scoreKey = 'score_data';
  const [eventName, seteventName] = useState('');
  const [score, setscore] = useState('0');
  const [duration, setduration] = useState('');
  const [selectedImages, setselectedImages] = useState([]);
  const navigation = useNavigation();

  navigation.setOptions({
    headerShown: true,
    title: 'Add Volunteer Duration',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ paddingLeft: 10 }}>Return</Text>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={handleSaveVolunteer} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 12 }}>Complete</Text>
      </TouchableOpacity>
    ),
  });

  // 打开图库，选择图片
  const handleChoosePhoto = async () => {
    const options = {
      title: '选择图片',
      mediaType: 'photo', // 只显示照片
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setselectedImages(prevSelectedImages => [...prevSelectedImages, response.assets]);
      }
    });
  };


  const handleSaveVolunteer = async () => {
    const {today,month,day} = getDate();
    // 存储数据
    const volunteerData = {
      today: today,
      month: month,
      day: day,
      eventName: eventName,
      classify: 'Volunteer activities',
      score: score,
      duration: duration,
      selectedImages: selectedImages,
    };

    try {
      const existingData = await AsyncStorage.getItem(scoreKey);
      let newData = {};
  
      if (existingData !== null) {
          newData = JSON.parse(existingData);
      }
      var newIndex = Object.keys(newData).length;
      newData[newIndex] = volunteerData;
      await AsyncStorage.setItem(scoreKey, JSON.stringify(newData));
      alert('Score saved successfully!');
      navigation.goBack()
    } catch (e) {
      console.log(e);
    }
  
  };

  useEffect(() => {

  }, []);
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
      <View style={styles.formItem}>
        <Text style={styles.label}>Upload Photo:</Text>
        <Button title="上传图片" onPress={handleChoosePhoto} />
        <FlatList
          data={selectedImages}
          numColumns={3}
          keyExtractor={item => item.uri}
          renderItem={({ item }) => (
            uri = item[0]["uri"],
            <Image source={{ uri: uri }} style={{ width: 100, height: 100, margin: 5 }} />
          )}
        />
      </View>
    </View>
  );
};

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

export default AddVolunteer;
