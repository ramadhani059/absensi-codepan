import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from'react-native';

const AccountScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text> Account Screen </Text>
            <Button 
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
}

export default AccountScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#8fcbbc',
    },
});