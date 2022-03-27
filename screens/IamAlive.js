import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';

export default function IamAlive() {
    const [msg, setMSG] = React.useState("");
    const [locationAccepted, setLocationAccepted] = React.useState(false);
    const [value, setValue] = React.useState('first');

    return (
        <View style={styles.container}>
            <Text>1382 People your status</Text>
            <Text>Your ID: 19028348123</Text>
            <Text>Share this ID with your friends and family</Text>
            <Text>Your PIN: 312452</Text>
            <Text>NEVER SHARE THIS PIN!</Text>

            <TextInput
                label="Message"
                value={msg}
                onChangeText={msg => setMSG(msg)}
            />

            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View style={styles.horizontalView}>

                    <RadioButton value="++" />
                    <Text>I am safety for the next days</Text>
                </View>
                <View style={styles.horizontalView}>

                    <RadioButton value="+" />
                    <Text>I am safe for a while</Text>
                </View>

                <View style={styles.horizontalView}>

                    <RadioButton value="-" />
                    <Text>I am on my way to safety</Text>
                </View>

                <View style={styles.horizontalView}>

                    <RadioButton value="--" />
                    <Text>I am in trouble</Text>
                </View>
            </RadioButton.Group>


            <View style={styles.horizontalView}>
                <Checkbox
                    status={locationAccepted ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setLocationAccepted(!locationAccepted);
                    }}
                />
                <Text>I DO NOT POST MY LOCATION!</Text>
            </View>

            <Button icon="account-convert-outline" mode="contained" onPress={() => console.log('Pressed')}>
                Update status
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
