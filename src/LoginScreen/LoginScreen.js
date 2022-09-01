import React, { useContext, useState} from 'react';
import { AuthContext } from '../Context/AuthContext';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize, } from 'react-native-responsive-dimensions';

import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isLoading,login} = useContext(AuthContext);

    const navigation = useNavigation();

    const onSubmitPressed = () => {
        navigation.navigation('Home');
    };

    return(
        <ScrollView style={{backgroundColor: '#2196F3'}}>
            <View style={styles.container}>
                <Image 
                    source={require('../../assets/logo/logo-white.png')}
                    resizeMode="contain"
                    style={{
                        width: 330,
                        height: 100,
                        bottom: 50,
                    }}
                />
                <Text style={{color: '#FFFFFF', fontSize: 23, marginBottom: 25, fontFamily:'Roboto-Bold'}}> Login to Your Account </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <TouchableOpacity 
                    onPress={() => {
                        login(email, password);
                    }}
                    style={{
                        backgroundColor: '#FFFFFF',
                        width: '75%',
                        height: 55,
                        marginTop: 25,
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 30,
                    }}
                >
                    <Text 
                        style={{
                            textAlign:'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#3B5998',
                        }}
                    >
                        Sign In
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#FFFFFF',
                        marginTop: 20,
                        marginBottom: 25,
                        fontFamily: 'Roboto-Medium',
                        fontSize: 18,
                    }}
                >
                    Or sign in with : 
                </Text>
                <View 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#FFFFFF',
                            height: 55,
                            padding: 15,
                            marginHorizontal: 5,
                            paddingHorizontal: 32,
                            borderRadius: 10,
                            alignContent: 'center',
                            justifyContent: 'center',
                            shadowColor: '#000000',
                            shadowOffset: {
                                width: 0,
                                height: 10,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.5,
                            elevation: 5
                        }}
                    >
                        <Image 
                            source={require('../../assets/icons/google.png')}
                            resizeMode="contain"
                            style={{
                                width: 28,
                                height: 28,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#FFFFFF',
                            height: 55,
                            padding: 15,
                            marginHorizontal: 5,
                            paddingHorizontal: 30,
                            borderRadius: 10,
                            alignContent: 'center',
                            justifyContent: 'center',
                            shadowColor: '#000000',
                            shadowOffset: {
                                width: 0,
                                height: 10,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.5,
                            elevation: 5
                        }}
                    >
                        <Image 
                            source={require('../../assets/icons/facebook.png')}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: '#3B5998',
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#FFFFFF',
                            height: 55,
                            padding: 15,
                            marginHorizontal: 5,
                            paddingHorizontal: 30,
                            borderRadius: 10,
                            alignContent: 'center',
                            justifyContent: 'center',
                            shadowColor: '#000000',
                            shadowOffset: {
                                width: 0,
                                height: 10,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.5,
                            elevation: 5
                        }}
                    >
                        <Image 
                            source={require('../../assets/icons/github.png')}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2196F3',
      paddingTop: responsiveHeight(13),
      paddingVertical: responsiveHeight(5),
    },
    input:{
        width: '75%',
        height: 55,
        margin: 7,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
});