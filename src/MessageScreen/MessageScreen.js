import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image } from'react-native';

const MessageScreen = ({navigation}) => {
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
                        Inbox
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
                                width: '85%',
                                justifyContent: 'space-between',
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
                                        marginBottom: 10,
                                    }}
                                >
                                    Judul
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
                                    Pembuatan desain UI/UX untuk aplikasi mobile absensi yang meliputi fitur home, task, scan barcode, inbox dan profile. Pembuatan desain UI/UX untuk aplikasi mobile absensi yang meliputi fitur home, task, scan barcode, inbox dan profile. Pembuatan desain UI/UX untuk aplikasi mobile absensi yang meliputi fitur home, task, scan barcode, inbox dan profile
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 12,
                                        color: '#9098B1',
                                    }}
                                >
                                    15 Agt 2022. 12:00:00
                                </Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 20}}>
                                <TouchableOpacity>
                                    <Image 
                                        source={require('../../assets/icons/delete.png')}
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            marginRight: 15,
                                            tintColor: '#FF2931',
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{height: 260}}></View>
                </ScrollView>
            </View>
        </View>
    );
}

export default MessageScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0F1F5',
    },
});