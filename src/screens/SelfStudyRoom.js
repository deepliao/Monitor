import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { Easing, Animated, Image, ActivityIndicator, StyleSheet, Text, TouchableOpacity, Dimensions, View, ScrollView } from 'react-native';
import SortableList from 'react-native-sortable-list';

const SelfStudyRoom = () => {
  const navigation = useNavigation();
  const durationKey = 'duration_data';
  const [lists, setLists] = useState([]);
  const [adjust, setAdjust] = useState(false);
  const isFocused = useIsFocused();

  const listItem = useCallback(async () => {
    try {
      const focusData = await AsyncStorage.getItem(durationKey);
      const parsedData = JSON.parse(focusData);
      setLists(parsedData);
      return Promise.resolve(parsedData);
    } catch (e) {
      console.log(e);
    }
  }, []);

  navigation.setOptions({
    headerShown: true,
    title: 'Self-Study Room',
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
      <TouchableOpacity onPress={() => navigation.navigate('AddNewFocus')} style={{ paddingRight: 20 }}>
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
    const { eventName, duration } = data;
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
        .filter(([k, v]) => !(v.eventName === eventName && v.duration === duration))
        .reduce((obj, [k, v], i) => ({ ...obj, [i]: v }), {});
      await AsyncStorage.setItem(durationKey, JSON.stringify(newData));
      setLoading(false);
      setLists(newData);
    }, [eventName, duration]);

    useEffect(() => {
      Animated.timing(activeAnim.current, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(active),
        useNativeDriver: false,
      }).start();
    }, [active]);

    return (
      <Animated.View style={[styles.row, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.eventName}>{eventName}</Text>
          <Text style={styles.duration}> {duration} min</Text>
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
    await AsyncStorage.setItem(durationKey, JSON.stringify(afterData));
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
                    <View style={styles.textContainer}>
                      <Text style={styles.eventName}>{item.eventName}</Text>
                      <Text style={styles.duration}> {item.duration} min</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Timeing', { data: item })}>
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>START</Text>
                      </View>
                    </TouchableOpacity>
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

export default SelfStudyRoom


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 13,
    marginVertical: 4,
    marginBottom: 20
  },
  textContainer: {
    flexDirection: 'column', // 新增：设置上下排列
    alignItems: 'flex-start', // 新增：左对齐
    flex: 1, // 新增：占据剩余空间
    marginRight: 8,
  },
  eventName: {
    fontSize: 23,
    marginBottom: 4, // 新增：添加下方留白
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#447bfe',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonText: {
    fontSize: 16,
    color: 'white', // 新增：设置字体颜色为白色
    padding: 5
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
  deleteButton: {
    width: 40,
    height: 40,
    position: 'relative',
  }
});