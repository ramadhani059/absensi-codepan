import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from'react-native';

import axios from "axios";

import { BASE_URL } from "../config";
import { AuthContext } from "../Context/AuthContext";

const AccountScreen = ({navigation}) => {
    const {userInfo, logout} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getAccount = () => {
        setIsLoading(true);
        axios
            .get(`${BASE_URL}/account/index/${userInfo.user.id}`, {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            })
            .then(res => res.data)
            .then(data => setUser(data))
            .catch(e => {
                console.log(`register error ${e}`);
            });
        setIsLoading(false);
    };

    useEffect(() => {
        getAccount();
        console.log(user);
    
        return () => {};
    }, []);

    return(
        <View style={styles.container}>
            <View 
                style={{
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    paddingTop: 40,
                    paddingBottom: 30,
                    paddingHorizontal: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                }}
            >
                <Image 
                    source={require('../../assets/gambar/akun.png')}
                    resizeMode="contain"
                    style={{
                        width: 75,
                        height: 75,
                        borderRadius: 100,
                    }}
                />
                <View style={{width: '58%', flexDirection: 'column'}}>
                    <Text numberOfLines={1} style={styles.bold}>{user.account.nama_lengkap}</Text>
                    <Text style={styles.regular}>UI/UX Designer</Text>
                </View>
                <TouchableOpacity>
                    <Image 
                        source={require('../../assets/icons/edit.png')}
                        resizeMode="contain"
                        style={{
                            width: 28,
                            height: 28,
                            tintColor: '#9098B1'
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#FFFFFF', paddingVertical: 20, marginBottom: 10}}>
                <View style={styles.section}>
                    <Image 
                        source={require('../../assets/icons/account.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: '#2196F3'
                        }}
                    />
                    <View style={{width: '30%', justifyContent: 'center'}}>
                        <Text style={styles.heading}>Username</Text>
                    </View>
                    <View style={{width: '55%', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Text style={styles.content}>@ramadhani059</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Image 
                        source={require('../../assets/icons/email.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: '#2196F3'
                        }}
                    />
                    <View style={{width: '25%', justifyContent: 'center'}}>
                        <Text style={styles.heading}>Email</Text>
                    </View>
                    <View style={{width: '60%', alignItems: 'flex-end'}}>
                        <Text numberOfLines={1} style={styles.content}>pratamaramadhani@gmail.com</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Image 
                        source={require('../../assets/icons/smartphone-call.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: '#2196F3'
                        }}
                    />
                    <View style={{width: '30%', justifyContent: 'center'}}>
                        <Text style={styles.heading}>Phone</Text>
                    </View>
                    <View style={{width: '55%', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Text style={styles.content}>+62 85815554360</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Image 
                        source={require('../../assets/icons/send.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: '#2196F3'
                        }}
                    />
                    <View style={{width: '30%', justifyContent: 'center'}}>
                        <Text style={styles.heading}>Position</Text>
                    </View>
                    <View style={{width: '55%', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Text numberOfLines={1} style={styles.content}>Internship</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Image 
                        source={require('../../assets/icons/pin.png')}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: '#2196F3'
                        }}
                    />
                    <View style={{width: '30%', justifyContent: 'center'}}>
                        <Text style={styles.heading}>Address</Text>
                    </View>
                    <View style={{width: '55%', alignItems: 'flex-end'}}>
                        <Text numberOfLines={1} style={styles.content}>Jalan Wagir Baru II No 4F Kwangsan Sedati Sidoarjo</Text>
                    </View>
                </View>
            </View>
            <View style={{backgroundColor: '#FFFFFF', paddingVertical: 20}}>
                <TouchableOpacity 
                    onPress={logout}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                >
                    <Text style={styles.logout}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AccountScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F0F1F5',
    },
    bold:{
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        color: "#223263",
        marginBottom: 5,
    },
    regular: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: "#9098B1",
    },
    section: {
        paddingHorizontal: 25,
        paddingVertical: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    heading:{
        paddingLeft: 5,
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: "#223263",
    },
    content:{
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: "#9098B1",
    },
    logout:{
        paddingLeft: 5,
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: "#FF2931",
    }
});