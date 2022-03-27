import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AreYouAlive from '../screens/AreYouAlive';
import IamAlive from '../screens/IamAlive';


const Tab = createBottomTabNavigator();


export default function Appnavigator() {
    return (
        <NavigationContainer>
            <PaperProvider>
                <Tab.Navigator>
                    <Tab.Screen name="Are you alive?" component={AreYouAlive} />
                    <Tab.Screen name="Send status" component={IamAlive} />
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





