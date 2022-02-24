import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, Pressable } from 'react-native';

//import { View } from 'react-native';
import MapView from 'react-native-maps';
import RNLocation from "react-native-location";

import styles from '../../styles';
const API_KEY = process.env.PLACES_API_KEY
const API_URL = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&libraries=places"

console.log(API_URL)
const HomeScreen = () => {

    RNLocation.configure({
        distanceFilter: 5.0
    })

    RNLocation.requestPermission({
        android:{
            detail: "coarse",
            rationale: {
                title: "Allow location access?",
                message: "CityExplorer uses your location to track your exploration progress. Please press Allow.",
                buttonPositive: "Allow",
                buttonNegative: "Do not allow"
            }
        }
    }).then(granted => {
        if (granted) {
            this._startUpdatingLocation();
        }
    })
    // const [position, setPosition] = useState({
    //     latitude: 10,
    //     longitude: 10,
    //     latitudeDelta: 0.001,
    //     longitudeDelta: 0.001,
    // });

    // useEffect(() => {
    //     Geolocation.getCurrentPosition((pos) => {
    //         const crd = pos.coords;
    //         setPosition({
    //             latitude: crd.latitude,
    //             longitude: crd.longitude,
    //             latitudeDelta: 0.0421,
    //             longitudeDelta: 0.0421,
    //         });
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }, []);

    
    _startUpdatingLocation = () => {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
            locations => {
                this.setState({ location: locations[0] });

        })
    }

    return (
        
        <View style={styles.container}>

            const { location } = this.state;

            <TextInput placeholder='Search Location' style={styles.input} />

            <MapView
                style={styles.map}
                
                // initialRegion={position}
                initialRegion={{

                    latitude: location.latitude,
                    longitude: location.longitude,
                    //latitude: 53.34366745,
                    //longitude: -6.254444724511822,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            />
        </View>
    );
};

export default HomeScreen;