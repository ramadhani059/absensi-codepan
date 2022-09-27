import React, { Component, useContext, useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image, ActivityIndicator, RefreshControl } from'react-native';

import moment from "moment/moment";
import {useNavigation} from '@react-navigation/native';
import { BASE_URL } from "../config";
import { AuthContext } from "../Context/AuthContext";

const TaskScreen = () => {
    const {userInfo} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isrefresh, setRefresh] = useState(false);
    const [listTask, setListTask] = useState([]);
    const navigation = useNavigation();

    // Get API Data
    const task = async () => {
        try {
            setIsLoading(true);
            setRefresh(true);
            const response = await fetch(`${BASE_URL}/task/index?user_id=${userInfo.user.id}`, {
                method: 'GET',
                headers: {Authorization: `Bearer ${userInfo.token}`},
            })
            const json = await response.json();
            setListTask(json.task_id);
            console.log(json.task_id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setRefresh(false)
        }
    }

    // Navigate
    const onPressAddTask = () => {
        navigation.navigate('Add Task');
    };

    useEffect(() => {
        task();

        return () => {};
    }, []);

    return(
        <View style={styles.container}>
            <View>
                <View
                    style={{
                        backgroundColor: '#2196F3',
                        padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} 
                >
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: 25,
                            fontFamily:'Roboto-Bold',
                            paddingVertical: 20,
                        }}
                    >
                        Task
                    </Text>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl 
                            refreshing={isrefresh}
                            onRefresh={task}
                        />
                    }
                >
                    {isLoading ?
                        <>
                            <View style={{paddingVertical: 20, marginTop: 10}}>
                                <ActivityIndicator size="large" color="#2196F3" />
                            </View>
                        </>
                    : (
                        <>
                            {listTask.slice(0).reverse().map((tugas,index) => (
                                <TouchableOpacity
                                    key={index}
                                    source={tugas}
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        padding: 15,
                                        marginTop: 15,
                                        marginBottom: 5,
                                        marginHorizontal: 20,
                                        borderRadius: 10,
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
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <View 
                                            style={{
                                                flexDirection: 'column',
                                                width: '80%',
                                            }}
                                        >
                                            <Text 
                                                style={{
                                                    fontFamily: 'Poppins-Bold',
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                    color: '#000000',
                                                    marginBottom: 10,
                                                }}
                                            >
                                                {tugas.name}
                                            </Text>
                                            <Text
                                                numberOfLines={2}
                                                style={{
                                                    fontFamily: 'Poppins-Regular',
                                                    fontSize: 12,
                                                    color: '#000000',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {tugas.detail}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Regular',
                                                    fontSize: 12,
                                                    color: '#9098B1',
                                                }}
                                            >
                                                {moment(tugas.updated_at).format('LLL')}
                                            </Text>
                                        </View>
                                        <View 
                                            style={{
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {tugas.statustask.nama.toUpperCase() === 'PROSES' ?
                                                <>
                                                    <Text 
                                                        style={{
                                                            color: '#28A745', 
                                                            fontFamily: 'Poppins-Semibold', 
                                                            fontSize: 14, 
                                                            fontWeight: 'bold',
                                                            
                                                        }}
                                                    >
                                                        {tugas.statustask.nama.toUpperCase()}
                                                    </Text>
                                                </>
                                            : (
                                                <>
                                                    <Text 
                                                        style={{
                                                            color: 'red', 
                                                            fontFamily: 'Poppins-Semibold', 
                                                            fontSize: 14, 
                                                            fontWeight: 'bold',
                                                            
                                                        }}
                                                    >
                                                        {tugas.statustask.nama.toUpperCase()}
                                                    </Text>
                                                </>
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            
                        </>
                    )}
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#107FD8',
                            padding: 20,
                            marginTop: 15,
                            marginBottom: 5,
                            marginHorizontal: 100,
                            height: 55,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={onPressAddTask}
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
                                ADD TASK
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{height: 260}}></View>
                </ScrollView>
            </View>
        </View>
    );
}

export default TaskScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#F0F1F5',
    },
});