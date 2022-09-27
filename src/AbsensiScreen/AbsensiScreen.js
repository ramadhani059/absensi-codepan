import React, { Component, useState, useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Linking, Dimensions, Image, Alert, Modal } from'react-native';

import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from 'react-native-camera';
import { BASE_URL } from "../config";
import { AuthContext } from "../Context/AuthContext";

let scanner;

const startScan = () => {
  if (scanner) {
    scanner._setScanning(false);
  }
}

const AbsensiScreen = ({navigation}) => {
    const {userInfo} = useContext(AuthContext);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [absensi, setAbsensi] = useState([]);
    const [listAbsensi, setListAbsensi] = useState([]);

    // Post Data Absensi
    const hadir = async () => {
      try {
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}/absensi/create/${userInfo.user.id}`, {
              method: 'POST',
              headers: {Authorization: `Bearer ${userInfo.token}`},
          })
          const json = await response.json();
          setListAbsensi(json);
          console.log(json);
      } catch (error) {
          console.error(error);
      } finally {
          setIsLoading(false);
          setShowSuccess(true);
      }
    }

    // Get Data
    const check = async () => {
      try {
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}/absensi/index`, {
              method: 'GET',
              headers: {Authorization: `Bearer ${userInfo.token}`},
          })
          const json = await response.json();
          setListAbsensi(json.absensi);
          console.log(json.absensi);
      } catch (error) {
          console.error(error);
      } finally {
          setIsLoading(false);
      }
    }

    useEffect(() => {
        check();

        return () => {};
    }, []);

    const onSuccess = (e) => {
        {e.data === 'codepan-studio-surabaya' ? 
            hadir()
        : (
            setShowFailed(true)
        )}
    };

    const onfailed = () => {
      startScan();
      setShowFailed(false);
    }

    return(
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
              <TouchableOpacity onPress={() => setShowSuccess(false)}>
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
      backgroundColor: '#00000099'
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
    warning_button: {
      backgroundColor: '#2196F3',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      borderBottomLeftRadius: 20, 
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