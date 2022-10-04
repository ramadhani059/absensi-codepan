import React, { useContext, useEffect, Component } from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from'react-native';

import { AuthContext } from "../Context/AuthContext";

const HomeScreen = ({navigation}) => {
    const {userInfo} = useContext(AuthContext);

    useEffect(() => {
      console.log(userInfo);

      return () => {};
    }, []);

    return(
      <View style={styles.container}>
      <View>
          <View
              style={{
                  backgroundColor: '#2196F3',
                  height: 115,
              }} 
          >
          </View>
          <View style={{ paddingHorizontal: '6%', marginTop: -85}}>
            <Text numberOfLines={1} style={styles.title}>Selamat Datang, {userInfo.user.name}</Text>
            <View style={styles.boxFinancial}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image 
                    source={require('../../assets/icons/money.png')}
                    resizeMode="contain"
                    style={{
                      width: 40,
                      height: 40,
                      marginRight: 20,
                      tintColor: '#2196F3',
                    }}
                  />
                  <Text numberOfLines={1} style={styles.nominalFinancial}>
                    Rp. 10.000.000
                  </Text>
                </View>
                <TouchableOpacity>
                  <Image 
                    source={require('../../assets/icons/next.png')}
                    resizeMode="contain"
                    style={{
                      width: 40,
                      height: 40,
                      marginRight: 20,
                      tintColor: '#2196F3',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: 'yellow' }}>
            <Text>
              Rekap Absensi Bulan Ini
            </Text>
          </View>
          <View>
            <Text>
              Attendance Employees
            </Text>
          </View>
          <ScrollView
              refreshControl={
                  <RefreshControl 
                  />
              }
          >
          </ScrollView>
      </View>
  </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F0F1F5',
  },
  title:{
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  boxFinancial:{
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    height: 80,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5
  },
  nominalFinancial:{
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: '#2196F3',
    marginTop: 5,
    width: '73%'
  }
});