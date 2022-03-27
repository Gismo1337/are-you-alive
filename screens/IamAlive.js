import React, { useEffect } from "react";
import { Alert, Text, StyleSheet, View } from 'react-native';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { __handleStatusUpdate } from '../service/Firebase';
import uuid from 'react-native-uuid';

export default function IamAlive() {
    // save the user message
    const [msg, setMSG] = React.useState("");
    // checkbox status of no location posting
    const [locationAccepted, setLocationAccepted] = React.useState(false);
    // radio button status of safety status
    const [value, setValue] = React.useState('first');
    // userID state
    const [id, setID] = React.useState("");

    // store user id in local storage
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@id', value);
        } catch (e) {
            // saving error
        }
    }

    // create a unique id for each user
    function createID() {
        const userID = uuid.v4();
        setID(userID);
        storeData(userID);
        console.log('UserID created: ' + userID);
    }

    // get user id from local storage
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@id')
            if (value !== null) {
                // Check if the user id is already stored in local storage
                // Store the user id in state
                setID(value)
                console.log(value);
            } else {
                // Create a new user id if not in local storage
                createID()
            }
        } catch (e) {
            // error reading value
        }
    }

    // load the user id from local storage on first start
    useEffect(() => {
        getData()
    }, [])


    return (

        <View style={styles.container}>
            <Text>BE CAREFUL WITH YOUR INFORMATION! NEVER SEND YOUR LOCATION IF YOUR ARE IN A WARZONE!</Text>
            <TextInput
                multiline
                numberOfLines={4}
                maxLength={255}
                maxHeight={110}
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
                <Text>I AGREE TO SEND MY DATA!</Text>
            </View>

            {/* FIXME: CHANGE CONDITIONAL RENDERING */}
            {locationAccepted ?
                <Button
                    icon="account-convert-outline"
                    mode="contained"
                    onPress={() => {

                        Alert.alert('Send status?', 'Status: ' + '\n' + value + '\n' + '\n' + 'Message: ' + '\n' + msg, [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () => {
                                    __handleStatusUpdate(id, msg, value)
                                    setMSG("")
                                }
                            },
                        ]);


                    }}>
                    Update status
                </Button> :
                <Button
                    disabled
                    icon="account-convert-outline"
                    mode="contained"
                >
                    Update status
                </Button>}


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    horizontalView: {
        flexDirection: 'row',
        alignItems: 'center',
    }

});
