import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';

export default function AreYouAlive() {
    const [id, setID] = React.useState("");
    const [locationAccepted, setLocationAccepted] = React.useState(false);
    const [value, setValue] = React.useState('first');

    return (
        <View style={styles.container}>


            <Text>{id}</Text>
            <Text>Check the status of a friend or familymember</Text>


            <TextInput
                label="Check Status"
                value={id}
                onChangeText={id => setID(id)}
            />



            <Button icon="account-question-outline" mode="contained" onPress={() => console.log('Pressed')}>
                Are you alive?
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
