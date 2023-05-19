import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Easing,
  View,
  Dimensions,
} from 'react-native';
import SortableList from 'react-native-sortable-list';

const window = Dimensions.get('window');

const data = {
  0: {
    key: '0',
    image: 'https://placekitten.com/200/240',
    text: 'Chloe',
  },
  1: {
    key: '1',
    image: 'https://placekitten.com/200/201',
    text: 'Jasper',
  },
  2: {
    key: '2',
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
  },
  3: {
    key: '3',
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
  },
  4: {
    key: '4',
    image: 'https://placekitten.com/200/204',
    text: 'Dusty',
  },
  5: {
    key: '5',
    image: 'https://placekitten.com/200/205',
    text: 'Spooky',
  },
  6: {
    key: '6',
    image: 'https://placekitten.com/200/210',
    text: 'Kiki',
  },
  7: {
    key: '7',
    image: 'https://placekitten.com/200/215',
    text: 'Smokey',
  },
  8: {
    key: '8',
    image: 'https://placekitten.com/200/220',
    text: 'Gizmo',
  },
  9: {
    key: '9',
    image: 'https://placekitten.com/220/239',
    text: 'Kitty',
  },
};

function Row(props) {
  const { active, data, onDelete } = props;

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
    []
  );

  const handleLongPress = useCallback(() => {
    if (onDelete) {
      onDelete(data);
    }
  }, [data, onDelete]);

  useEffect(() => {
    Animated.timing(activeAnim.current, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(active),
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.row, style]}>
      <TouchableOpacity
        onPress={() => {
          // 处理单击事件
        }}
        onLongPress={handleLongPress}
        style={[styles.row, style]}
      >
        <Image source={{ uri: data.image }} style={[styles.image]} />
        <Text style={styles.text}>{data.text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const App = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [listData, setListData] = useState(data);

  const handleDelete = (rowData) => {
    setListData((prevState) => {
      const newData = { ...prevState };
      delete newData[rowData.key];
      return newData;
    });
  };

  const renderHeader = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (selectedRow) {
            handleDelete(selectedRow);
            setSelectedRow(null);
          }
        }}
        style={styles.deleteButton}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderRow = useCallback(({ data, active }) => {
    const isSelected = selectedRow && selectedRow.key === data.key;

    return (
      <Row
        data={data}
        active={active}
        onDelete={handleDelete}
        style={[isSelected && styles.selectedRow]}
      />
    );
  }, [selectedRow]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Sortable List</Text>
      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={listData}
        renderRow={renderRow}
        onChangeOrder={(nextOrder) => {
          setListData((prevState) => {
            const newData = {};
            nextOrder.forEach((key) => {
              newData[key] = prevState[key];
            });
            return newData;
          });
        }}
        onActivateRow={(key) => setSelectedRow(listData[key])}
        onReleaseRow={() => setSelectedRow(null)}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },
      android: {
        paddingHorizontal: 0,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },
      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },
  text: {
    fontSize: 24,
    color: '#222222',
  },
});

export default App;

const Row = ({ active, data }) => {
  const { eventName, date } = data;
  const [loading, setLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    const res = await listItem();
    const newData = Object.entries(res)
      .filter(([k, v]) => !(v.eventName === eventName && v.date === date))
      .reduce((obj, [k, v], i) => ({ ...obj, [i]: v }), {});
    await AsyncStorage.setItem(dayKey, JSON.stringify(newData));
    setLoading(false);
    setFlush((prev) => prev + 1);
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
    <Animated.View style={[styles.row, style]}>
      <View style={styles.rowContent}>
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


const Row = (props) => {
  const { active, data } = props;
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

  const listItem = async () => {
    try {
      const dayData = await AsyncStorage.getItem(dayKey);
      const parsedData = JSON.parse(dayData);
      setLists(parsedData);
      return Promise.resolve(parsedData);
    } catch (e) {
      console.log(e);
    }
  }
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
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={styles.name}>{data.eventName}</Text>
        <View style={{ backgroundColor: '#447bfe', borderRadius: 5 }}>
          <Text style={styles.number}>{daysBetween(data.date)} days</Text>
        </View>
      </View>
      <TouchableOpacity onPress={async () => {
        listItem().then(async (res) => {
          let newData = {};
          let all = Object.keys(res).length;
          let index = 0
          var temp = 0
          for (let key in res) {
            if (res[key].date === data.date && res[key].eventName === data.eventName) {
              index = parseInt(key)
              temp = parseInt(key) + 1
            }
          }
          for (let i = 0; i < index; i++) {
            newData[i] = res[i]
          }
          for (let i = temp; i < all; i++) {
            newData[i - 1] = res[i]
          }
          await AsyncStorage.setItem(dayKey, JSON.stringify(newData));
        })
        setFlush(flush + 1)
      }}>
        <Image source={require('../resources/delete.png')} style={styles.deleteButton} />
      </TouchableOpacity>
    </Animated.View>
  );
}


{lists !== null && adjust ? (
  lists.map((item) => (
    <ScrollView>
      <View key={item.eventName} style={styles.listItem}>
        <View style={styles.textContainer}>
          <Text style={styles.eventName}>{item.eventName}</Text>
          <Text style={styles.duration}> {item.duration} min</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Timeing', { data: item })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  ))) : (
  <View></View>
)}
