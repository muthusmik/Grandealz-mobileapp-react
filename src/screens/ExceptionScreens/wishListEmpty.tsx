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
import { horizontalScale, verticalScale } from "../../constants/metrices";

import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

import image from "../../constants/image";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../../constants";


const WishListEmpty = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ height: "90%", width: "100%" }}>
            <View style={styles.container}>
                <View style={styles.view1} >
                    <Image
                        source={image.heartEmpty}
                        resizeMode="contain"
                        style={{ height: verticalScale(90), width: horizontalScale(80) }}
                    />
                </View>
                <Text style={{ textAlign: "center", color: COLORS.gray, ...FONTS.lexendregular }}>Your Wishist is Empty</Text>
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
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },
    view1: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: horizontalScale(130),
        alignSelf: "center",
        backgroundColor: '#EEEEEE',
        height: verticalScale(130),
        borderTopStartRadius: 95,
        borderBottomStartRadius: 95,
        borderTopEndRadius: 95,
        borderBottomEndRadius: 95,
    },
    text1: {
        alignContent: "center"
    },


})
export default WishListEmpty;