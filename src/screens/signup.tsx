import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  // CheckBox,
  useColorScheme,
  TextInput,
  View,
  Image,
  Keyboard,
  TouchableOpacity,
  Pressable,
  // Button
} from "react-native";
import { horizontalScale, verticalScale } from "../constants/metrices";
import { Button } from 'react-native-paper';
import { unwrapResult } from '@reduxjs/toolkit';
import { loginicon } from "../constants/icons";
// import InputBox from 'react-native-floating-label-inputbox';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import { RFValue } from "react-native-responsive-fontsize";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { COLORS, FONTS } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { registerHandler } from "../store/reducers/register";
import useForm from "./Auth/useForm";
import validate from "./Auth/validate";
import { countryList } from "../services/countryList";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoaderKit from 'react-native-loader-kit';
import Toast from 'react-native-simple-toast';

export interface SignupProps {

}

const Signup = (props: SignupProps) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  //const { handleChange, handleSubmit, formErrors, data, formValues } = useForm(validate);

  const [firstName, setFirstName] = useState<any>('');
  const [lastName, setLastName] = useState<any>('');
  const [email, setEmail] = useState<any>("");
  const [phone, setPhone] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [error, setError] = useState<any>("");
  const [errorFirst, setErrorFirst] = useState<any>(null);
  const [errorEmail, setErrorEmail] = useState<any>(null);
  const [errorPassword, setErrorPassword] = useState<any>(null);
  const [errorPhone, setErrorPhone] = useState<any>(null);
  const [errorLast, setErrorLast] = useState<any>(null);
  const [countryListValue, setCountryListValue] = useState<any>([])
  const [mblCode, setMblCode] = useState<any>("");
  const [isSelected, setSelection] = useState<any>(true);
  const [passShow, setPassShow] = useState<any>("true");
  const [loader, setLoader] = useState<any>(false);

  const agreeFail = () => {
    if (isSelected) {
      handleSubmit(), Keyboard.dismiss
    }
    else {
      Toast.show("Please Agree the terms and conditions", Toast.LONG, { backgroundColor: 'red' });
    }
  }

  const validateFunction = () => {
    console.log("values", firstName.length);
    let errorCount = 0;
    console.log("satrday", (/^[A-Za-z]+$/i.test(lastName)));

    if (!/^[A-Za-z]+$/i.test(firstName)) {
      setErrorFirst('Please enter maximum 15 characters for First Name (Minimum can be 2) as someone has name like Jo (alphabets only)')
      errorCount++
    }
    if (firstName.length < 3) {
      setErrorFirst("Please enter First Name")
      errorCount++;
    }
    if (!(/^[A-Za-z]+$/i.test(lastName))) {
      setErrorLast("Please enter maximum 15 characters for First Name (Minimum can be 2) as someone has name like Jo (alphabets only)")
      errorCount++
    }
    if (lastName.length < 3) {
      setErrorLast('Please enter Last Name')
      errorCount++;
    }
    if (email === "") {
      setErrorEmail('Please enter Email');
      errorCount++;
    }
    if (email !== undefined) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        setErrorEmail("Please enter valid Email");
        errorCount++;
      }
      if (email.length < 1) {
        setErrorEmail("Please enter Email");
        errorCount++;
      }
      else {
        setError("");
      }
    }
    if (email.length >= 7) {
      setErrorPassword("");
    }
    if (phone.length <= 9) {
      setErrorPhone('Please enter Phone Number')
      errorCount++;
    }
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone)) {
      setErrorPhone('Please enter Phone Number')
      errorCount++
    }
    if (password !== undefined) {

      if (password.length == 0) {
        setErrorPassword("Please enter password");
        errorCount++;
      } else if (!/^[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password)) {
        setErrorPassword("Passwords must be longer than or equal to 8 characters");
        errorCount++;
      }
      else if (password.length >= 7) {
        setErrorPassword("");
      }
    }
    if (errorCount === 0) {
      setErrorFirst(""), setErrorLast(""), setErrorEmail(""), setErrorPassword(""), setErrorPhone("");
      return true;
    }
    if (errorCount > 0) {
      if (firstName.length >= 3) {
        if (!firstName.includes(' ')) {
          if (/^[A-Za-z]+$/i.test(firstName)) {
            setErrorFirst("")
          }
        }
      }
      if (lastName.length >= 3) {
        if (!lastName.includes(' ')) {
          if (/^[A-Za-z]+$/i.test(lastName)) {
            setErrorLast("")
          }
        }
      }
      if (phone.length > 9) {
        if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone)) {
          setErrorPhone("");
        }
      }
      if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        setErrorEmail("");
      }
      else {
        console.log(errorCount, "error count")
      }
    }
    else {
      console.log(errorCount, "error count")
      return false;
    }
  }

  const handleSubmit = async () => {
    const validateLetter = validateFunction();
    console.log("Retrun.............", validateLetter);
    if (validateLetter) {
      setLoader(true);
      const reg = {
        "first_name": firstName.toLowerCase(),
        "last_name": lastName.toLowerCase(),
        "email": email.toLowerCase(),
        "phone": phone,
        "password": password,
        "country_phone_code": "+91",
        "term_and_condition": isSelected,
        "referralcode": "",
        "fcm_id": ""
      }
      console.log("data inside the handle submit", reg);
      dispatch(registerHandler(reg))
        .then(unwrapResult)
        .then(async (originalPromiseResult) => {
          console.log("im the register", originalPromiseResult.data.access_token)
          if (originalPromiseResult.status === "200") {
            await AsyncStorage.setItem('Signuptoken', originalPromiseResult.data.access_token);
            setLoader(false);
            Toast.show(originalPromiseResult.message, Toast.LONG, { backgroundColor: 'red' });
            navigation.navigate("OtpPage", { value: phone })
          }
          else if (originalPromiseResult.status === "400") {
            setLoader(false);
            console.log("im the error data", originalPromiseResult)
            Toast.show(originalPromiseResult.message, Toast.LONG, { backgroundColor: 'red' });
          }
          else if (originalPromiseResult.toString() === "404") {
            setLoader(false);
            Toast.show("something went wrong :)", Toast.LONG, { backgroundColor: 'red' });
          }
          else {
            setLoader(false);
            console.log(originalPromiseResult, "error");
            Toast.show("something went wrong :)", Toast.LONG, { backgroundColor: 'red' });
          }
        })
    }
  }


  const handleBox = () => {
    if (errorEmail) {
      setEmail(""),
        setEmail(""), setErrorEmail("");
    }
    else if (errorFirst) {
      setFirstName(""),
        setFirstName(""), setErrorFirst("");
    }
    else if (errorLast) {
      setLastName("")
      setLastName(""), setErrorLast("");
    }
    else if (errorPhone) {
      setPhone("")
      setPhone(""), setErrorPhone("");
    }
    else if (errorPassword) {
      setPassword("")
      setPassword(""), setErrorPassword("");
    }
  }
  const CheckBoxes = () => {
    const checkSelection = () => {
      setSelection(!isSelected)
    }
    return (
      <View style={{ flexDirection: "row", bottom: "8%", alignItems: "center" }}>
        <CheckBox
          value={isSelected}
          onValueChange={checkSelection}
          style={styles.checkBox}
          tintColors={{ true: COLORS.element }}
        />
        <View style={{ flexDirection: "column", width: "90%" }}>
          <Text style={{ fontFamily: "Lexend-Regular", color: "black", fontSize: RFValue(12) }}>I agree to <Text style={styles.underLineText}>Usage Terms</Text> and <Text style={styles.underLineText}>Privacy Policy</Text></Text>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ width: "100%", height: "100%", backgroundColor: "#f1f1f1" }}>
      <StatusBar
        animated={true}
        backgroundColor="#0a0127"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subdivOne}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: "column", marginTop: verticalScale(18), marginLeft: horizontalScale(18) }}>
            <EntypoIcons name="chevron-left" size={30} color={"white"} />
          </TouchableOpacity>
          <View style={{ flexDirection: "column", marginLeft: horizontalScale(78), marginTop: verticalScale(45) }}>
            <Image
              source={loginicon}
              resizeMode='contain'
              style={{
                height: verticalScale(150),
                width: horizontalScale(130)
              }}
            />
          </View>

          {/* <Text style={{ fontSize: 35, color: "white", fontFamily: "Lexend-Regular" }}>Grandealz</Text> */}
        </View>

        <View style={styles.subdivTwo}>

          <View style={{ paddingBottom: "1%" }}>
            <Text style={{ fontSize: RFValue(26), color: "black", textAlign: "center", marginTop: verticalScale(10), fontFamily: "Lexend-SemiBold" }}>Register</Text>
            <View style={{ alignSelf: "center" }}>
              <Pressable onPressIn={() => handleBox()}>
                <TextInput
                  placeholder="First Name"
                  // placeholderStyle={{ fontFamily: "Lexend-Regular" }}
                  value={firstName}
                  maxLength={20}
                  clearButtonMode="always"
                  placeholderTextColor={"black"}
                  onChangeText={(text) => setFirstName(text.replace(/ /g, ''))}
                  style={{ ...styles.textInput, ...{ marginTop: verticalScale(14) } }}
                />
              </Pressable>
              <View style={{ height: errorFirst ? "auto" : 14 }}>
                {errorFirst ?
                  <Text style={styles.ErrorText}>{errorFirst}</Text>
                  : null}
              </View>
              <Pressable onPressIn={() => handleBox()}>
                <TextInput
                  placeholder="Last Name"
                  value={lastName}
                  maxLength={20}
                  placeholderTextColor={"black"}
                  onChangeText={(text) => setLastName(text.replace(/ /g, ''))}
                  //onChangeText={e => { handleChange(e, "lastName"), setErrorLast(""), setLastName(e) }}
                  // onChangeText={(text) => { setLastName(text), text ? setError("") : setError(...errordata, errordata.lastname = "enter last name") }}
                  style={{ ...styles.textInput, }} />
              </Pressable>
              <View style={{ height: errorLast ? "auto" : 14 }}>
                {errorLast ?
                  <Text style={styles.ErrorText}>{errorLast}</Text> : null}
              </View>
              <Pressable onPressIn={() => handleBox()}>
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  value={email}
                  maxLength={30}
                  placeholderTextColor={"black"}
                  onChangeText={(text) => setEmail(text)}
                  //onChangeText={e => { handleChange(e, "email"), setErrorEmail(""), setEmail(e) }}
                  // onChangeText={(text) => { setEmail(text), text ? setError("") : setError([...errordata, errordata.email = "enter valid email"]) }}
                  style={{ ...styles.textInput, }} />

              </Pressable>
              <View style={{ height: errorEmail ? "auto" : 14 }}>
                {errorEmail ?
                  <Text style={styles.ErrorText}>{errorEmail}</Text> : null}
              </View>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholder="+91"
                  maxLength={3}
                  keyboardType="phone-pad"
                  placeholderTextColor={"black"}
                  style={{ ...styles.phone }}
                />
                <Pressable onPressIn={() => handleBox()}>
                  <TextInput
                    keyboardType={"phone-pad"}
                    placeholder="Phone"
                    value={phone}
                    maxLength={10}
                    onChangeText={(text) => setPhone(text)}
                    //onChangeText={e => { handleChange(e, "phone"), setErrorPhone(""), setPhone(e) }}
                    //onChangeText={(text) => { setPhone(text), text ? setError("") : setError(...errordata, errordata.phone = "enter phone number") }}
                    placeholderTextColor={"black"}
                    style={{ ...styles.pin, }}
                  />
                </Pressable>

              </View>
              <View style={{ height: errorPhone ? "auto" : 14 }}>
                {errorPhone ?
                  <Text style={styles.ErrorText}>{errorPhone}</Text> : null}
              </View>
              <TouchableOpacity style={{ alignSelf: "center", flexDirection: "row", borderWidth: 1, paddingStart: 10, borderRadius: 8, borderColor: "#c4c4c2", width: horizontalScale(300), color: "#000" }} onPressIn={() => handleBox()} >
                <TextInput
                  placeholder="Password"
                  value={password}
                  secureTextEntry={passShow ? true : false}
                  placeholderTextColor={"black"}
                  maxLength={15}
                  onChangeText={(text) => setPassword(text)}
                  style={{
                    flexDirection: "column",
                    width: horizontalScale(250),
                    ...FONTS.lexendregular,
                    fontSize: RFValue(14), color: "black"
                  }}
                //style={{ ...styles.textInput }}
                />
                <TouchableOpacity style={{ alignSelf: "center", flexDirection: "column" }} onPress={() => setPassShow(!passShow)}>
                  {passShow ? <Ionicons name="eye-outline" size={30} style={{ color: COLORS.gray }} /> :
                    <Ionicons name='eye-off-outline' size={30} style={{ color: COLORS.gray }} />
                  }
                </TouchableOpacity>
              </TouchableOpacity>

              <View style={{ height: errorPassword ? "auto" : 14 }}>
                {errorPassword ?
                  <Text style={styles.ErrorText}>{errorPassword}</Text> : null}
              </View>
            </View>
            <View style={{ alignSelf: "center", width: horizontalScale(300), marginTop: 22 }}>
              <CheckBoxes />
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
              <Button style={{ alignSelf: "center", borderWidth: 1, borderRadius: 8, width: horizontalScale(190), borderColor: "black" }}
                onPress={() => { agreeFail() }}>
                <Text style={{ textAlign: "center", fontSize: RFValue(16), fontFamily: "Lexend-SemiBold", color: "black" }}>Register</Text>
              </Button>
            }
            <View style={{ flexDirection: "row", marginTop: "2%", alignSelf: "center" }}>
              <Text style={{ flexDirection: "column", alignSelf: "flex-start", fontFamily: "Lexend-Regular", color: "black", fontSize: RFValue(13) }}>Existing User </Text>
              <TouchableOpacity style={{ alignSelf: "flex-end", flexDirection: "column" }} onPressIn={() => navigation.navigate("login")}><Text style={{ color: "#E70736", fontFamily: "Lexend-Regular", fontSize: RFValue(13) }}>Log in</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  subdivOne: {
    width: horizontalScale(375),
    height: verticalScale(300),
    backgroundColor: "#0a0127",
    flexDirection: "row"
  },
  subdivTwo: {
    width: horizontalScale(342),
    height: verticalScale(600),
    backgroundColor: "white",
    bottom: verticalScale(82),
    alignSelf: "center",
    borderRadius: 25
  },
  checkBox: {
    alignSelf: "center",
    flexDirection: "column",
  },
  underLineText: {
    color: "#E70736",
    textDecorationLine: "underline",
    fontFamily: "Lexend-Regular"
  },
  phone: {
    borderWidth: 1,
    flexDirection: "column",
    borderColor: "#c4c4c2",
    color: "black",
    paddingStart: 10,
    borderRadius: 8,
    width: horizontalScale(45),
    ...FONTS.lexendregular,
    fontSize: RFValue(14)
  },
  pin: {
    borderWidth: 1,
    paddingStart: 15,
    color: "black",
    borderColor: "#c4c4c2",
    flexDirection: "column",
    borderRadius: 8,
    width: horizontalScale(248),
    marginLeft: "2%",
    ...FONTS.lexendregular, fontSize: RFValue(14)
  },
  ErrorText: {
    color: "red",
    ...FONTS.lexendregular,
    fontSize: RFValue(8),
    marginStart: "1%",
    textAlign: "left",
    width: horizontalScale(300),
    marginBottom: 4
  },
  Errorpass: {
    color: "red",
    ...FONTS.lexendregular,
    fontSize: RFValue(10),
    textAlign: "center",
    width: horizontalScale(350)
  },
  textInput: {
    color: "black",
    borderWidth: 1,
    paddingStart: 15,
    borderColor: "#c4c4c2",
    borderRadius: 8,
    width: horizontalScale(300),
    ...FONTS.lexendregular,
    fontSize: RFValue(14)
  },
})
export default Signup;
