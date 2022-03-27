import React, { useEffect } from "react";
import { Text, StyleSheet, View } from 'react-native';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        const userID = Math.floor(Math.random() * 1000000000).toString();
        setID(userID);
        storeData(userID);
        console.log(userID);
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


    const handleStatusUpdate = async () => {
        try {
            // GET FIREBASE
            const value = await AsyncStorage.getItem('@id')
            // IF ID IN DATABASE
            if (value !== null) {
                // check PIN if OK >>
                //    save msg
                // save status
                // save location check
                // save timestamp
            } else {
                // SET ALL NEW
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
            {/* TODO: SHOW DYNAMIC DATA HOW MUCH FIRENDS ARE WAITING FOR AWNSER! */}
            <Text>1382 People your status</Text>
            {/* TODO: MAKE USER ID TO SOCIAL MEDIA SHARE! */}
            <Text>Your ID: {id}</Text>
            <Text>Share this ID with your friends and family</Text>
            {/* TODO: SHOW / HIDE THE PIN AREA */}
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

            <Button icon="account-convert-outline" mode="contained" onPress={() => storeData(msg)}>
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
