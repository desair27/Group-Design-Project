import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './app/src/views/screens/SignInScreen';
import SignUpScreen from './app/src/views/screens/SignUpScreen';
import HomeScreen from './app/src/views/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ header: () => null }}>
                <Stack.Screen name='SignIn' component={SignInScreen} />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}