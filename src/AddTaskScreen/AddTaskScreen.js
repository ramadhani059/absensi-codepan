import React, { Component, useContext, useState } from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from'react-native';

import {useNavigation} from '@react-navigation/native';
import axios from "axios";
import { BASE_URL } from "../config";
import { AuthContext } from "../Context/AuthContext";

const AddTaskScreen = ({}) => {
    const {userInfo} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    const onBack = () => {
        navigation.navigate('Task');
    };

    const onPressAdd = () => {
        setIsLoading(true);
        
        axios
            .post(`${BASE_URL}/task/create/${userInfo.user.id}`, {
                name: title,
                detail: description,
            },{
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },)
            .then(res => {
                setIsLoading(false);
                navigation.navigate('Task');
            })
            .catch(e => {
                console.log('add task error ${e}');
                console.log(userInfo.user.id)
                setIsLoading(false);
            })
    };

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack}>
                <Image 
                    source={require('../../assets/icons/arrow.png')}
                    resizeMode="contain"
                    style={{
                        paddingHorizontal: 30,
                        marginTop: 30,
                        marginVertical: 30,
                        width: 23,
                        height: 23,
                        tintColor: 'black',
                    }}
                />
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={{
                        fontSize: 25,
                        fontFamily: 'Roboto-Bold',
                        color: 'black',
                        marginBottom: 30,
                    }}>
                        New Task
                    </Text>
                    <View style={{marginBottom: 25}}>
                        <Text style={{
                            fontSize: 15,
                            fontFamily: 'Roboto-Regular',
                            color: 'black',
                            marginBottom: -2,
                        }}>
                            Title
                        </Text>
                        <TextInput 
                            style={styles.title}
                            onChangeText={setTitle}
                            value={title}
                        />
                    </View>
                    <View style={{marginBottom: 30}}>
                        <Text style={{
                            fontSize: 15,
                            fontFamily: 'Roboto-Regular',
                            color: 'black',
                            marginBottom: -2,
                        }}>
                            Description
                        </Text>
                        <TextInput 
                            style={styles.description}
                            onChangeText={setDescription}
                            value={description}
                        />
                    </View>
                    {isLoading ? 
                        <>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#107FD8',
                                    padding: 20,
                                    marginTop: 15,
                                    marginBottom: 5,
                                    marginHorizontal: 40,
                                    height: 55,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{justifyContent: 'center'}}>
                                        <ActivityIndicator size="large" color="#FFFFFF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </>
                    : (
                        <>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#107FD8',
                                    padding: 20,
                                    marginTop: 15,
                                    marginBottom: 5,
                                    marginHorizontal: 40,
                                    height: 55,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={onPressAdd}
                            >
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <Image 
                                        source={require('../../assets/icons/add.png')}
                                        resizeMode="contain"
                                        style={{
                                            width: 13,
                                            height: 13,
                                            marginRight: 15,
                                            tintColor: 'white',
                                            marginTop: 2,
                                        }}
                                    />
                                    <Text 
                                        style={{
                                            fontFamily: 'Poppins-Bold',
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        CREATE NEW TASK
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

export default AddTaskScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    content:{
      paddingHorizontal: 40,
    //   backgroundColor: 'yellow'
    },
    title:{
        borderColor: 'black',
        height: 45,
        paddingHorizontal: 0,
        borderBottomWidth: 2,
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        color: '#000',
    },
    description:{
        borderColor: 'black',
        height: 45,
        paddingHorizontal: 0,
        borderBottomWidth: 2,
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#000',
    },
});