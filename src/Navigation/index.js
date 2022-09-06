import React, {useContext} from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";

// Screens
import LoginScreen from "../LoginScreen";
import HomeScreen from "../HomeScreen";
import TaskScreen from '../TaskScreen';
import AbsensiScreen from '../AbsensiScreen';
import MessageScreen from '../MessageScreen';
import AccountScreen from '../AccountScreen';
import SplashScreen from '../SplashScreen';

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from "../Context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity 
      style={{
        top: -35,
        justifyContent: 'center',
        alignItems: 'center',
        ... styles.shadow
      }}
      onPress={onPress}
    >
      <View style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#2196F3'
      }}>
        {children}
      </View>
    </TouchableOpacity>
);

const Navigation = () => {
    const {userInfo, splashLoading} = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {splashLoading ? (
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                ) : userInfo.token ? (
                    <>
                      <Stack.Screen name="Home" component={Tabs} />
                    </>
                ) : (
                    <>
                      {/* <Stack.Screen name="Home" component={Tabs} /> */}
                      <Stack.Screen name="Login" component={LoginScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    shadow: {
      shadowColor: '#2196F3',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5
    }
})

export default Navigation;

export function Tabs() {
    return (
        <Tab.Navigator 
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 0,
              backgrounColor: '#FFFFFF',
              borderRadius: 15,
              height: 90,
              ... styles.shadow
            },
            headerShown: false,
          }}
        >
          <Tab.Screen 
            name="HomeTab" 
            component={HomeScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 5, bottom: 5}}>
                  <Image 
                    source={require('../../assets/icons/home.png')}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      bottom: 5,
                      tintColor: focused ? '#2196F3' : '#000000',
                    }}
                  />
                  <Text style={{color: focused ? '#2196F3' : '#000000', fontSize: 10}}>Home</Text>
                </View>
              ),
            }} 
          />
          <Tab.Screen 
            name="Task" 
            component={TaskScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 5, bottom: 5}}>
                  <Image 
                    source={require('../../assets/icons/task.png')}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      bottom: 5,
                      tintColor: focused ? '#2196F3' : '#000000',
                    }}
                  />
                  <Text style={{color: focused ? '#2196F3' : '#000000', fontSize: 10}}>Task</Text>
                </View>
              ),
            }} 
          />
          <Tab.Screen 
            name="Absensi" 
            component={AbsensiScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <Image 
                  source={require('../../assets/icons/absensi.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#FFFFFF' : '#FFFFFF',
                  }}
                />
              ),
              tabBarButton: (props) => (
                <CustomTabBarButton { ...props } />
              )
            }}
          />
          <Tab.Screen 
            name="Message" 
            component={MessageScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 5, bottom: 5}}>
                  <Image 
                    source={require('../../assets/icons/message.png')}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      bottom: 5,
                      tintColor: focused ? '#2196F3' : '#000000',
                    }}
                  />
                  <Text style={{color: focused ? '#2196F3' : '#000000', fontSize: 10}}>Inbox</Text>
                </View>
              ),
            }} 
          />
          <Tab.Screen 
            name="Account" 
            component={AccountScreen} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 5, bottom: 5}}>
                  <Image 
                    source={require('../../assets/icons/account.png')}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      bottom: 5,
                      tintColor: focused ? '#2196F3' : '#000000',
                    }}
                  />
                  <Text style={{color: focused ? '#2196F3' : '#000000', fontSize: 10}}>Profile</Text>
                </View>
              ),
            }} 
          />
        </Tab.Navigator>
    );
};