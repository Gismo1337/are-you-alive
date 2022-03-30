import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

let xSum = 0;
let xValue = 0;

function additionXValue(xValue, sum) {
    sum = xSum + xValue;
    xSum = sum;
    console.log('X Activity: ' + xSum)
}

export default function MotionDetection() {

    const [data, setData] = useState(Number);
    const [motionAvailable, setMotionAvailable] = useState(true);

    useEffect(() => {

        if (motionAvailable) {
            // listen to device motion interval in ms
            DeviceMotion.setUpdateInterval(2000)

            // add listener to device motion
            DeviceMotion.addListener((e) => {

                // device acceleration data as number with 0 decimals
                const accelerationValueX = e.acceleration.x.toFixed(0)

                // make acceleration data  always as positive number
                xValue = Math.abs(accelerationValueX)

                // add acceleration data to sum
                additionXValue(xValue)

                // set data to render in view
                setData(xSum)

            })

        }

    }, [motionAvailable])

    // return (
    //     <View style={styles.container}>

    //         <Text style={styles.text}>Activity: {data}</Text>

    //     </View>
    // );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
});
