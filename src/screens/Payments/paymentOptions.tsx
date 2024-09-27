import React from "react";
import {
    Text,
    View,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { horizontalScale, verticalScale } from "../../constants/metrices";
import { shoppingCart } from "../../constants/icons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../../constants";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const PaymentOptions = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor="#0a0127"
            />

            <View style={styles.subdivOne}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: horizontalScale(14) }}>
                    <EntypoIcons name="chevron-left" size={30} style={{ flexDirection: "column" }} color={"white"} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Lexend-Regular", color: "white", fontSize: RFValue(20), width: "79%", textAlign: "center" }}>Payment Options</Text>
            </View>
            <View style={styles.subdivTwo}>
                <Text style={{ fontFamily: "Lexend-Regular", color: COLORS.gray, fontSize: RFValue(13), width: "80%", textAlign: "center" }}>Once you make a purchase, your card(s) will appear here.</Text>
                <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, width: "60%", marginTop: "7%" }} onPress={() => navigation.navigate("AddNewPayee")}>
                    <Text style={{ ...FONTS.lexendregular, color: COLORS.black, paddingVertical: verticalScale(15), textAlign: "center", fontSize: RFValue(15) }}>Start Shopping</Text>
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
        height: verticalScale(748),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.pagebackground
    }

})
export default PaymentOptions;