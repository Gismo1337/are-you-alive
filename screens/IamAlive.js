import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { __handleStatusUpdate } from '../service/Firebase';
import uuid from 'react-native-uuid';
import { FontAwesome5 } from '@expo/vector-icons';
import MotionDetection from "../components/MotionDetection.js";

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
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            // saving error
        }
    }

    // create a unique id for each user &
    function createID() {
        const userID = uuid.v4();
        // set key for locale storage
        const key = '@id';
        // use state userID
        setID(userID);
        // trigger local storage 
        storeData(key, userID);
    }

    // get user id from local storage
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@id')
            if (value !== null) {
                // Check if the user id is already stored in local storage
                // Store the user id in state
                setID(value)
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

            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View style={styles.statusIconsRow}>
                    <View style={styles.statusIcons}>

                        <Text>In trouble</Text>
                        <TouchableWithoutFeedback onPress={() => setValue("++")}>
                            <FontAwesome5 name='sad-cry' size={50} />
                        </TouchableWithoutFeedback>
                        <RadioButton value="++" />

                    </View>
                    <View style={styles.statusIcons}>
                        <Text>Got shelter</Text>
                        <TouchableWithoutFeedback onPress={() => setValue("+")}>
                            <FontAwesome5 name='frown' size={50} />
                        </TouchableWithoutFeedback>
                        <RadioButton value="+" />

                    </View>

                    <View style={styles.statusIcons}>
                        <Text>On my way</Text>
                        <TouchableWithoutFeedback onPress={() => setValue("-")}>
                            <FontAwesome5 name='meh' size={50} />
                        </TouchableWithoutFeedback>
                        <RadioButton value="-" />

                    </View>

                    <View style={styles.statusIcons}>
                        <Text>I'm save</Text>
                        <TouchableWithoutFeedback onPress={() => setValue("--")}>
                            <FontAwesome5 name='laugh' size={50} />
                        </TouchableWithoutFeedback>
                        <RadioButton value="--" />

                    </View>
                </View>
            </RadioButton.Group>

            <TextInput
                multiline
                numberOfLines={4}
                maxLength={255}
                maxHeight={110}
                label="Message"
                value={msg}
                onChangeText={msg => setMSG(msg)}
            />

            <Text style={styles.title}>Please be careful when sharing your location data while in a war zone.</Text>

            <View style={styles.horizontalView}>

                <Checkbox
                    status={locationAccepted ? 'checked' : 'unchecked'}
                    onPress={() => {
                        if (locationAccepted) {
                            setLocationAccepted(false)
                        } else {
                            Alert.alert('Terms of Use',
                                "We do not collect any personal, connection or location data. You are responsible for the content of the message.",
                                [
                                    {
                                        text: 'decline',
                                        onPress: () => setLocationAccepted(false),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Accept', onPress: () => {
                                            setLocationAccepted(true);
                                        }
                                    },
                                ]);
                        }

                    }}
                />
                <Text>I accept the </Text>

                {/* SHOW ALERT WITH THE TERMS OF USE */}
                <TouchableWithoutFeedback onPress={() => {
                    Alert.alert('Terms of Use',
                        "We do not collect any personal, connection or location data. You are responsible for the content of the message.",
                        [
                            {
                                text: 'decline',
                                onPress: () => setLocationAccepted(false),
                                style: 'cancel',
                            },
                            {
                                text: 'Accept', onPress: () => {
                                    setLocationAccepted(true);
                                }
                            },
                        ]);
                }}>
                    <Text style={styles.link}>Terms of Use </Text>
                </TouchableWithoutFeedback>
            </View>

            {/* FIXME: CHANGE CONDITIONAL RENDERING */}
            {
                locationAccepted ?
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
                    </Button>
            }

            <MotionDetection />

        </View >
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
    },
    statusIconsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    statusIcons: {
        alignItems: 'center',
    },
    title: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    link: {
        color: 'blue',
    }
});
