import { useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { getDate } from '../utils/getDate';

const Timing = ({ route }) => {
    const [data, setData] = useState(route.params.data);
    const { today, month, day, dateStr } = getDate();
    const duration = data.duration;
    const allFocus = 'focus_data';
    const past = data.past;
    const rest = data.rest;
    const navigation = useNavigation();
    const [clac, setClac] = useState(true)
    const [appState, setAppState] = useState(AppState.currentState);

    const [timeLeft, setTimeLeft] = useState(duration * 60 - past);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);

    navigation.setOptions({
        headerShown: true,
        title: 'Timing Page',
        headerTitleAlign: 'center',
        headerLeft: () => (
            isPaused ? (
                <TouchableOpacity onPress={handleResume}>
                    <Text style={{ paddingLeft: 15 }}>Pause</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={handlePause}>
                    <Text style={{ paddingLeft: 15 }}>Pause</Text>
                </TouchableOpacity>
            )

        ),
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ paddingRight: 10 }}>Cancel</Text>
            </TouchableOpacity>
        ),
    });


    const statistics = async () => {
        const newfocus = {
            date: dateStr,
            data: duration
        };
        try {
            const existingData = await AsyncStorage.getItem(allFocus);
            let newData = [];
            let mergeindex = -1;
            var newIndex = -1
            if (existingData) {
                newIndex = Object.keys(existingData).length;
            } else {
                newIndex = 0
            }
            if (newIndex == 0) {
                // 第一次为空
                newData.push(newfocus);
            } else {
                // 不为空
                newData = JSON.parse(existingData);
                for (const [index, value] of Object.entries(newData)) {
                    console.log(value.date, dateStr, "++++")
                    if (value.date === dateStr) {
                        mergeindex = index
                    }
                }
                console.log(mergeindex)
                if (mergeindex === -1) {
                    // 不存在新数据
                    newData.push(newfocus);
                } else {
                    newData[mergeindex].data = JSON.stringify(parseFloat(duration) + parseFloat(newData[mergeindex].data));
                }
            }
            await AsyncStorage.setItem(allFocus, JSON.stringify(newData))
            setClac(false)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (timeLeft > 0 && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
                setData((prevData) => ({
                    ...prevData,
                    past: prevData.past + 1,
                    rest: prevData.rest - 1,
                }));
            }, 1000);
        } else {
            clearInterval(timerRef.current);
            if (timeLeft === 0 && clac) {
                statistics()
            }
        }
        return () => clearInterval(timerRef.current);
    }, [timeLeft, isPaused]);

    useEffect(() => {
        const progress = past / (duration * 60) * 100;
        const remainingProgress = rest / (duration * 60) * 100;
        const elapsedPercentage = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

        if (elapsedPercentage > progress) {
            setFill(elapsedPercentage);
        } else {
            setFill(progress);
        }
    }, [timeLeft]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                handlePause();
            };
        }, [])
    );
    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (
                appState.match(/active/) &&
                nextAppState.match(/inactive|background/)
            ) {
                handlePause();
            }
            setAppState(nextAppState);
        };

        AppState.addEventListener('change', handleAppStateChange);
    }, [appState]);

    const handlePause = () => {
        setIsPaused(true);
        clearInterval(timerRef.current);
    };

    const handleResume = () => {
        setIsPaused(false);
    };

    const [fill, setFill] = useState(past / (duration * 60) * 100);

    const displayMinutes = Math.floor(timeLeft / 60);
    const displaySeconds = timeLeft % 60;
    const displayTimeLeft = `${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;

    const displayRestMinutes = Math.floor(Math.abs(rest) / 60);
    const displayRestSeconds = Math.abs(rest) % 60;
    const displayRestTimeLeft = `${displayRestMinutes}:${displayRestSeconds < 10 ? '0' : ''}${displayRestSeconds}`;

    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={300}
                width={20}
                fill={100 - fill}
                tintColor="#447bfe"
                backgroundColor="#e6e6e6"
                duration={500}
                arcSweepAngle={270}
                rotation={225}
                lineCap="round"
            >
                {(fill) => (
                    <View style={styles.timerContainer}>
                        <Text style={styles.restTimer}>Elapsed Time</Text>
                        <Text style={styles.timer}>{displayTimeLeft}</Text>
                        <Text style={styles.restTimer}>Remaining Time</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{displayRestTimeLeft}</Text>
                    </View>
                )}
            </AnimatedCircularProgress>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <Text style={styles.progressText}>{`${Math.ceil(fill)}%`}</Text>
                    <Text style={styles.buttonText}>COMPLETED</Text>
                </View>
                <View style={styles.button}>
                    <Text style={styles.progressText}>{`${100 - Math.ceil(fill)}%`}</Text>
                    <Text style={styles.buttonText}>REMAINING</Text>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <Button title=' PAUSE ' onPress={handlePause} />

                </View>
                <View style={styles.button}>
                    <Button title=' RESUME' onPress={handleResume} />
                </View>
            </View>
        </View>
    );
};

export default Timing;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 12
    },
    restTimer: {
        fontSize: 20,
        marginBottom: 12,
    },
    progressText: {
        fontSize: 24,
        marginTop: 8,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 8,
    },
    buttonText: {
        fontSize: 16,
    },
});
