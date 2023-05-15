import { StyleSheet, Text, View, FlatList,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Envent = ({ route }) => {
  const { today,
    month,
    day,
    eventName,
    classify,
    score,
    duration,
    selectedImages } = route.params.data;
  const navigation = useNavigation();

  navigation.setOptions({
    headerShown: true,
    title: eventName,
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ paddingLeft: 15 }}>Return</Text>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => alert('This is a button!')} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ paddingRight: 10 }}>Complete</Text>
      </TouchableOpacity>
    ),
  });


  return (
    <View style={styles.container}>
      <View style={styles.formItem}>
        <Text style={styles.label}>Classify:</Text>
        <Text style={styles.label}>{classify}</Text>
      </View>
      <View style={styles.formItem}>
        <Text style={styles.label}>Score/Duration:</Text>
        <Text style={styles.label}>{score}</Text>
      </View>
      <View style={styles.formItem}>
        <Text style={styles.label}>Picture display</Text>
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
  )
}

export default Envent

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