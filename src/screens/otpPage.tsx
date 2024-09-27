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
  View,
  Image,
  TouchableOpacity,
  // Button
} from "react-native";
import { horizontalScale, verticalScale } from "../constants/metrices";
import { loginicon } from "../constants/icons";
import OTPTextView from 'react-native-otp-textinput';
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useDispatch } from "react-redux";
import { VerifyHandler } from "../store/reducers/verify";
import { unwrapResult } from '@reduxjs/toolkit';
import Toast from 'react-native-simple-toast';
import { resendNum } from "../services/changeNumber";

let timer = () => { };

const OtpPage = ({ route }) => {

  const mobile = route.params;
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState<any>(1);
  const [seconds, setSeconds] = useState<any>(59);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const containerStyle = {
    fontFamily: "Lexend-Regular",
    borderBottomWidth: 3,
    width: horizontalScale(40),
    marginTop: verticalScale(9)
  }

  const Resend = async () => {
    let dataChange = await resendNum().then((originalPromiseResult) => {
      console.log(originalPromiseResult);
      if (originalPromiseResult.status === "200") {
        Toast.show(
          originalPromiseResult.message,
          Toast.LONG,
        );
        setMinutes(1);
        setSeconds(59);
      }
      else if (originalPromiseResult.status === "400") {
        console.log("orginal", originalPromiseResult)
        Toast.show(
          originalPromiseResult.message,
          Toast.SHORT,
        );
      }
      else {
        Toast.show(
          "something went Wrong please try again later",
          Toast.SHORT,
        );
      }
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleSubmit = () => {
    const Data = {
      "otp": otp,
    }

    if (otp.length > 3) {
      dispatch(VerifyHandler(Data)).then(unwrapResult)
        .then((originalPromiseResult) => {
          // console.log("successfully returned to login with response ", originalPromiseResult);
          if (originalPromiseResult.message === "User Verified Successfully") {
            const param = originalPromiseResult.data;
            Toast.show(originalPromiseResult.message, Toast.LONG, { backgroundColor: 'red' });
            navigation.navigate("login")
          }
          else if (originalPromiseResult.message === "OTP has been Expired.Please resend the otp and try again.") {
            Toast.show(originalPromiseResult.message, Toast.LONG, { backgroundColor: 'red' });
          } else {
            Toast.show("Invalid OTP", Toast.LONG, { backgroundColor: 'red' });
          }
        })
    }
  }
  return (
    <SafeAreaView style={{ width: "100%", height: "100%", backgroundColor: "#f1f1f1" }}>
      <StatusBar
        animated={true}
        backgroundColor="#0a0127"
      />
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
        <Text style={{ fontSize: RFValue(26), color: "black", textAlign: "center", fontFamily: "Lexend-SemiBold", marginTop: verticalScale(14) }}>Confirm OTP</Text>
        <View style={{ alignItems: "center" }}>
          <Text style={{ width: horizontalScale(300), textAlign: "justify", fontSize: RFValue(12), color: "black", marginTop: verticalScale(27), fontFamily: "Lexend-Regular" }}>
            Please  enter  the  verification  code  that  we  have  sent  to  the  mobile  number +91 {mobile.value}
          </Text>
          <OTPTextView
            textInputStyle={containerStyle}
            inputCount={4}
            inputCellLength={1}
            tintColor={"#0a0127"}
            handleTextChange={(text) => { setOtp(text) }}
          />
          <View style={{ flexDirection: "row", marginTop: "2%", alignSelf: "center" }}>
            {seconds > 0 || minutes > 0 ? (
              <Text style={{ color: "black", fontFamily: "Lexend-Regular", fontSize: RFValue(13) }}>Time Remaining : {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            ) : (
              <TouchableOpacity >
                <Text style={{ color: "#E70736", fontFamily: "Lexend-Regular", fontSize: RFValue(13), marginTop: 6 }} onPress={() => { Resend() }}>Resend</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity style={{ alignSelf: "center", marginTop: "8%", borderWidth: 1, borderRadius: 8, width: horizontalScale(223), padding: "4%" }} onPress={() => { handleSubmit() }}>
          <Text style={{ textAlign: "center", fontSize: RFValue(16), fontFamily: "Lexend-SemiBold", color: "black" }}>Verify</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: "7%", alignSelf: "center", paddingBottom: verticalScale(52) }}>
          <TouchableOpacity onPress={() => navigation.navigate("ChangeMobileNumber")} style={{ flexDirection: "column" }}>
            <Text style={{ color: "#E70736", fontFamily: "Lexend-Regular", fontSize: RFValue(13) }}>Change Mobile Number</Text></TouchableOpacity>
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
    flexDirection: "row"
  },
  subdivTwo: {
    width: horizontalScale(330),
    // height: verticalScale(382),
    backgroundColor: "white",
    bottom: verticalScale(85),
    alignSelf: "center",
    borderRadius: 25
  }
})
export default OtpPage;