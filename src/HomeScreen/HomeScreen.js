import React, { useContext, useEffect, Component } from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from'react-native';
import moment from "moment/moment";

import { AuthContext } from "../Context/AuthContext";

const HomeScreen = ({navigation}) => {
    const {absensiHarian, check, isLoading, isrefresh, userInfo} = useContext(AuthContext);

    useEffect(() => {
      check();
      console.log(absensiHarian);

      return () => {};
    }, []);

    const refresh = () => {
      check();
    }

    return(
      <View style={styles.container}>
      <ScrollView>
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
                        alignSelf: 'center',
                        tintColor: '#2196F3',
                      }}
                    />
                    <Text numberOfLines={1} style={styles.nominalFinancial}>
                      Rp. 10.000.000
                    </Text>
                  </View>
                  <TouchableOpacity style={{ alignSelf: 'center', }}>
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
            <View style={{ marginTop: 20, marginBottom: 20, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '6%', }}>
              <Text style={ styles.title_two }>
                Rekap Absensi Bulan Ini
              </Text>
              <View style={styles.boxAbsensi}>
                <View style={{ width: '25%', paddingHorizontal: 8, paddingVertical: 8, borderRightColor: '#DADADA', borderRightWidth: 1}}>
                  <Text style={styles.title_absensi}>HADIR</Text>
                  <Text 
                    style={{ 
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 13,
                      color: '#28A745',
                      marginBottom: 2,
                    }}
                  >
                    20 Hari
                  </Text>
                  <View 
                    style={{ 
                      width: '100%',
                      height: 8,
                      borderRadius: 20,
                      backgroundColor: '#28A745',
                    }}
                  >
                  </View>
                </View>
                <View style={{ width: '25%', paddingHorizontal: 8, paddingVertical: 8, borderRightColor: '#DADADA', borderRightWidth: 1 }}>
                  <Text style={styles.title_absensi}>ALFA</Text>
                  <Text 
                    style={{ 
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 13,
                      color: '#DC3545',
                      marginBottom: 2,
                    }}
                  >
                    1 Hari
                  </Text>
                  <View 
                    style={{ 
                      width: '100%',
                      height: 8,
                      borderRadius: 20,
                      backgroundColor: '#DC3545',
                    }}
                  >
                  </View>
                </View>
                <View style={{ width: '25%', paddingHorizontal: 8, paddingVertical: 8, borderRightColor: '#DADADA', borderRightWidth: 1 }}>
                  <Text style={styles.title_absensi}>SAKIT</Text>
                  <Text 
                    style={{ 
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 13,
                      color: '#2B27B0',
                      marginBottom: 2,
                    }}
                  >
                    3 Hari
                  </Text>
                  <View 
                    style={{ 
                      width: '100%',
                      height: 8,
                      borderRadius: 20,
                      backgroundColor: '#2B27B0',
                    }}
                  >
                  </View>
                </View>
                <View style={{ width: '25%', paddingHorizontal: 8, paddingVertical: 8 }}>
                  <Text numberOfLines={1} style={styles.title_absensi}>SISA CUTI</Text>
                  <Text 
                    style={{ 
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 13,
                      color: '#E2924B',
                      marginBottom: 2,
                    }}
                  >
                    12 Hari
                  </Text>
                  <View 
                    style={{ 
                      width: '90%',
                      height: 8,
                      borderRadius: 20,
                      backgroundColor: '#E2924B',
                    }}
                  >
                  </View>
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: '6%', marginTop: 5, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={ styles.button }>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <Image 
                      source={require('../../assets/icons/contact-form.png')}
                      resizeMode="contain"
                      style={{
                        width: 25,
                        height: 25,
                        marginRight: 20,
                        tintColor: '#2196F3',
                      }}
                    />
                    <Text style={styles.title_button}>Form Perizinan</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.button }>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <Image 
                      source={require('../../assets/icons/folder.png')}
                      resizeMode="contain"
                      style={{
                        width: 25,
                        height: 25,
                        marginRight: 20,
                        tintColor: '#2196F3',
                      }}
                    />
                    <Text style={styles.title_button}>Company Rules</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ paddingHorizontal: '6%', marginTop: 20, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={styles.title_two}>
                  Attendance Employees
                </Text>
                <Text 
                  style={{ 
                    fontFamily: 'Poppins-Bold',
                    fontSize: 14,
                    color: '#2196F3',
                    marginBottom: 10,
                 }}
                 onPress={() => refresh()}
                >
                  Refresh
                </Text>
              </View>
            </View>
            { isLoading ?
              <>
                <View style={{paddingVertical: 20, marginTop: 10}}>
                  <ActivityIndicator size="large" color="#2196F3" />
                </View>
              </>
            : (
              <>
                {absensiHarian == '' ?
                  <>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 35, }}>
                      <Image 
                        source={require('../../assets/icons/information.png')}
                        resizeMode="contain"
                        style={{
                          width: 50,
                          height: 50,
                          tintColor: '#2196F3',
                        }}
                      />
                      <Text style={{ color: '#2196F3', justifyContent: 'center', fontSize: 14, fontFamily: 'Roboto-Bold', alignSelf: 'center', marginTop: 15 }}>Belum Ada yang Absen Hari Ini !</Text>
                    </View>
                    
                  </>
                : (
                  <>
                    {absensiHarian.slice(0).reverse().map((absen, index) => (
                      <View key={index} source={absen}>
                        <View style={{ paddingHorizontal: '6%', marginBottom: 10,}}>
                          <View style={styles.boxListAbsensi}>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                              <View style={{ width: '16%' }}>
                                <Image 
                                  source={require('../../assets/icons/account-home.png')}
                                  resizeMode="contain"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    alignSelf: 'center',
                                    tintColor: '#2196F3',
                                  }}
                                />
                              </View>
                              {absen.user.karyawan == null ?
                                <>
                                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '45%', paddingHorizontal: 10,}}>
                                    <Text numberOfLines={1} style={styles.textName}>{absen.user.admin.nama_lengkap}</Text>
                                    <Text numberOfLines={1} style={styles.textJabatan}>{absen.user.admin.divisi}</Text>
                                  </View>
                                </>
                              : (
                                <>
                                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '45%', paddingHorizontal: 10,}}>
                                    <Text numberOfLines={1} style={styles.textName}>{absen.user.karyawan.nama_lengkap}</Text>
                                    <Text numberOfLines={1} style={styles.textJabatan}>{absen.user.karyawan.divisi}</Text>
                                  </View>
                                </>
                              )}
                              <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '39%', borderLeftColor: '#DADADA', borderLeftWidth: 1,  paddingHorizontal: 10, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%',}}>
                                  <View style={{ width: '60%' }}>
                                    <Text style={styles.textIn}>Check In</Text>
                                  </View>
                                  <View style={{ width: '10%' }}>
                                    <Text style={styles.textIn}>:</Text>
                                  </View>
                                  <View style={{ width: '30%' }}>
                                    <Text style={styles.textIn}>{ moment(absen.created_at).format('HH:mm') }</Text>
                                  </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{ width: '60%' }}>
                                    <Text style={styles.textOut}>Check Out</Text>
                                  </View>
                                  <View style={{ width: '10%' }}>
                                    <Text style={styles.textOut}>:</Text>
                                  </View>
                                  { absen.keluar == null ?
                                    <>
                                      <View style={{ width: '30%' }}>
                                        <Text style={styles.textOut}>-</Text>
                                      </View>
                                    </>
                                  : (
                                    <>
                                    <View style={{ width: '30%' }}>
                                      <Text style={styles.textOut}>{ moment(absen.updated_at).format('HH:mm') }</Text>
                                    </View>
                                    </>
                                  )}
                                  
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </>
                )}
              </>
            )}
            <View style={{height: 120}}></View>
        </View>
      </ScrollView>
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
    fontSize: 17,
    color: 'white',
    marginBottom: 10,
  },
  boxFinancial:{
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    alignSelf: 'center',
    color: '#2196F3',
    width: '73%'
  },
  title_two:{
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
  },
  boxAbsensi: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title_absensi: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: 'black',
    marginBottom: 2,
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '6%',
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
  title_button:{
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'black',
  },
  boxListAbsensi:{
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
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
  textName:{
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: 'black',
  },
  textJabatan:{
    fontFamily: 'Poppins-Reguler',
    fontSize: 12,
    color: 'black',
  },
  textIn:{
    fontFamily: 'Poppins-Reguler',
    fontSize: 12,
    color: 'green',
  },
  textOut:{
    fontFamily: 'Poppins-Reguler',
    fontSize: 12,
    color: 'red',
  }
});