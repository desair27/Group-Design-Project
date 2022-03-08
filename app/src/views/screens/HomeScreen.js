import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';

import 'react-native-gesture-handler';

import styles from '../../styles';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapViewDirections from 'react-native-maps-directions';

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

//import { API_KEY } from "@env"

const LOCATION_TASK_NAME = "LOCATION_TASK"
let foregroundSubscription = null

// const API_KEY = process.env.PLACES_API_KEY
// const API_URL = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&libraries=places"

// console.log(API_URL)

const HomeScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    /* An array of 2D arrays. Each 2D array has the coordinates for a specific
       route, split up into arrays of size 15 because 15 is the max number of
       waypoints in a route for react-native-maps*/ 
    const [seenRoads, setSeenRoads] = useState([[[]]])
    // Define position state: {latitude: number, longitude: number}
    const [position, setPosition] = useState(null)
   
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
                console.log("Location read in background: ", location.coords)
                if(!position) {
                    console.log("Current position state: ", position)
                    console.log("Initiating geolocation")
                    setPosition(location.coords)
                    console.log("Current position state: ", position)
                }
                else if(
                    (position.latitude - 0.00001 > location.coords.latitude || location.coords.latitude > position.latitude + 0.00001) && 
                    (position.longitude - 0.00001 > location.coords.longitude || location.coords.longitude > position.longitude + 0.00001)
                ){
                    console.log("Current position state: ", position)
                    console.log("Setting new geolocation")
                    setPosition(location.coords)
                    console.log("Current position state: ", position)
                    console.log("point reached")
                }
            }
        }
    })

    useEffect(() => {
        if(seenRoads){
          // If there are no routes, create one
          if(seenRoads.length == 0){
              seenRoads.push([]);
          }
  
          // Insert another segment if the the current segment has size >= 15
          let lastRoute =  seenRoads[seenRoads.length - 1]
          let lastSegment = lastRoute[lastRoute.length - 1]
          if(lastSegment >= 15) {
              lastRoute.push([position])
          } else {
              lastSegment.push(position)
              lastRoute.push(lastSegment)
          }
  
          // Append updated or new route coordinate
          seenRoads[seenRoads.length - 1] = lastRoute
        }
      }, [position])

    // Request permissions right after starting the app
    useEffect(() => {
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync()
            if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
        }
        requestPermissions()
    }, [])

/*     useEffect(() => {
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
                        console.log("Location: ",location.coords)
                        setPosition(location.coords)
                    }
                )
        }
        startForegroundUpdate()
    }, []) */

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

/*     // Stop location tracking in foreground
    const stopForegroundUpdate = () => {
        foregroundSubscription?.remove()
        setPosition(null)
    } */

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
            latitude: 53.396705,
            longitude: -6.260222,
        },
        {
            latitude: 53.344550,
            longitude: -6.251438,
        },
    ]);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: position?.latitude,
                    longitude: position?.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]} //DEMO
                    //destination={coordinates[coordinates.length() - 1]}
                    //waypoints={[position?.]}
                    apikey={""}
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