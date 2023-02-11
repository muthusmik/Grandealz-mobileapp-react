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
import LoaderKit from 'react-native-loader-kit';
import { horizontalScale, verticalScale } from "../constants/metrices";
import { love } from "../constants/icons"
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import icons from "../constants/icons"
import image from "../constants/image";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../constants";
import OrderList from "./Myorders/orderList";
import { wishlistHandle } from "../services/wishlist";
import { RemovewishlistHandle } from '../services/deletewishlist';
import { ToastAndroid } from 'react-native';
import { AddtoCartHandle } from "../services/addtocart";
const WishList = () => {
    const navigation = useNavigation();
    const [Wishlistdata, setWishlistdata] = useState<any>([]);
    const [productid, setProductid] = useState()
    const [removeres, setRemoveres] = useState()
    const [drawid, setDrawid] = useState(null);
    useEffect(() => {
        RemoveWishlist();
        soon()
    }, [productid])
    const soon = async () => {
        let WishList = await wishlistHandle()
        console.log("Wishlistdata", WishList)
        setWishlistdata(WishList)
    }
useEffect(() =>{
    if(drawid){
    const AddtoCartitems = async () => {
        const payload={"draw": drawid,"qty":1}
        let AddItemtoCart = await AddtoCartHandle(payload)
        if (AddItemtoCart.status === "200") {
            navigation.navigate("Tabs", { screen: "Cart" })
        }
        else {
            ToastAndroid.showWithGravity(
                AddItemtoCart.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }
    AddtoCartitems()
}
}, [drawid])
    const RemoveWishlist = async () => {
        let Removeitems = await RemovewishlistHandle(productid)
        setRemoveres(Removeitems);
        soon();
    }
    const RemoveItem = (data: any) => {
        setProductid(data)
        ToastAndroid.showWithGravity(
            'Removed successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }
    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor="#0A0127"
            />
            <View style={styles.subdivOne}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: horizontalScale(18), flexDirection: "column" }}>
                    <EntypoIcons name="chevron-left" size={30} style={{ flexDirection: "column" }} color={"white"} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(21), width: "75%", textAlign: "center" }}>Wishlist</Text>
            </View>
            {/* <View style={styles.subdivTwo}>
                <Image
                    source={love}
                    resizeMode='contain'
                    style={{
                        width: horizontalScale(80),
                        height: verticalScale(80),
                    }}
                />
                <Text style={{ fontFamily: "Lexend-Regular", color: "black", fontSize: 16, marginTop: 20 }}>Your wishlist in empty</Text>
            </View> */}
            <ScrollView style={styles.subdivTwo}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ padding: "4%" }}>
                        {Wishlistdata.length > 0 ?
                            <FlatList
                                data={Wishlistdata}
                                contentContainerStyle={{}}
                                keyExtractor={item => item.draw._id}
                                renderItem={({ item }) => (
                                    <View style={{ width: "100%", marginBottom: "4%", borderRadius: 10, backgroundColor: "white" }}>
                                        <TouchableOpacity>
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={{ flexDirection: "row", width: "70%", paddingVertical: "5%", paddingLeft: "3%" }}>
                                                    <View style={{ flexDirection: "column", backgroundColor: COLORS.pagebackground, padding: "4%", width: "45%", alignItems: "center" }}>
                                                        <Image
                                                            source={{ uri: item.draw.product_image }}
                                                            resizeMode="contain"
                                                            style={{ height: verticalScale(100), width: horizontalScale(80) }}
                                                        />
                                                    </View>
                                                    <View style={{ flexDirection: "column", justifyContent: "center", width: "60%", paddingLeft: "4%" }}>
                                                        <Text style={{ color: COLORS.black, ...FONTS.lexendsemibold, fontSize: RFValue(13) }}>{item.draw.product_title}</Text>
                                                        <Text style={{ color: COLORS.gray, ...FONTS.lexendregular, fontSize: RFValue(13) }}>{(item.draw.product_description).substring(0, 45)}</Text>
                                                        <Text style={{ color: COLORS.element, ...FONTS.lexendregular, fontSize: RFValue(13) }}>₹{item.draw.product_price}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: "column", width: "30%", borderColor: "green", justifyContent: "space-between" }}>
                                                    <TouchableOpacity onPress={() => RemoveItem(item._id)}>
                                                        <View style={{ width: "30%", backgroundColor: COLORS.element, alignSelf: "flex-end", flexDirection: "row", borderTopEndRadius: 10, borderBottomStartRadius: 10 }}>
                                                            <Text style={{ width: "100%", paddingVertical: "8%", textAlign: "center", ...FONTS.lexendregular, fontSize: RFValue(16), color: COLORS.white }}>-</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ width: "102%", backgroundColor: COLORS.element, alignSelf: "flex-end", flexDirection: "row", borderBottomEndRadius: 10, borderTopStartRadius: 10 }} onPress={() =>setDrawid(item.draw._id)} >
                                                        <Text style={{ width: "100%", textAlign: "center", paddingVertical: "8%", ...FONTS.lexendregular, color: COLORS.white }}>ADD TO CART</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                            : null}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    subdivOne: {
        width: horizontalScale(375),
        height: verticalScale(80),
        backgroundColor: "#0A0127",
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
        alignContent: "center"
    },
    view1: {
        alignContent: "center"
    },
    text1: {
        alignContent: "center"
    },
})
export default WishList;