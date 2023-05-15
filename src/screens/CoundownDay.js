import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CoundownDay = () => {
  const navigation = useNavigation();

  navigation.setOptions({
    headerShown: true,
    title: 'Countdown Day',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity onPress={{handleSaveScore}} style={{paddingLeft:20}}>
        <Image source={require('../resources/reduce.png')} style={{height:30,width:30}}/>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('AddNewDay')} style={{ paddingRight:20 }}>
        <Image source={require('../resources/add.png')} style={{height:30,width:30}}/>
      </TouchableOpacity>
    ),
  });

  const handleSaveScore = () => {

  
  };
  
  return (
    <View>
      <Text>CoundownDay</Text>
    </View>
  )
}

export default CoundownDay

const styles = StyleSheet.create({})