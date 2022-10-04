import React, { Component, useState, useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Linking, Dimensions, Image, Alert, Modal, ActivityIndicator } from'react-native';

import moment from "moment/moment";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from 'react-native-camera';
import { BASE_URL } from "../config";
import { AuthContext } from "../Context/AuthContext";
import {useNavigation} from '@react-navigation/native';

let scanner;

const startScan = () => {
  if (scanner) {
    scanner._setScanning(false);
  }
}

const AbsensiScreen = () => {
    const {userInfo, hadir, check, isLoading, showHadir, showSudahAbsen, setSudahAbsen} = useContext(AuthContext);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [showWesAbsen, setShowWesAbsen] = useState(false);
    const [isLoadingHadir, setIsLoadingHadir] = useState(false);
    const [isLoadingPulang, setIsLoadingPulang] = useState(false);
    const [absensi, setAbsensi] = useState([]);

    const navigation = useNavigation();

    // Post Data Absensi
    const mlebu = async () => {
      try {
          setIsLoadingHadir(true);
          const response = await fetch(`${BASE_URL}/absensi/create/${userInfo.user.id}`, {
              method: 'POST',
              headers: {Authorization: `Bearer ${userInfo.token}`},
          })
          const json = await response.json();
          setAbsensi(json);
      } catch (error) {
          console.error(error);
      } finally {
          setIsLoadingHadir(false);
          setShowSuccess(true);
      }
    }

    const pulang = async () => {
      try {
        setIsLoadingPulang(true);
        const response = await fetch(`${BASE_URL}/absensi/update/${hadir[0].id}`, {
            method: 'PUT',
            headers: {Authorization: `Bearer ${userInfo.token}`},
        })
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingPulang(false);
        check();
      }
    }

    useEffect(() => {
        check();
        console.log(showSudahAbsen);

        return () => {};
    }, []);

    const onSuccess = (e) => {
        {e.data === 'codepan-studio-surabaya' ? 
            mlebu()
        : (
            setShowFailed(true)
        )}
    };

    const onfailed = () => {
      startScan();
      setShowFailed(false);
    }

    const backHome = () => {
      navigation.navigate('HomeTab');
      setSudahAbsen(false);
      check();
      console.log(showSudahAbsen);
    }

    const onSuccessButton = () => {
      check();
      setShowSuccess(false);
      backHome();
    }

    const onPulang = () => {
      pulang();
      backHome();
    }

    const onSudahAbsensi = () => {
      backHome();
    }

    return(
      <>
        {isLoading ?
          <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: '#2196F3' }}>
              <View style={{flex: 1, marginVertical: '70%'}}>
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            </View>
          </>
        : (
          <>
            {showHadir ? 
              <>
                <View style={{ 
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0D3C61',
                 }}>
                  <View style={{ flex: 1, marginVertical: '45%', }}>
                    <View style={styles.warning_modal}>
                      <View style={styles.warning_title_two_line}>
                        <Image 
                          source={require('../../assets/icons/information.png')}
                          resizeMode="contain"
                          style={{
                            width: 50,
                            height: 50,
                            tintColor: '#2196F3',
                          }}
                        />
                        <Text style={styles.text_main}>Do You Want To Go Home Now ?</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={() => onPulang()}>
                          <View style={styles.warning_button_one}>
                            <Text style={styles.text_button}>Yes</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => backHome()}>
                          <View style={styles.warning_button_two}>
                            <Text style={styles.text_button}>Cancel</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            : showSudahAbsen ? (
              <>
                <View style={{ 
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0D3C61',
                }}>
                  <View style={{ flex: 1, marginVertical: '45%', }}>
                    <View style={styles.warning_modal}>
                      <View style={styles.warning_title}>
                        <Image 
                          source={require('../../assets/icons/information.png')}
                          resizeMode="contain"
                          style={{
                            width: 50,
                            height: 50,
                            tintColor: '#2196F3',
                          }}
                        />
                        <Text style={styles.text_main}>Anda Sudah Absen Hari Ini !</Text>
                      </View>
                      <TouchableOpacity onPress={() => onSudahAbsensi()}>
                        <View style={styles.warning_button}>
                          <Text style={styles.text_button}>Okay</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={{flex: 1, width: Dimensions.get("window").width, backgroundColor: '#2196F3'}}>
                  <Modal
                    visible={showSuccess}
                    transparent
                    onRequestClose={() => setShowSuccess(false)}
                    animationType={'fade'}
                    hardwareAccelerated
                  >
                    <View style={styles.centered_view}>
                      <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                          <Image 
                            source={require('../../assets/icons/information.png')}
                            resizeMode="contain"
                            style={{
                              width: 50,
                              height: 50,
                              tintColor: '#2196F3',
                            }}
                          />
                          <Text style={styles.text_main}>Success Scan</Text>
                        </View>
                        <TouchableOpacity onPress={() => onSuccessButton()}>
                          <View style={styles.warning_button}>
                            <Text style={styles.text_button}>Okay</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                  <Modal
                    visible={showFailed}
                    transparent
                    onRequestClose={() => setShowFailed(false)}
                    animationType={'fade'}
                    hardwareAccelerated
                  >
                    <View style={styles.centered_view}>
                      <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                          <Image 
                            source={require('../../assets/icons/failed.png')}
                            resizeMode="contain"
                            style={{
                              width: 50,
                              height: 50,
                              tintColor: 'red',
                            }}
                          />
                          <Text style={styles.text_main_failed}>Failed Scan</Text>
                        </View>
                        <TouchableOpacity onPress={() => onfailed()}>
                          <View style={styles.warning_button_failed}>
                            <Text style={styles.text_button}>Try Again</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                  <View
                    style={{
                        backgroundColor: '#2196F3',
                        height: 115,
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
                      Scan QR Code
                    </Text>
                  </View>
                  <View style={{marginTop: '10%'}}>
                    <QRCodeScanner 
                      onRead={onSuccess}
                      // flashMode={RNCamera.Constants.FlashMode.torch}
                      cameraStyle={{ height: 400, width: 330, alignSelf: 'center'}}
                      ref={(camera) => scanner = camera}
                      showMarker={true}
                      customMarker={
                        <View>
                          <Image 
                            source={require('../../assets/icons/ios-qr-scanner.png')}
                            resizeMode="contain"
                            style={{
                              width: 250,
                              height: 250,
                              tintColor: 'white',
                              marginTop: 20,
                            }}
                          />
                        </View>
                      }
                    />
                  </View>
                  <View 
                    style={{
                      alignItems: 'center', 
                      top: '-4%', 
                    }}
                  >
                    <View 
                      style={{
                        backgroundColor:'transparent', 
                        height: 455, 
                        width: 345, 
                        borderRadius: 20, 
                        borderWidth: 12,
                        borderColor: '#2196F3'
                      }}
                    > 
                    </View>
                  </View>
                </View>
              </>
            )}
          </>
        )}
      </>
    );
}

