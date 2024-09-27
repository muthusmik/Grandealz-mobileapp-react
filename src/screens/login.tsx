import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  // CheckBox,
  useColorScheme,
  TextInput,
  Keyboard,
  Pressable,
  View,
  Image,
  Alert,
  BackHandler,
  TouchableOpacity,
  // Button
} from "react-native";
// import {useBackHandler} from '@react-native-community/hooks';
import { Icon } from "react-native-vector-icons/Icon";
import { horizontalScale, verticalScale } from "../constants/metrices";
import { loginicon } from "../constants/icons";
// import InputBox from 'react-native-floating-label-inputbox';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { loginHanlder } from "../store/reducers/login";
import useForm from "./Auth/useForm";
import validate from "./Auth/validate";
import { unwrapResult } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageController from "../services/storagectrl";
import LoaderKit from 'react-native-loader-kit';
import Toast from 'react-native-simple-toast';

function handleBackButton() {
  // if (screen === 'Login') {
  console.log("BackHandler Function");
  BackHandler.exitApp();
  return true;
  // }
}
const Login = (props: Prop) => {

  const navigation = useNavigation();
  let screen = "Login";
  const storage = StorageController
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState("true");
  const [loader, setLoader] = useState<any>(false)
  const [isSelected, setSelection] = useState<any>(true);
  //const { handleChange, details, handleSubmit, formErrors, data, formValues ,syncvalue} = useForm(validate);
  const [token, setToken] = useState<any>("");
  const [errorLogin, setErrorLogin] = useState<any>(null);
  const [errorEmail, setErrorEmail] = useState<any>(null);
  const [errorPassword, setErrorPassword] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);
  const [password, setPassword] = useState<any>(null);
  const [error, setError] = useState<any>("");

  useEffect(() => {
    async function fetchJSONAsync() {
      let name = await AsyncStorage.getItem("username");
      setEmail(name)
      let pass = await AsyncStorage.getItem("password");
      setPassword(pass)
      console.log(name, pass, "password user name", email, password)
    }
    fetchJSONAsync()
  }, [])

  const validateFunction = () => {
    let errorCount = 0;
    // console.log("satrday", (!/^[a-zA-Z0-9!@#$%^&*]{0,10}$/.test(password)));
    if (!email) {
      setErrorEmail('Please enter email')
      errorCount++;
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrorEmail('Please enter valid email')
      errorCount++;
    }
    else {
      setErrorEmail("");
    }
    if (!password) {
      setErrorPassword("Please enter password");
      errorCount++;
    }
    else if (!/^[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password)) {
      setErrorPassword("Passwords must be longer than or equal to 8 characters");
      errorCount++;
    }
    else {
      setErrorPassword("")
    }
    if (errorCount === 0) {
      setErrorEmail(""), setErrorPassword("");
      return true;
    }
    else {
      return false;
    }
  }

  useEffect(() => {
    navigation.addListener("blur", () => { BackHandler.removeEventListener("hardwareBackPress", handleBackButton); })
    navigation.addListener("focus", () => { BackHandler.addEventListener("hardwareBackPress", handleBackButton); })
  }, [handleBackButton])

  const loginPress = async () => {
    console.log("e dataaaaaaaaaa", email, password);
    handleSubmit(), Keyboard.dismiss
  }

  const handleSubmit = async () => {
    const validateLetter = validateFunction();
    console.log("Retrun.............", validateLetter);

    if (validateLetter) {
      const reg = {
        "email": email.toLowerCase(),
        "password": password,
        "fcm_id": ""
      }
      setLoader(true)
      console.log("data inside the handle submit", reg);
      dispatch(loginHanlder(reg))
        .then(unwrapResult)
        .then(async (originalPromiseResult: any) => {
          console.log("successfully returned to login with response ", originalPromiseResult);
          if (originalPromiseResult?.data?.access_token) {
            console.log("Successfully logged in with access_token and roles........", originalPromiseResult.data.access_token, "..........", originalPromiseResult.data.user.roles);
            await AsyncStorage.setItem('loginToken', originalPromiseResult.data.access_token)
            // let userDetails = JSON.parse(originalPromiseResult)
            await AsyncStorage.setItem('userDetails', JSON.stringify(originalPromiseResult))
            // console.log("JsonStringify............", JSON.stringify(originalPromiseResult));
            Toast.show("Successfully logged as grandealz", Toast.LONG, { backgroundColor: 'red' });
            if (isSelected === true) {
              await AsyncStorage.setItem('username', email),
                await AsyncStorage.setItem('password', password)
            }
            else {
              await AsyncStorage.setItem('username', ""),
                await AsyncStorage.setItem('password', "")
            }
            setLoader(false)
            props.navigation.replace("Tabs")

          }
          else if (originalPromiseResult.message) {
            setLoader(false)
            //setPassword("")
            Toast.show(
              originalPromiseResult.message,
              Toast.LONG,
            )
          }
          else {
            // console.log("setError response ", originalPromiseResult);
            //setPassword("")
            setLoader(false)
            Toast.show(
              originalPromiseResult,
              Toast.LONG,
            )
            //  setErrorLogin(originalPromiseResult.message);
          }
        }).catch((rejectedValueOrSerializedError) => {
          console.log(" Inside catch", rejectedValueOrSerializedError);
          Toast.show(
            "Something went wrong!, please try again later",
            Toast.LONG,
          )
        })
    }
  }
  const handlePasswordBox = () => {
    // console.log("box pass")
    if (errorEmail) {
      setEmail(""), setErrorEmail("");
    }
    else if (errorPassword) {
      setPassword(""), setErrorPassword("");
    }
  }
  return (
    <SafeAreaView style={{ width: "100%", height: "100%", backgroundColor: "#f1f1f1" }}>
      <StatusBar
        animated={true}
        backgroundColor="#0a0127"
      />
      <View style={styles.subdivOne}>
        <View style={{ flexDirection: "column", marginTop: verticalScale(45) }}>
          <Image
            source={loginicon}
            resizeMode='contain'
            style={{
              height: verticalScale(150),
              width: horizontalScale(130),
            }}
          />
        </View>
      </View>
      <View style={styles.subdivTwo}>
        <Text style={{ fontSize: RFValue(26), color: "black", textAlign: "center", fontFamily: "Lexend-SemiBold", marginTop: verticalScale(16) }}>Log In</Text>
        <TouchableOpacity style={{ alignSelf: "center", flexDirection: "row", borderWidth: 1, paddingHorizontal: 10, borderRadius: 8, borderColor: (errorEmail) ? "red" : "#c4c4c2", width: horizontalScale(300), marginTop: verticalScale(40), justifyContent: "space-between" }}
          onPressIn={() => handlePasswordBox()}>
          <TextInput
            placeholder="Email"
            value={email}
            placeholderTextColor={"black"}
            keyboardType="email-address"
            maxLength={30}
            //onChangeText={e => { handleChange(e, "email"), setErrorEmail(""), setErrorLogin(""), setEmail(e) }}
            onChangeText={(text) => { setEmail(text), setErrorEmail("") }}
            style={{
              flexDirection: "column",
              width: horizontalScale(220),
              ...FONTS.lexendregular,
              fontSize: RFValue(14),
              color: (errorEmail) ? "red" : "black"
            }}
          />
          <Fontisto name='email' size={30} style={{ alignSelf: "center", color: COLORS.gray }} />
        </TouchableOpacity>

        <View style={{ height: "5%" }}>
          {errorEmail ?
            <Text style={styles.ErrorText}>{errorEmail}</Text> : null}
        </View>

        <TouchableOpacity style={{ alignSelf: "center", flexDirection: "row", borderWidth: 1, paddingHorizontal: 10, borderRadius: 8, borderColor: (errorPassword) ? "red" : "#c4c4c2", width: horizontalScale(300), justifyContent: "space-between" }} onPressIn={() => handlePasswordBox()} >
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry={passShow ? true : false}
            placeholderTextColor={"black"}
            maxLength={15}
            //onChangeText={e => { handleChange(e, "password"), setErrorPassword(""), setErrorLogin(""), setPassword(e) }}
            onChangeText={(text) => { setPassword(text), setErrorPassword("") }}
            style={{
              flexDirection: "column",
              width: horizontalScale(220),
              ...FONTS.lexendregular,
              fontSize: RFValue(14),
              color: (errorPassword) ? "red" : "black"
            }}
          />
          <TouchableOpacity style={{ alignSelf: "center", flexDirection: "column" }} onPress={() => setPassShow(!passShow)}>
            {passShow ? <Ionicons name="eye-outline" size={30} style={{ color: COLORS.gray }} /> :
              <Ionicons name='eye-off-outline' size={30} style={{ color: COLORS.gray }} />
            }
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={{ height: "6%" }}>
          {errorPassword ? <Text style={styles.ErrorText}>{errorPassword}</Text> : null}
          {errorLogin ? <Text style={styles.ErrorText}>{errorLogin}</Text> : null}
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: "5%" }}>
          <View style={{ display: 'flex', flexDirection: "column", marginStart: "1.5%" }}>
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkBox}
                tintColors={{ true: COLORS.element }}
              />
              <Text style={{ color: "#E70736", fontFamily: "Lexend-Regular", flexDirection: "column", alignSelf: "center", fontSize: RFValue(12) }}>Remember Me</Text>
            </View>
          </View>
          <TouchableOpacity style={{ display: 'flex', flexDirection: "column", marginEnd: "2.5%" }} onPressIn={() => navigation.navigate("ForgetPassword")}><Text style={{ color: "#E70736", fontFamily: "Lexend-Regular", fontSize: RFValue(12) }}>Forgot Password?</Text></TouchableOpacity>
        </View>
        {loader ?
          <View style={{ width: "100%", alignItems: "center" }}>
            <LoaderKit
              style={{ width: 50, height: 50 }}
              name={'BallPulse'} // Optional: see list of animations below
              size={30} // Required on iOS
              color={COLORS.element} // Optional: color can be: 'red', 'green',... or '#ddd', '#FFFFFF',
            />
          </View>
          :
          <TouchableOpacity style={{ alignSelf: "center", marginTop: "8%", borderWidth: 1, borderRadius: 8, width: horizontalScale(193), padding: "3%" }} onPress={e => { loginPress() }} disabled={false}>
            <Text style={{ textAlign: "center", fontSize: RFValue(16), fontFamily: "Lexend-SemiBold", color: "black" }}>Log In</Text>
          </TouchableOpacity>
        }
        <View style={{ flexDirection: "row", marginTop: "10%", alignSelf: "center" }}>
          <Text style={{ flexDirection: "column", fontFamily: "Lexend-Regular", color: "#000", fontSize: RFValue(13) }}>New User? </Text>
          <TouchableOpacity style={{ flexDirection: "column" }} onPressIn={() => navigation.navigate("Signup")}><Text style={{ color: "#E70736", fontFamily: "Lexend-Regular", fontSize: RFValue(13) }}>Create New Account</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  subdivOne: {
    width: horizontalScale(375),
    height: verticalScale(300),
    backgroundColor: "#0a0127",
    alignItems: "center",
  },
  subdivTwo: {
    width: horizontalScale(342),
    height: verticalScale(440),
    backgroundColor: "white",
    bottom: verticalScale(85),
    alignSelf: "center",
    borderRadius: 25
  },
  checkBox: {
    alignSelf: "center",
    flexDirection: "column",
    borderRadius: 25
  },
  ErrorText: {
    color: "red",
    ...FONTS.lexendregular,
    fontSize: RFValue(10),
    marginStart: "7%"
  }
})
export default Login;
