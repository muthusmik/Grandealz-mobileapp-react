import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from "../../constants/metrices";

import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

import image from "../../constants/image";
import { RFValue } from "react-native-responsive-fontsize";
import { FONTS } from "../../constants";


const TicketEmpty = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{height:"90%",width:"100%",}}>
            <View  style={styles.container}>
            {/* <View style={styles.view1} > */}
            <Image
                source={image.ticketEmpty}
                resizeMode="contain"
                style={{ height: verticalScale(150), width: horizontalScale(150),top:verticalScale(5) }}
            />
            <Text style={styles.text1}>Currently you have no active Coupon</Text>
            {/* </View> */}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    subdivOne: {
        width: horizontalScale(375),
        height: verticalScale(80),
        backgroundColor: "#0a0127",
        alignItems: "center",
        // justifyContent: 'center',
        flexDirection: "row"
    },
    subdivTwo: {
        height: "92%",
        // alignItems: "center",
        // justifyContent: "center",
        // borderWidth:2
    },
    container: {
        alignItems: "center",
        justifyContent:"center",
        height:"100%",
        width:"100%",
        // borderWidth:2
    },
    view1: {
        alignContent: "center",
        alignItems: "center",
        justifyContent:"center",
        flexDirection: "column",
        width: horizontalScale(140),
        alignSelf: "center",
        backgroundColor: '#EEEEEE' ,
        height: verticalScale(150),
        borderTopStartRadius: 95,
        borderBottomStartRadius: 95,
        borderTopEndRadius: 95,
        borderBottomEndRadius: 95,
    },
    text1: {
        alignContent: "center",
        color:"black",
        ...FONTS.lexendregular,
        fontSize: moderateScale(13),
        
    },


})
export default TicketEmpty;