import 'react-native-gesture-handler';
import React from 'react';

import { SafeAreaView, View, Text, TextInput, Image, Pressable } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../constants/color';
import styles from '../../styles';

const SignInScreen = ({ navigation }) => {
    return (
        <SafeAreaView
            style={{ paddingVertical: 50, paddingHorizontal: 40, flex: 1, backgroundColor: colors.purple }}>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* LOGO */}
                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, color: colors.dark }}>
                        City
                    </Text>
                    <Text
                        style={{ fontWeight: 'bold', fontSize: 18, color: colors.secondary }}>
                        Explorer
                    </Text>
                </View>

                {/* INPUT FIELDS */}
                <View style={{ marginTop: 30 }}>
                    <View style={styles.inputContainer}>
                        <Icon
                            name='mail-outline'
                            color={colors.light}
                            size={20}
                            style={styles.inputIcon}
                        />
                        <TextInput placeholder='Email' style={styles.input} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon
                            name='lock-outline'
                            color={colors.light}
                            size={20}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    {/* LOGIN BUTTON */}
                    <View>
                        <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.text}>{'Login'}</Text>
                        </Pressable>
                    </View>

                    {/* - OR - */}
                    <View
                        style={{
                            marginVertical: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View style={styles.line}></View>
                        <Text style={{ marginVertical: 5, marginHorizontal: 10, fontWeight: 'bold' }}>OR</Text>
                        <View style={styles.line}></View>
                    </View>

                    {/* FB / GOOG OPTIONS */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>

                        <View style={styles.btnSecondary}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Sign in with
                            </Text>
                            <Image
                                style={styles.btnImage}
                                source={require('../../assets/facebook.png')}
                            />
                        </View>

                        <View style={{ width: 10 }}></View>
                        <View style={styles.btnSecondary}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Sign in with
                            </Text>
                            <Image
                                style={styles.btnImage}
                                source={require('../../assets/google.png')}
                            />
                        </View>
                    </View>

                </View>

                {/* YOU DONT HAVE AN ACCOUNT... */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginTop: 40,
                        marginBottom: 20,
                    }}>

                    <Text style={{ color: colors.light, fontWeight: 'bold' }}>
                        Don't have an account?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{ color: colors.pink, fontWeight: 'bold' }}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



export default SignInScreen;
