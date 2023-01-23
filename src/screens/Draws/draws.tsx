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

import DrawsMain from "./drawsMain";


const Draws = (props: Props) => {




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
        <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(24), textAlign: "center" }}>Draws</Text>
        {/* </View> */}
      </View>
      <ScrollView style={{height:"90%"}}>

        <View style={{ marginHorizontal: "4%", marginTop: "2%", }}>
          <Text style={{ color: COLORS.textHeader, fontSize: RFValue(20), ...FONTS.lexendregular }}>Draws</Text>
          <View style={{ borderTopWidth: 4, width: "13%", borderTopColor: COLORS.element }} />
        </View>
        <DrawsHeader />

        <DrawsMain />

      </ScrollView >
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