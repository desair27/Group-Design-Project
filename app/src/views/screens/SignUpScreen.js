import 'react-native-gesture-handler';
import React from 'react';

import { SafeAreaView, View, Text, TextInput, Image, Pressable, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../constants/color';
import styles from '../../styles';

import{getAuth, createUserWithEmailAndPassword} from "firebase/auth";
const auth = getAuth
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const RegisterUser = ()=>{
    createUserWithEmailAndPassword(auth,email,password)
}
const SignUpScreen = ({ navigation }) => {
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

                    {/* FULL NAME */}
                    <View style={styles.inputContainer}>
                        <Icon
                            name='person-outline'
                            color={colors.light}
                            size={20}
                            style={styles.inputIcon}
                        />
                        <TextInput placeholder='Full Name' style={styles.input} />
                    </View>

                    {/* EMAIL */}
                    <View style={styles.inputContainer}>
                        <Icon
                            name='mail-outline'
                            color={colors.light}
                            size={20}
                            style={styles.inputIcon}
                        />
                        <TextInput 
                        placeholder='Email' 
                        value={email} 
                        onChangeText={text=>setEmail(text)} 
                        style={styles.input} />
                    </View>

                    {/* PASSWORD */}
                    <View style={styles.inputContainer}>
                        <Icon
                            name='lock-outline'
                            color={colors.light}
                            size={20}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder='Password'
                            value={password} 
                            onChangeText={text=>setPassword(text)} 
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    {/* CONFIRM PASSWORD */}
                    <View style={styles.inputContainer}>
                        <Icon
                            name='lock-outline'
                            color={colors.light}
                            size={20}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            placeholder='Confirm Password'
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    {/* REGISTER BUTTON */}
                    <View>
                        <Pressable style={styles.button} onPress={RegisterUser} >
                            <Text style={styles.text} >{'Register'}</Text >
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
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                Register with
                            </Text>
                            <Image
                                style={styles.btnImage}
                                source={require('../../assets/facebook.png')}
                            />
                        </View>
                        <View style={{ width: 10 }}></View>
                        <View style={styles.btnSecondary}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                Register with
                            </Text>
                            <Image
                                style={styles.btnImage}
                                source={require('../../assets/google.png')}
                            />
                        </View>
                    </View>
                </View>

                {/* ALREADY HAVE AN ACCOUNT? */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginTop: 40,
                        marginBottom: 20,
                    }}>

                    <Text style={{ color: colors.light, fontWeight: 'bold' }}>
                        Already have an account?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={{ color: colors.pink, fontWeight: 'bold' }}>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUpScreen;
