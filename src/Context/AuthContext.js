import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {useState, createContext, useEffect} from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isrefresh, setRefresh] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [listTask, setListTask] = useState([]);
    const [absensiHarian, setAbsensiHarian] = useState([]);
    const [hadir, setHadir] = useState([]);
    const [showHadir, setShowHadir] = useState(false);
    const [showSudahAbsen, setSudahAbsen] = useState(false);

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

    const task = async () => {
      try {
          setIsLoading(true);
          setRefresh(true);
          const response = await fetch(`${BASE_URL}/task/index?user_id=${userInfo.user.id}`, {
              method: 'GET',
              headers: {Authorization: `Bearer ${userInfo.token}`},
          })
          const json = await response.json();
          setListTask(json.task_id);
      } catch (error) {
          console.error(error);
      } finally {
          setIsLoading(false);
          setRefresh(false)
      }
    }

    const check = async () => {
      try {
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}/absensi/index`, {
              method: 'GET',
              headers: {Authorization: `Bearer ${userInfo.token}`},
          })
          const json = await response.json();
          let dataAbsensiHarian = [...json.absensi]

          dataAbsensiHarian = dataAbsensiHarian.filter(x => x.tanggal == getCurrentDate());

          setAbsensiHarian(dataAbsensiHarian);
          console.log(dataAbsensiHarian);

          let getSudahAbsensi = [...dataAbsensiHarian]

          getSudahAbsensi = getSudahAbsensi.some((y) => y.user_id == userInfo.user.id && y.masuk != null);
          setSudahAbsen(getSudahAbsensi);
          // console.log(getSudahAbsensi)

          let hadir = [...dataAbsensiHarian]

          hadir = hadir.filter(z => z.user_id == userInfo.user.id && z.keluar == null);
          setHadir(hadir);
          // console.log(hadir);

          let getHadir = [...hadir]
          
          getHadir = getHadir.some((i) => i.keluar == null);
          setShowHadir(getHadir);

          // setListAbsensi(json.absensi);
          // console.log(json.absensi);
      } catch (error) {
          console.error(error);
      } finally {
          setIsLoading(false);
      }
    }

    const getCurrentDate = () => {
        var date = new Date().getDate() ;
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
  
        if (date < 10) {
          if (month < 10) {
            return year + '-0' + month + '-0' + date;
          } else {
            return year + '-' + month + '-0' + date;
          }
        } else {
          if (month < 10) {
            return year + '-0' + month + '-' + date;
          } else {
            return year + '-' + month + '-' + date;
          }
        }
    }

    // const getAbsensiHarian = () => {
    //     let dataAbsensiHarian = [...listAbsensi]

    //     dataAbsensiHarian = dataAbsensiHarian.filter(x => x.tanggal == getCurrentDate());

    //     setAbsensiHarian(dataAbsensiHarian);
    //     console.log(dataAbsensiHarian);
    // }

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
                isrefresh,
                listTask,
                absensiHarian,
                hadir,
                showHadir,
                showSudahAbsen,
                login,
                logout,
                task,
                check,
                setSudahAbsen,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};