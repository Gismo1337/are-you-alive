import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
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

            <Text style={styles.title}>Enter the ID of your buddy. Good luck.</Text>

            <TextInput
                label="Enter ID"
                value={id}
                onChangeText={id => setID(id)}
            />

            <Button
                style={styles.button}
                icon="account-question-outline"
                mode="contained"
                onPress={() => {
                    if (id.length === 36) {
                        __handleGetStatus(id)
                        setID("")
                    } else {
                        alert("Ooops... Please enter a valid ID.")
                    }

                }}>
                Check status
            </Button>

            {/* FOR DEVELOPMENT ONLY */}
            {/* <Button
                style={styles.button}
                icon="account-question-outline"
                mode="contained"
                onPress={() => clearAll()}>
                delete local storage
            </Button> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    title: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    horizontalView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginTop: 10,
    },
});
