import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Easing, Animated, Image,  ActivityIndicator,StyleSheet, Text, TouchableOpacity, Dimensions, View, ScrollView } from 'react-native';
import SortableList from 'react-native-sortable-list';
import { daysBetween } from '../utils/getDate';

const CoundownDay = ({ route }) => {
  const navigation = useNavigation();
  const dayKey = 'day_data';
  const [lists, setLists] = useState([]);
  const [adjust, setAdjust] = useState(false);
  const isFocused = useIsFocused();

  const listItem = useCallback(async () => {
    try {
      const dayData = await AsyncStorage.getItem(dayKey);
      const parsedData = JSON.parse(dayData);
      setLists(parsedData);
      return Promise.resolve(parsedData);
    } catch (e) {
      console.log(e);
    }
  }, []);

  navigation.setOptions({
    headerShown: true,
    title: 'Countdown Day',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity onPress={() => {
        if (!adjust) {
          setAdjust(true)
        } else {
          listItem();
          setAdjust(false)
        }
      }} style={{ paddingLeft: 20 }}>
        <Image source={require('../resources/reduce.png')} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => { navigation.navigate('AddNewDay') }} style={{ paddingRight: 20 }}>
        <Image source={require('../resources/add.png')} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>
    ),
  });

  useEffect(() => {
    if (isFocused) {
      listItem();
    }
  }, [isFocused]);

  const Row = ({ active, data }) => {
    const { eventName, date } = data;
    const [loading, setLoading] = useState(false);
    const activeAnim = useRef(new Animated.Value(0));
    const style = useMemo(
      () => ({
        ...Platform.select({
          ios: {
            transform: [
              {
                scale: activeAnim.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.07],
                }),
              },
            ],
            shadowRadius: activeAnim.current.interpolate({
              inputRange: [0, 1],
              outputRange: [2, 10],
            }),
          },

          android: {
            transform: [
              {
                scale: activeAnim.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.07],
                }),
              },
            ],
            elevation: activeAnim.current.interpolate({
              inputRange: [0, 1],
              outputRange: [2, 6],
            }),
          },
        }),
      }),
      [],
    );

    const handleDelete = useCallback(async () => {
      setLoading(true);
      const res = await listItem();
      const newData = Object.entries(res)
        .filter(([k, v]) => !(v.eventName === eventName && v.date === date))
        .reduce((obj, [k, v], i) => ({ ...obj, [i]: v }), {});
      await AsyncStorage.setItem(dayKey, JSON.stringify(newData));
      setLoading(false);
      setLists(newData);
    }, [eventName, date]);

    useEffect(() => {
      Animated.timing(activeAnim.current, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(active),
        useNativeDriver: false,
      }).start();
    }, [active]);

    return (
      <Animated.View style={[styles.row,style]}>
        <View style={styles.adjustItem}>
          <Text style={styles.name}>{eventName}</Text>
          <View style={{ backgroundColor: '#447bfe', borderRadius: 5 }}>
            <Text style={styles.number}>{daysBetween(date)} days</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleDelete} disabled={loading}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Image source={require('../resources/delete.png')} style={styles.deleteButton} />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderRow = useCallback(({ data, active }) => {
    return <Row data={data} active={active} />;
  }, [lists]);

  const onReleaseRow = useCallback(async (key, currentOrder) => {
    let afterData = {};
    for (let i = 0; i < currentOrder.length; i++) {
      const key = currentOrder[i];
      afterData[i] = lists[key]
    }
    await AsyncStorage.setItem(dayKey, JSON.stringify(afterData));
  }, [adjust]);


  useEffect(() => {
  }, [lists]);

  return (
    <View style={styles.container}>
      {lists !== null && adjust ? (
        <SortableList
          data={lists}
          renderRow={renderRow}
          onReleaseRow={onReleaseRow}
        />
      ) : (
        <View>
          {lists !== null && !adjust ? (
            <ScrollView style={{ padding: 18 }}>
              {Object.keys(lists).map((key) => {
                const item = lists[key];
                return (
                  <View style={styles.listItem}>
                    <Text style={styles.name}>{item.eventName}</Text>
                    <View style={{ backgroundColor: '#447bfe', borderRadius: 5 }}>
                      <Text style={styles.number}>{daysBetween(item.date)} days</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <View />
          )}
        </View>
      )}
    </View>
  )
}

export default CoundownDay

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    flex: 1,
    marginRight: 8,
    fontSize: 23,
  },
  number: {
    fontSize: 23,
    color: 'white', // 新增：设置字体颜色为白色
    padding: 5
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    padding: 18,
    borderRadius: 2,
    marginHorizontal: 20,
    marginVertical: 4,
  },
  number: {
    fontSize: 23,
    color: 'white', // 新增：设置字体颜色为白色
    padding: 5
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 2,
    padding: 18,
    marginVertical: 4,
    marginBottom: 20,
  },
  adjustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    width: 36,
    height: 36,
    position: 'relative',
    top: -23
  }
});
