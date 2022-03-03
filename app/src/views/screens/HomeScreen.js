import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';

import 'react-native-gesture-handler';

import styles from '../../styles';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapViewDirections from 'react-native-maps-directions';

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = "LOCATION_TASK"
let foregroundSubscription = null

// const API_KEY = process.env.PLACES_API_KEY
// const API_URL = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&libraries=places"

// console.log(API_URL)

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
        console.error(error)
        return
    }
    if (data) {
        // Extract location coordinates from data
        const { locations } = data
        const location = locations[0]
        if (location) {
            console.log("Location in background", location.coords)
        }
    }
})

/* ERROR WITH THE API KEY */

const HomeScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // Define position state: {latitude: number, longitude: number}
    const [position, setPosition] = useState(null)

    // Request permissions right after starting the app
    useEffect(() => {
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync()
            if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
        }
        requestPermissions()
    }, [])

    useEffect(() => {
        const startForegroundUpdate = async () => {
        // Check if foreground permission is granted
            const { granted } = await Location.getForegroundPermissionsAsync()
                if (!granted) {
                    console.log("location tracking denied")
                    return
                }

                 // Make sure that foreground location tracking is not running
                foregroundSubscription?.remove()

                // Start watching position in real-time
                foregroundSubscription = await Location.watchPositionAsync(
                {
                    // For better logs, we set the accuracy to the most sensitive option
                    accuracy: Location.Accuracy.BestForNavigation,
                },
                location => {
                    setPosition(location.coords)
                }
            )
        }
        startForegroundUpdate()
    }, [])

    useEffect(() => {
        const startBackgroundUpdate = async () => {
            // Don't track position if permission is not granted
            const { granted } = await Location.getBackgroundPermissionsAsync()
            if (!granted) {
                console.log("location tracking denied")
                return
            }
    
            // Make sure the task is defined otherwise do not start tracking
            const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
            if (!isTaskDefined) {
                console.log("Task is not defined")
                return
            }
    
            // Don't track if it is already running in background
            const hasStarted = await Location.hasStartedLocationUpdatesAsync(
                LOCATION_TASK_NAME
            )
            if (hasStarted) {
                console.log("Already started")
                return
            }
    
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                // For better logs, we set the accuracy to the most sensitive option
                accuracy: Location.Accuracy.BestForNavigation,
                // Make sure to enable this notification if you want to consistently track in the background
                showsBackgroundLocationIndicator: true,
                foregroundService: {
                    notificationTitle: "Location",
                    notificationBody: "Location tracking in background",
                    notificationColor: "#fff",
                },
            })
        }
        startBackgroundUpdate()
    
    }, [])

    // Stop location tracking in foreground
    const stopForegroundUpdate = () => {
        foregroundSubscription?.remove()
        setPosition(null)
    }

    // Stop location tracking in background
    const stopBackgroundUpdate = async () => {
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TASK_NAME
        )
        if (hasStarted) {
            await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
            console.log("Location tacking stopped")
        }
    }

    const [coordinates] = useState([
        {
            latitude: 53.332412,
            longitude: -6.270177,
        },
        {
            latitude: 53.333725,
            longitude: -6.269514,
        },
    ]);

    return (
        <View style={styles.container}>

            {/* const { location } = this.state; */}

            <MapView
                style={styles.map}

                initialRegion={{

                    latitude: position?.latitude,
                    longitude: position?.longitude,
                    //     //     //latitude: 53.34366745,
                    //     //     //longitude: -6.254444724511822,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={"AIzaSyC8ZxFH_dJPCPfhiEcDWOZHms5Frh-bU6E"}
                    strokeWidth={4}
                    strokeColor="#111111"
                />
            </MapView>

            <TextInput placeholder='Search here' style={styles.search} />
            <Icon
                name='location-pin'
                color={'#000'}
                size={25}
                style={styles.searchIcon}
            />
        </View>
    );
};

export default HomeScreen;