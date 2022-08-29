import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, FlatList } from'react-native';

const TaskScreen = ({navigation}) => {
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
                <ScrollView>
                    <TouchableOpacity
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
                                width: '75%',
                            }}
                        >
                            <View 
                                style={{
                                    flexDirection: 'column',
                                }}
                            >
                                <Text 
                                    style={{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        marginBottom: 5,
                                    }}
                                >
                                    Pengerjaan UI/UX Mobile Apps
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 8,
                                        color: '#000000',
                                        marginBottom: 10,
                                    }}
                                >
                                    Pembuatan desain UI/UX untuk aplikasi mobile absensi yang meliputi fitur home, task, scan barcode, inbox dan profile
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 10,
                                        color: '#D3D3D3',
                                    }}
                                >
                                    15 Agt 2022. 12:00:00
                                </Text>
                            </View>
                            <View 
                                style={{
                                    justifyContent: 'center',
                                }}
                            >
                                <Text 
                                    style={{
                                        color: '#28A745', 
                                        fontFamily: 'Poppins-Semibold', 
                                        fontSize: 14, 
                                        fontWeight: 'bold',
                                        padding: 25,
                                    }}
                                >
                                    Success
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
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
                                width: '75%',
                            }}
                        >
                            <View 
                                style={{
                                    flexDirection: 'column',
                                }}
                            >
                                <Text 
                                    style={{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        marginBottom: 5,
                                    }}
                                >
                                    Pengerjaan UI/UX Mobile Apps
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 8,
                                        color: '#000000',
                                        marginBottom: 10,
                                    }}
                                >
                                    Pembuatan desain UI/UX untuk aplikasi mobile absensi yang meliputi fitur home, task, scan barcode, inbox dan profile
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 10,
                                        color: '#D3D3D3',
                                    }}
                                >
                                    15 Agt 2022. 12:00:00
                                </Text>
                            </View>
                            <View 
                                style={{
                                    justifyContent: 'center',
                                }}
                            >
                                <Text 
                                    style={{
                                        color: '#28A745', 
                                        fontFamily: 'Poppins-Semibold', 
                                        fontSize: 14, 
                                        fontWeight: 'bold',
                                        padding: 25,
                                    }}
                                >
                                    Success
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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