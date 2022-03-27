import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AreYouAlive() {
    const [id, setID] = React.useState("");


    // ONLY FOR DEVELOPMENT
    const clearAll = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            // clear error
        }

        console.log('Local Storage deleted.')
    }


    return (
        <View style={styles.container}>

            <Text>Check the status of a friend or familymember</Text>


            <TextInput
                label="Check Status"
                value={id}
                onChangeText={id => setID(id)}
            />



            <Button icon="account-question-outline" mode="contained" onPress={() => console.log('asd')}>
                Are you alive?
            </Button>
            <Button icon="account-question-outline" mode="contained" onPress={() => clearAll()}>
                delete local storage
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
