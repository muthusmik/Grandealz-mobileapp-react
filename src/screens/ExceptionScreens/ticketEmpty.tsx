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
    Button,
    TouchableOpacity
} from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from "../../constants/metrices";

import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

import image from "../../constants/image";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, icons } from "../../constants";


const TicketEmpty = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ height: "90%", width: "100%", }}>
            {/* <View style={styles.container}>
                <View style={styles.view1} >
                <Image
                    source={icons.tabTicketColor}
                    resizeMode="contain"
                    style={{ height: verticalScale(50), width: horizontalScale(60), top: verticalScale(5) }}
                />
                <View>
                    <Text style={{ paddingHorizontal: "8%", textAlign: "center",color:"black",paddingTop:"10%",fontSize:RFValue(13),lineHeight:RFValue(16) }}>You can view active coupons here after you make your purchase</Text>
                    <View style={{paddingHorizontal:"20%",marginTop:"5%"}}>
                    <TouchableOpacity style={{paddingHorizontal:"20%",marginTop:"2%",borderWidth:1,borderColor:COLORS.black,borderRadius:5}} onPress={()=>{navigation.navigate("DataPage")}}>
                        <Text style={{padding:"5%",color:COLORS.black,fontSize:RFValue(12),textAlign:"center",fontWeight:"600"}}>Start Shopping</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </View> */}
            <View style={styles.subdivTwo}>
                <Image
                    source={icons.tabTicketColor}
                    resizeMode='contain'
                    style={{
                        width: horizontalScale(80),
                        height: verticalScale(80),
                    }}
                />
                <Text style={{ paddingHorizontal: "8%", fontFamily: "Lexend-Regular", color: "black", fontSize: 14, textAlign: "center", marginTop: 20 }}>You can view active Tickets here after you make your purchase</Text>
                <TouchableOpacity style={{ paddingHorizontal: "20%", marginTop: 20, borderWidth: 1, borderColor: COLORS.black, borderRadius: 5 }} onPress={() => { navigation.navigate("DataPage") }}>
                    <Text style={{ padding: "5%", color: COLORS.black, fontSize: RFValue(10), textAlign: "center", ...FONTS.lexendsemibold }}>Start Shopping</Text>
                </TouchableOpacity>
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
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth:2
    },
    container: {
        alignItems: "center",
        marginTop: "45%",
        height: "100%",
        width: "100%",
        // borderWidth:2
    },
    view1: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: horizontalScale(140),
        alignSelf: "center",
        backgroundColor: '#EEEEEE',
        height: verticalScale(150),
        borderTopStartRadius: 95,
        borderBottomStartRadius: 95,
        borderTopEndRadius: 95,
        borderBottomEndRadius: 95,
    },
    text1: {
        alignContent: "center",
        color: "black",
        ...FONTS.lexendregular,
        fontSize: moderateScale(13),

    },


})
export default TicketEmpty;