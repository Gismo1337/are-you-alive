import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AreYouAlive() {
    const [id, setID] = React.useState("");
    const [locationAccepted, setLocationAccepted] = React.useState(false);
    const [value, setValue] = React.useState('first');

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                // value previously stored
                console.log(value);
            }
        } catch (e) {
            // error reading value
        }
    }

    const clearAll = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            // clear error
        }

        console.log('Done.')
    }


    return (
        <View style={styles.container}>


            <Text>{id}</Text>
            <Text>Check the status of a friend or familymember</Text>


            <TextInput
                label="Check Status"
                value={id}
                onChangeText={id => setID(id)}
            />



            <Button icon="account-question-outline" mode="contained" onPress={() => getData('keyhere')}>
                Are you alive?
            </Button>
            <Button icon="account-question-outline" mode="contained" onPress={() => clearAll()}>
                delete locat
            </Button>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    horizontalView: {
        flexDirection: 'row',
        alignItems: 'center',
    }

});
