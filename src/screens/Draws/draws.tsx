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
import { useNavigation } from "@react-navigation/native";
// import InputBox from 'react-native-floating-label-inputbox';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { horizontalScale, verticalScale } from "../../constants/metrices";
// import InputBox from 'react-native-floating-label-inputbox';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import icons from "../../constants/icons";
import { COLORS, FONTS } from "../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import DrawsHeader from "./drawsListHorizontal";
import LoaderKit from 'react-native-loader-kit';
import DrawsMain from "./drawsMain";
import { useDispatch } from "react-redux";
import { drawwinnersHandler } from "../../store/reducers/Drawwinner";
import { unwrapResult } from "@reduxjs/toolkit";
import { drawGetCall } from "../../services/register";


const Draws = (props: Props) => {
  const dispatch = useDispatch();

  const [close, setClose] = useState<any>();
  //drawGetCall
  useEffect(() => {
    //console.log("data..............");
    const soon = async () => {
      let closingData = await drawGetCall()

      let result = closingData.data;

      var a: any[] = [];
      result.map((e: { total_no_of_sold_out_tickets: number; total_no_of_tickets: number; }) => {
        var data = (e.total_no_of_sold_out_tickets * 100 / e.total_no_of_tickets);
        //console.log("samuvel sham.......",data);
        if (data < 100) {
          a.push(e)
        }
        console.log(a, "data to maping")
        setClose(a)
      })

    }
    soon();

  }, [])

  return (
    <SafeAreaView>
      <StatusBar animated={true} backgroundColor={"#0a0127"} />
      <View style={{ height: verticalScale(80), justifyContent: 'center', backgroundColor: "#0a0127" }}>
        {/* <TouchableOpacity style={{ margin: "5.5%" }}>
              <Image
                source={icons.back}
                resizeMode="contain"
                style={{ width: 20,height: 20,}} />
            </TouchableOpacity> */}
        {/* <View style={{ marginTop: "4%", flexDirection: 'row', justifyContent: "center" }}> */}
        <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), textAlign: "center" }}>Draws</Text>
        {/* </View> */}
      </View>
      <>
        {close ?
          <ScrollView style={{ height: "90%" }}>

            <View style={{ marginHorizontal: "4%", marginTop: "2%" }}>
              <Text style={{ color: COLORS.textHeader, fontSize: RFValue(16), ...FONTS.lexendsemibold }}>Draws</Text>
              <View style={{ borderTopWidth: 4, width: "13%", borderTopColor: COLORS.element }} />
            </View>
            <DrawsHeader />
            <DrawsMain />
          </ScrollView >
          : <View style={{ width: "100%", alignItems: "center", height: "92%", justifyContent: "center" }}>
            <LoaderKit
              style={{ width: 100, height: 105 }}
              name={'BallClipRotatePulse'} // Optional: see list of animations below
              size={30} // Required on iOS
              color={COLORS.element} // Optional: color can be: 'red', 'green',... or '#ddd', '#FFFFFF',
            />
          </View>
        }
      </>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
});
export default Draws;