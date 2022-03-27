import React, { useEffect } from "react";
import { Alert, Text, Share, StyleSheet, View } from 'react-native';
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { __handleStatusUpdate } from '../service/Firebase';
import uuid from 'react-native-uuid';

export default function UserData() {

    const [id, setID] = React.useState("");

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
                console.log('keine id vorhanden - warnung und dann routing auf send status')
            }
        } catch (e) {
            // error reading value
        }
    }

    // load the user id from local storage on first visit
    useEffect(() => {
        getData()
    }, [])


    const onShare = async () => {
        try {
            const result = await Share.share({
                message: id,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


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

            <Button
                icon="share-variant"
                mode="contained"
                onPress={() => {
                    onShare()
                }}>
                share my id
            </Button>

            <Button
                icon="form-textbox-password"
                mode="contained"
                onPress={() => {
                    alert('EDIT YOUR PIN NOW')
                }}>
                change pin
            </Button>

            {/* TODO: DELETE .>> DEVELOPMENT ONLY */}
            <Button
                icon="refresh"
                mode="contained"
                onPress={() => {

                    getData()


                }}>
                refresh
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
