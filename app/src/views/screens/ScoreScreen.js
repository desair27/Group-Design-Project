import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';

import styles from '../../styles';

const ScoreScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text> Hello Score </Text>
        </View>

    );
}

export default ScoreScreen
