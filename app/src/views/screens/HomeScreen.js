import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';

import 'react-native-gesture-handler';

import styles from '../../styles';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps'

import * as Location from 'expo-location';
// import { GeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager';

// import { API_KEY } from "@env"

const API_KEY = "AIzaSyC_o3Sh_wasHqrHq8T-BTqCfJkDUjbO_jE"

//const GEOFENCING_TASK_NAME = "GEOFENCING_TASK"
const LOCATION_TASK_NAME = "LOCATION_TASK"
let foregroundSubscription = null

class Landmark{
    constructor(title, desc, lat, lng) {
        this.title = title;
        this.desc = desc;
        this.lat = lat;
        this.lng = lng;
        this.visited = false;
    }
}






// const API_KEY = process.env.PLACES_API_KEY
// const API_URL = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&libraries=places"

// console.log(API_URL)
let prevlat = []
let prevlong = []
let score = 0
let firstRun = 1
const HomeScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    /* An array of 2D arrays. Each 2D array has the coordinates for a specific
       route, split up into arrays of size 15 because 15 is the max number of
       waypoints in a route for react-native-maps*/
    const [seenRoads, setSeenRoads] = useState([[[
        /* {
            "latitude": 53.3432489,
            "longitude": -6.2685455,
        },
        { 
            "latitude": 53.3431980,
            "longitude": -6.2699195,
        } */
    ]]])
    const [routes, setRoutes] = useState([])
    // Define position state: {latitude: number, longitude: number}
    const [position, setPosition] = useState(null)

    
     
    const landmarks = [
        new Landmark('The Spire', 'Iconic steel sculpture in the centre of O\' Connell Street', 53.349722, -6.26), 
        new Landmark('Ha\'penny Bridge', 'Iconic bridge spanning the Liffey', 53.346111, -6.262778),
        new Landmark('Trinity College Dublin', 'Prestigious university in the city centre of Dublin', 53.3425, -6.252778),
        new Landmark('St Stephen\'s Green', 'Picturesque park in the heart of Dublin', 53.338056, -6.258889),
        new Landmark('Dáil Éireann', 'Seat of parliament for the Republic of Ireland', 53.339167, -6.253333),
        new Landmark('Dún Laoghaire Lexicon', 'Striking public library overlooking Dún Laoghaire harbour', 53.292778, -6.131667),
        new Landmark('University College Dublin', 'Dublin university touted as the cutting-edge of Irish research', 53.3075, -6.221944)
    ]
    landmarks[2].visited = "true"

   

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
                console.log(getDistance(
                    {latitude: location.coords.latitude,longitude: location.coords.longitude},
                    {latitude: prevlat,longitude: prevlong}
                ))
                if(firstRun == 1){
                    score = 0
                    firstRun = 0
                }
                else{
                    score = score + getDistance(
                        {latitude: location.coords.latitude,longitude: location.coords.longitude},
                        {latitude: prevlat,longitude: prevlong}
                    )
                }
                console.log("Total Score: ",score)


                if (!position) {
                    console.log("Initiating geolocation")
                    setPosition(location.coords)
                }
                else if (
                    (position.latitude - 0.00001 > location.coords.latitude || location.coords.latitude > position.latitude + 0.00001) &&
                    (position.longitude - 0.00001 > location.coords.longitude || location.coords.longitude > position.longitude + 0.00001)
                ) {
                    console.log("Setting new geolocation")
                    setPosition(location.coords)
                }
            }
            prevlat = location.coords.latitude
            prevlong = location.coords.longitude
        }
    })

    //TaskManager.defineTask(GEOFENCING_TASK_NAME, ({ data: { eventType, region }, error }) => {
        //if (error) {
          // check `error.message` for more details.
          //return;
        //}
        //if (eventType === GeofencingEventType.Enter) {
          //console.log("You've entered region:", region);
        //} else if (eventType === GeofencingEventType.Exit) {
          //console.log("You've left region:", region);
        //}
    //});

    

    useEffect(() => {
        console.log("Updating seenRoads")
        let seenRoadsCopy = seenRoads
        if (seenRoadsCopy && position) {

            let newCord = {
                latitude: position.latitude,
                longitude: position.longitude
            }

            // If there are no routes, create one
            if (seenRoadsCopy.length == 0) {
                seenRoadsCopy.push([]);
            }

            // Insert another segment if the the current segment has size >= 15
            let lastRoute = seenRoadsCopy[seenRoadsCopy.length - 1]
            let lastSegment = lastRoute[lastRoute.length - 1]
            if (lastSegment == 15) {
                // append the new segment
                let prevEnd = lastSegment[14]
                lastRoute.push([prevEnd, newCord])
            } else {
                // replace the last segment with this updated version
                lastSegment.push(newCord)
                lastRoute[lastRoute.length - 1] = lastSegment
            }

            // Append updated or new route coordinate
            seenRoadsCopy[seenRoads.length - 1] = lastRoute
            console.log("Updated seenRoads: ", seenRoadsCopy)
            setSeenRoads(seenRoadsCopy)
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

    // useEffect(() => {
        // var markers = [

        //]
    //}, [])
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

    const generateRoutes = () => {
        let result = []
        console.log("routes:", seenRoads)
        for (let route of seenRoads) {
            console.log("route:", route)
            for (let segment of route) {
/*                 // deal with the cases where segment has length < 3
                if(segment.length < 3) {
                    segment
                } */
                console.log("first:", segment[0])
                console.log("last:", segment[segment.length - 1])
                console.log("slice:", segment.slice(1,-1))
                result.push(
                    <MapViewDirections
                        origin={segment[0]}
                        destination={segment[segment.length - 1]}
                        waypoints={segment.slice(1)}
                        apikey={API_KEY}
                        strokeWidth={4}
                        strokeColor="#FF0000"/>
                    /* Running this gives the exact same object, but for some reason
                       this works whereas the above shows all coords apart from the last
                    <MapViewDirections
                        origin={{
                            "latitude": 53.3432483,
                            "longitude": -6.268545,
                          }}
                        destination={{
                            "latitude": 53.3431967,
                            "longitude": -6.2699183,
                          }} //DEMO
                        waypoints={segment.slice(1,-1)}
                        apikey={API_KEY}
                        strokeWidth={4}
                        strokeColor="#111111"/> */
                )
            }
        }
        console.log(result)
        return result
    }

    const generateMarkers= () => {
        let result = [
            // <Marker
            //     title = {'The Spire'}
            //     description = {'Iconic steel sculpture in the centre of O\' Connell Street'}
            //     pinColor = {'#0000FF'}
            //     coordinate = {{
            //         latitude: 53.349722,
            //         longitude: -6.26,
            //     }}
            //     flat = {true}
            // />,
            // <Marker
            //     title = {'Ha\'penny Bridge'}
            //     description = {'Iconic bridge spanning the Liffey'}
            //     pinColor = {'#0000FF'}
            //     coordinate = {{
            //         latitude: 53.346111,
            //         longitude: -6.262778,
            //     }}
            //     flat = {true}
            // />,
            // <Marker
            //     title = {'Trinity College Dublin'}
            //     description = {'Prestigious university in the city centre of Dublin'}
            //     pinColor = {'#0000FF'}
            //     coordinate = {{
            //         latitude: 53.3425,
            //         longitude: -6.252778,
            //     }}
            //     flat = {true}
            // />,
            // <Marker
            //     title = {'St Stephen\'s Green'}
            //     description = {'Picturesque park in the heart of Dublin'}
            //     pinColor = {'#0000FF'}
            //     coordinate = {{
            //         latitude: 53.338056,
            //         longitude: -6.258889,
            //     }}
            //     flat = {true}
            // />,
            // <Marker
            //     title = {'Dáil Éireann'}
            //     description = {'Seat of parliament for the Republic of Ireland'}
            //     pinColor = {'#0000FF'}
            //     coordinate = {{
            //         latitude: 53.339167,
            //         longitude: -6.253333,
            //     }}
            //     flat = {true}
            // />,
            // <Marker
            //     title = {'Dún Laoghaire Lexicon'}
            //     description = {'Striking public library overlooking Dún Laoghaire harbour'}
            //     pinColor = {'#0000FF'}
            //     coordinate = {{
            //         latitude: 53.292778,
            //         longitude: -6.131667,
            //     }}
            //     flat = {true}
            // />,
            // <Marker
            //     title = {'University College Dublin'}
            //     description = {'Dublin university touted as the cutting-edge of Irish research'}
            //     pinColor = {'#0000FF'}
            //     coordinate = {{
            //         latitude: 53.3075,
            //         longitude: -6.221944,
            //     }}
            //     flat = {true}
            // />
        ]
        for(let landmark in landmarks) {
            const pin_color = '#0000FF'
            if(landmarks[landmark].visited == "true") {
                pin_color = '#FF0000'
            }
            result.push(
                <Marker
                    title = {landmarks[landmark].title}
                    description = {landmarks[landmark].desc}
                    pinColor = {pin_color}
                    coordinate = {{
                        latitude: landmarks[landmark].lat,
                        longitude: landmarks[landmark].lng,
                    }}
                    flat = {true}
                />

            )

        }
        return result
    }

    return (
        position ?
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
                    {generateRoutes()}
                    {generateMarkers()}
                </MapView>

                <TextInput placeholder='Search here' style={styles.search} />
                <Icon
                    name='location-pin'
                    color={'#000'}
                    size={25}
                    style={styles.searchIcon}
                />
            </View>
            :
            <View style={styles.container} />
    );
};

export default HomeScreen;