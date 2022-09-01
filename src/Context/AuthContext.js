import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {useState, createContext, useEffect} from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const test = {"message": "login berhasil", "token": "15|fx3ppguEpbJBGEbLC5eB3HhyxjydnfLBSk9Pe30m", "user": {"created_at": "2022-08-29T08:06:01.000000Z", "email": "admin1@gmail", "email_verified_at": null, "id": 1, "level_id": 1, "name": "admin1", "updated_at": "2022-08-29T08:06:01.000000Z"}}

    const login = (email, password) => {
        setIsLoading(true);

        axios
            .post(`${BASE_URL}/login`, {
                email,
                password,
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                console.log(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`login error ${e}`);
                setIsLoading(false);
            });
    };

    const logout = () => {
        setIsLoading(true);
    
        axios
          .get(`${BASE_URL}/logout`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
          })
          .then(res => {
            console.log(res.data);
            AsyncStorage.removeItem('userInfo');
            setUserInfo({});
            setIsLoading(false);
          })
          .catch(e => {
            console.log(`logout error ${e}`);
            setIsLoading(false);
          });
    };

    const isLoggedIn = async () => {
        try {
          setSplashLoading(true);
    
          let userInfo = await AsyncStorage.getItem('userInfo');
          userInfo = JSON.parse(userInfo);
    
          if (userInfo) {
            setUserInfo(userInfo);
          }
    
          setSplashLoading(false);
        } catch (e) {
          setSplashLoading(false);
          console.log(`is logged in error ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                splashLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};