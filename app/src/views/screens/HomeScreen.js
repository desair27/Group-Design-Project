import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { View } from 'react-native';
import MapView from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';

import styles from '../../styles';

const HomeScreen = () => {
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

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                // initialRegion={position}
                initialRegion={{
                    latitude: 53.34366745,
                    longitude: -6.254444724511822,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            />
        </View>
    );
};

export default HomeScreen;