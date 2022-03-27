import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AreYouAlive from '../screens/AreYouAlive';
import IamAlive from '../screens/IamAlive';
import UserData from '../screens/UserData';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function Appnavigator() {
    return (
        <NavigationContainer>

            <PaperProvider>

                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let icon;
                            // TODO: Maybe later some different icons if active screen
                            if (route.name === 'Send status') {
                                icon = focused ? 'campaign' : 'campaign';
                            } else if (route.name === 'Are you alive?') {
                                icon = focused ? 'healing' : 'healing';
                            } else if (route.name === 'User') {
                                icon = focused ? 'accessibility' : 'accessibility';
                            }
                            return (<MaterialIcons name={icon} size={size} color={color} />);
                        },

                        tabBarHideOnKeyboard: true,
                    })}
                >
                    <Tab.Screen name="Send status" component={IamAlive} />
                    <Tab.Screen name="Are you alive?" component={AreYouAlive} />
                    <Tab.Screen name="User" component={UserData} />
                </Tab.Navigator>

            </PaperProvider>

        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});





