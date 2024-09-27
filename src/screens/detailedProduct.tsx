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
import { horizontalScale, verticalScale } from "../constants/metrices";
import { love } from "../constants/icons"
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import icons from "../constants/icons"
import image from "../constants/image";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../constants";
import OrderList from "./Myorders/orderList";
import WishlistData from "./wishListData";

const DetailedProduct = ({ route }) => {
    const value = route.params;
    console.log("data....", value)
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: "#F1F1F", height: "100%" }}>
            <StatusBar
                animated={true}
                backgroundColor="#0a0127"
            />
            <View style={styles.subdivOne}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: horizontalScale(18), flexDirection: "column" }}>
                    <EntypoIcons name="chevron-left" size={30} style={{ flexDirection: "column" }} color={"white"} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), textAlign: "center", width: "75%" }}>{value.item.product_title}</Text>

            </View>
            <ScrollView style={{ height: "80%", padding: "4%" }}>
                <View style={{ width: "100%", alignSelf:"center" }}>
                    <View style={{ padding: 20, borderRadius: 10, alignItems: "center", width: "100%", backgroundColor: COLORS.white }}>
                        <Image
                            source={{uri:value.item.product_image}}
                            resizeMode="contain"
                            style={{
                                width:horizontalScale(250),
                                height:verticalScale(250)
                            }}
                        />
                    </View>
                    <Text style={{ marginTop: 10, ...FONTS.lexendregular, color: COLORS.black }}>{value.item.product_description}</Text>
                </View>
            </ScrollView>
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
        // borderWidth:2
    }

})
export default DetailedProduct;


