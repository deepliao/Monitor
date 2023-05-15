import React from 'react'
import { Image, Button } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CoundownDay from '../screens/CoundownDay';
import MoralEducationStatistics from '../screens/MoralEducationStatistics';
import PersonalCenter from '../screens/PersonalCenter';
import SelfStudyRoom from '../screens/SelfStudyRoom';
import AddScore from '../pages/AddScore';
import AddVolunteer from '../pages/AddVolunteer';
import Envent from '../pages/Envent';
import AddNewDay from '../pages/AddNewDay';
import AddNewFocus from '../pages/AddNewFocus';
import Timeing from '../pages/Timeing';
import { labelStyles } from '../styles/LabelStyle';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Router = () => {
    return (
        <Tab.Navigator
            headerShown='true'
            initialRouteName="Coundown Day"
            screenOptions={{
                headerTitleAlign: 'center',
                tabBarActiveTintColor: 'steelblue',
                tabBarLabelStyle: {
                    textAlign: 'center',
                    fontSize: 12,
                    marginBottom: 4,
                },
                tabBarStyle: {
                    height: 65,
                },
            }}

        >
            <Tab.Screen name="Coundown"
                options={{
                    tabBarLabel: 'Coundown', headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../resources/labelIcon/home.png')}
                            style={[labelStyles.icon, { tintColor: color }]}
                        />
                    ),
                }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="CoundownDay" component={CoundownDay} options={{ headerShown: true, headerTitleAlign: 'center' }} />
                        <Stack.Screen name="AddNewDay" component={AddNewDay} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen name="Self-Study Room"
                options={{
                    tabBarLabel: 'Self-Study', headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../resources/labelIcon/alarm.png')}
                            style={[labelStyles.icon, { tintColor: color }]}
                        />
                    ),
                }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="SelfStudyRoom" component={SelfStudyRoom} options={{ headerShown: true, headerTitleAlign: 'center' }} />
                        <Stack.Screen name="AddNewFocus" component={AddNewFocus} />
                        <Stack.Screen name="Timeing" component={Timeing} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen name="Statistics"
                options={{
                    tabBarLabel: 'Statistics', headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../resources/labelIcon/statistics.png')}
                            style={[labelStyles.icon, { tintColor: color }]}
                        />
                    ),
                }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="Moral Education Statistics" component={MoralEducationStatistics} options={{ headerShown: true, headerTitleAlign: 'center' }} />
                        <Stack.Screen name="AddScore" component={AddScore} />
                        <Stack.Screen name="AddVolunteer" component={AddVolunteer} />
                        <Stack.Screen name="Event" component={Envent} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen name="Personal Center" component={PersonalCenter}
                options={{
                    tabBarLabel: 'Center',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../resources/labelIcon/setting.png')}
                            style={[labelStyles.icon, { tintColor: color }]}
                        />
                    ),
                }}
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default Router