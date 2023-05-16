import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Timing = ({ route }) => {
    const [data, setData] = useState(route.params.data);
    const duration = data.duration;
    const past = data.past;
    const rest = data.rest;
    const navigation = useNavigation();

    const [timeLeft, setTimeLeft] = useState(duration * 60 - past);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);

    navigation.setOptions({
        headerShown: true,
        title: 'Timing Page',
        headerTitleAlign: 'center',
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ paddingLeft: 15 }}>Pause</Text>
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity onPress={handleSaveScore}>
                <Text style={{ paddingRight: 10 }}>Cancel</Text>
            </TouchableOpacity>
        ),
    });

    const handleSaveScore = () => { };

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
        textAlign:'center',
        fontWeight:'bold'
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
