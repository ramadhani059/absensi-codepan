import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from'react-native';

const AbsensiScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text> Absensi Screen </Text>
            <Button 
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
}

export default AbsensiScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#8fcbbc',
    },
});