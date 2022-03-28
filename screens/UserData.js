import React, { useEffect } from "react";
import { Alert, Text, TouchableWithoutFeedback, Share, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { __handleStatusUpdate } from '../service/Firebase';

// import CountDown from 'react-native-countdown-component';

export default function UserData({ navigation }) {

    // For later use
    // const [showPIN, setShowPIN] = React.useState(false);
    // const [userPIN, setUserPIN] = React.useState("013370");
    const [id, setID] = React.useState("");

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
            {/* <Text style={styles.timerTitle}>Status delete: </Text> */}

            {/* {showCounter && <CountDown
                until={countdownTimestamp}
                onFinish={() => alert('finished')}
                onPress={() => alert('hello')}
                size={20}
            />} */}


            {/* <Button
                style={styles.button}
                icon="account-convert-outline"
                mode="contained"
                onPress={() => {
                    navigation.navigate('Send status')
                }}>
                update status
            </Button> */}

            <Text>Your ID: {id}</Text>
            <Text style={styles.note}>Only share your ID with trusted people</Text>

            <Button
                style={styles.button}
                icon="share-variant"
                mode="contained"
                onPress={() => {
                    onShare()
                }}>
                share my id
            </Button>

            {/* TODO: LATER USE. PROTECT STATUS UPDATE WITHOUT PIN */}

            {/* {!showPIN && <View style={styles.horizontalView}>
                <Text>Your PIN: ******</Text>
                <TouchableWithoutFeedback onPress={() => setShowPIN(!showPIN)}>
                    <Text style={styles.link}> - show -</Text>
                </TouchableWithoutFeedback>
            </View>} */}

            {/* {showPIN && <View style={styles.horizontalView}>
                <Text>Your PIN: {userPIN}</Text>
                <TouchableWithoutFeedback onPress={() => setShowPIN(!showPIN)}>
                    <Text style={styles.link}> - hide -</Text>
                </TouchableWithoutFeedback>
            </View>}

            <Text style={styles.note}>Don't share your Pin with anyone</Text> */}

            {/* TODO: MAKE PIN EDITABLE */}
            {/* <Button
                style={styles.button}
                icon="form-textbox-password"
                mode="contained"
                onPress={() => {
                    alert('EDIT YOUR PIN NOW')
                }}>
                change pin
            </Button> */}

            {/* TODO: DELETE .>> DEVELOPMENT ONLY */}
            {/* <Button
                icon="refresh"
                mode="contained"
                onPress={() => {
                    getData()
                }}>
                refresh
            </Button> */}
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
        justifyContent: 'space-between',
    },
    link: {
        color: 'blue',
    },
    button: {
        marginTop: 10,
        marginBottom: 20,
    },
    note: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    countdown: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timerTitle: {
        fontSize: 16,
        textAlign: 'center',
    },
});
