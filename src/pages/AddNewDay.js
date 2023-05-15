import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const AddNewDay = () => {
    const navigation = useNavigation();

    navigation.setOptions({
        headerShown: true,
        title: 'Add New Day',
        headerTitleAlign: 'center',
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ paddingLeft: 15 }}>Return</Text>
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
            <Text>AddNewDay</Text>
        </View>
    )
}

export default AddNewDay

const styles = StyleSheet.create({})