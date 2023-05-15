import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Timeing = () => {
    const navigation = useNavigation();

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
                <Text style={{ paddingRight: 10 }}>Save</Text>
            </TouchableOpacity>
        ),
    });

    const handleSaveScore = () => {

    };
    return (
        <View>
            <Text>Timeing</Text>
        </View>
    )
}

export default Timeing

const styles = StyleSheet.create({})