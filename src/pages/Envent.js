import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
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
        <Text style={styles.label}>Classify:  </Text>
        <View style={styles.labelvalue}>
          <Text style={{ textAlign: 'center' }}>{classify}</Text>
        </View>

      </View>
      <View style={styles.formItem}>
        <Text style={styles.label}>{parseFloat(score) !== 0 ? "Score:      " : "Duration:"}</Text>
        <View style={styles.labelvalue}>
          <Text style={{ textAlign: 'center' }}>
            {
              parseFloat(score) !== 0 ? score : duration
            }
          </Text>
        </View>
      </View>
      <View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Picture</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>display</Text>
        </View>
        <FlatList
          data={selectedImages}
          numColumns={2}
          keyExtractor={item => item.uri}
          renderItem={({ item }) => (
            uri = item[0]["uri"],
            <Image source={{ uri: uri }} style={styles.imagedisplay} />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelvalue: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
  imagedisplay: {
    width: 150,
    height: 150,
    margin: 5
  }
});