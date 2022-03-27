import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import __handleGetStatus from '../service/Firebase';

// ONLY FOR DEVELOPMENT
// const clearAll = async () => {
//     try {
//         await AsyncStorage.clear()
//         console.log('Local Storage deleted.')
//     } catch (e) {
//         // clear error
//     }
// }




export default function AreYouAlive() {

    const [id, setID] = React.useState("");




    return (
        <View style={styles.container}>

            <Text>Check the status of a friend or familymember</Text>

            <TextInput
                label="Enter ID"
                value={id}
                onChangeText={id => setID(id)}
            />

            <Button icon="account-question-outline" mode="contained" onPress={() => {
                __handleGetStatus(id)
                setID("")
            }}>
                Are you alive?
            </Button>
            {/* <Button icon="account-question-outline" mode="contained" onPress={() => clearAll()}>
                delete local storage
            </Button> */}

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
