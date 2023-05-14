import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CoundownDay from '../screens/CoundownDay';
import MoralEducationStatistics from '../screens/MoralEducationStatistics';
import PersonalCenter from '../screens/PersonalCenter';
import SelfStudyRoom from '../screens/SelfStudyRoom';
import AddScore from '../pages/AddScore';
import AddVolunteer from '../pages/AddVolunteer';
import Addenvent from '../pages/Addenvent';
import {labelStyles} from '../styles/LabelStyle'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Router = () => {
    return (
        <Tab.Navigator
            initialRouteName="CoundownDay"
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'center',
                tabBarActiveTintColor: 'steelblue',
                tabBarLabelStyle:{
                    textAlign: 'center',
                    fontSize: 12,
                    marginBottom: 4,
                },
                tabBarStyle:{
                    height: 65,
                },
            }}
            
        >
            <Tab.Screen name="CoundownDay" component={CoundownDay}
                options={{ tabBarLabel: 'Coundown',
                tabBarIcon:({ color }) => (
                    <Image
                        source={require('../resources/labelIcon/home.png')}
                        style={[labelStyles.icon, {tintColor:color}]}
                    />
                ),
                }}
            >
            </Tab.Screen>

            <Tab.Screen name="SelfStudyRoom" component={SelfStudyRoom}
                options={{ tabBarLabel: 'Self-Study',
                tabBarIcon:({ color }) => (
                    <Image
                        source={require('../resources/labelIcon/alarm.png')}
                        style={[labelStyles.icon, {tintColor:color}]}
                    />
                ),
                }}
            />

            <Tab.Screen name="MoralEducation"
                options={{ tabBarLabel: 'Statistics',
                tabBarIcon:({ color }) => (
                    <Image
                        source={require('../resources/labelIcon/statistics.png')}
                        style={[labelStyles.icon, {tintColor:color}]}
                    />
                ),
                }}
            >
                {() => (
                        <Stack.Navigator>
                            <Stack.Screen name="Statistics" component={MoralEducationStatistics}  options={{ headerShown: false }}/>
                            <Stack.Screen name="AddScore" component={AddScore}  options={{ headerShown: false }}/>
                            <Stack.Screen name="AddVolunteer" component={AddVolunteer}  options={{ headerShown: false }}/>
                            <Stack.Screen name="Addevent" component={Addenvent}  options={{ headerShown: false }}/>
                        </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen name="PersonalCenter" component={PersonalCenter}
                options={{ tabBarLabel: 'Center',
                tabBarIcon:({ color }) => (
                    <Image
                        source={require('../resources/labelIcon/setting.png')}
                        style={[labelStyles.icon, {tintColor:color}]}
                    />
                ),
                }}
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default Router