export default AbsensiScreen;

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    },
    centered_view: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    warning_modal: {
      backgroundColor: 'white',
      height: 250,
      width: 310,
      borderRadius: 20,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    warning_title: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 55,
      marginBottom: 30,
    },
    warning_title_two_line: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 30,
    },
    warning_button: {
      backgroundColor: '#2196F3',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      borderBottomLeftRadius: 20, 
      borderBottomRightRadius: 20,
    },
    warning_button_one: {
      backgroundColor: '#2196F3',
      justifyContent: 'center',
      alignItems: 'center',
      width: 155,
      height: 60,
      borderBottomLeftRadius: 20,
    },
    warning_button_two: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: 155,
      height: 60,
      borderBottomRightRadius: 20,
    },
    warning_button_failed: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      borderBottomLeftRadius: 20, 
      borderBottomRightRadius: 20,
    },
    text_main: {
      fontFamily: 'Poppins-ExtraBold',
      fontSize: 25,
      fontWeight: 'bold',
      color: '#2196F3',
      marginTop: 15,
      textAlign: 'center',
    },

    text_secondary: {
      fontFamily: 'Poppins-Regular',
      fontSize: 15,
      color: '#2196F3',
      marginTop: 15,
    },
    text_main_failed: {
      fontFamily: 'Poppins-ExtraBold',
      fontSize: 25,
      fontWeight: 'bold',
      color: 'red',
      marginTop: 15,
    },
    text_button: {
      color: 'white',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 20,
    }
  });