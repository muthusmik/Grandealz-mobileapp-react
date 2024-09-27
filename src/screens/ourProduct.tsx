import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from "../constants/metrices";
import { love } from "../constants/icons"
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import LoaderKit from 'react-native-loader-kit';
import icons from "../constants/icons"
import image from "../constants/image";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../constants";
import OrderList from "./Myorders/orderList";
import WishlistData from "./wishListData";
import { productGetCall } from "../../src test sasi/services/register";
import { ourCountry, ourprod } from "../services/register";

const OurProducts = () => {
    const navigation = useNavigation();
    const [stock, setStock] = useState([]);
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        setLoader(true);
        prod()
    }, [])
    const prod = async () => {
        let ourProduct = await ourprod()
        console.log("consolelog", ourProduct)
        setStock(ourProduct);
        setLoader(false);
    }
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
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), width: "75%", textAlign: "center" }}>Our Products</Text>

            </View>
            {!loader ?
                (stock) ?
                    <ScrollView>
                        <View>
                            <FlatList
                                data={stock}
                                scrollEnabled={true}
                                numColumns={2}
                                contentContainerStyle={{ paddingBottom: verticalScale(50), padding: "2%" }}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={{ backgroundColor: "white", borderRadius: 8, marginTop: horizontalScale(14), marginLeft: verticalScale(14), width: horizontalScale(160) }} onPress={() => { navigation.navigate("DetailedProduct", { item }) }}>
                                        <View style={{ padding: moderateScale(9) }}>
                                            <View style={{ paddingVertical: verticalScale(15), height: verticalScale(160), backgroundColor: "#F1F1F1", alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: item.product_image }}
                                                    resizeMode="contain"
                                                    style={{ width: "100%", height: "100%" }}
                                                />
                                            </View>
                                            <View style={{ alignItems: "center", justifyContent: "center", height: verticalScale(30) }}>
                                                <Text style={{ textAlign: "center", ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(11), marginTop: "5%" }}>{item.product_title}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </ScrollView>
                    :
                    <View style={{ width: "100%", alignItems: "center", paddingBottom: "5%", height: "92%", justifyContent: "center" }}>
                        <Text style={{ color: "black" }}> No Products Available</Text>
                    </View>
                :
                <View style={{ width: "100%", alignItems: "center", height: "90%", justifyContent: "center" }}>
                    <LoaderKit
                        style={{ width: 100, height: 105 }}
                        name={'BallClipRotatePulse'} // Optional: see list of animations below
                        size={30} // Required on iOS
                        color={COLORS.element} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',
                    />
                </View>
            }
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
export default OurProducts;