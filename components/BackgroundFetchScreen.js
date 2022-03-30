import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { DeviceMotion } from 'expo-sensors';



const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {

  let xSum = 0;
  let xValue = 0;

  function additionXValue(xValue, sum) {
    sum = xSum + xValue;
    xSum = sum;
    console.log('X Activity: ' + xSum)
  }
  // For testing purposes, we will just log a message
  const now = Date.now();
  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

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

  })

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 0.1, // 5 seconds
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function BackgroundFetchScreen() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>
          Background fetch status:{' '}
          <Text style={styles.boldText}>
            {status && BackgroundFetch.BackgroundFetchStatus[status]}
          </Text>
        </Text>
        <Text>
          Background fetch task name:{' '}
          <Text style={styles.boldText}>
            {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
          </Text>
        </Text>
      </View>
      <View style={styles.textContainer}></View>
      <Button
        title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        onPress={toggleFetchTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    margin: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

