import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const AddNewFocus = () => {
    const navigation = useNavigation();

    navigation.setOptions({
        headerShown: true,
        title: 'Add New focus projects',
        headerTitleAlign: 'center',
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ paddingLeft: 15 ,fontSize:12 }}>Return</Text>
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
            <Text>AddNewFocus</Text>
        </View>
    )
}

export default AddNewFocus

const styles = StyleSheet.create({})