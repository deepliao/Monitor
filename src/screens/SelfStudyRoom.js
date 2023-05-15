import { StyleSheet, Text, View,Image,TouchableOpacity,Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const SelfStudyRoom = () => {
  const navigation = useNavigation();

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
  return (
    <View>
      <Text>SelfStudyRoom</Text>
      <Button title="Start" onPress={()=>{
        navigation.navigate('Timeing')
      }} />
    </View>
  )
}

export default SelfStudyRoom

const styles = StyleSheet.create({})