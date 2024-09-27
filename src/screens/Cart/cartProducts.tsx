import React, { useState, useEffect } from "react";
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
import { useIsFocused } from "@react-navigation/core";
import { horizontalScale, moderateScale, verticalScale } from "../../constants/metrices";
import { shoppingCart } from "../../constants/icons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntIcon from 'react-native-vector-icons/AntDesign';
import ToggleSwitch from 'toggle-switch-react-native';
import image from "../../constants/image";
import Toast from 'react-native-simple-toast';
import { DonateHandle } from "../../services/donate"
import { AddtoCartHandle } from "../../services/addtocart";
const CartProducts = ({ cartval, changer, setChanger, swith }) => {

    const navigation = useNavigation();
    const [toggle, setToggle] = useState(false);
    const data = ["all", "hello", "everybody", "world"]

    const [donaterep, setDonaterep] = useState()

    const [donateid, setDonateid] = useState('')
    const [cartitem, setCartitem] = useState()

    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused) {
            // console.log("is triggerring",cartval,changer,setChanger)
            setCartitem(cartval.draws)
            setDonateid(cartval._id)
        }
    }, [isFocused, cartval])

    useEffect(() => {
        const DonateProduct = async () => {
            let DonateValue = await DonateHandle(donateid, toggle)
            // console.log("ourDonate console", DonateValue)
            setDonaterep(DonateValue)
        }
        DonateProduct()
    }, [toggle])

    // const DonateButton = () => {
    //     if (toggle === true) {
    //         Toast.show( 'Donate Product Removed successfully', Toast.LONG, { backgroundColor: 'red' });

    //     }
    //     else{
    //         Toast.show( 'Donate Product added successfully', Toast.LONG, { backgroundColor: 'red' });
    //     }
    // }


    const increaseItemQty = (productDetails: any) => {

        const quantity = productDetails.qty + 1;
        const payload = { "draw": productDetails.draw._id, "qty": quantity }
        // console.log("item",payload)
        callToCartitems(payload);
    }

    const decreaseItemQty = (productDetails: any) => {
        if (productDetails.qty > 0) {
            const quantity = productDetails.qty - 1;
            const payload = { "draw": productDetails.draw._id, "qty": quantity }
            // console.log("item",payload)
            callToCartitems(payload);
        }
    }
    const callToCartitems = async (payload: any) => {
        let AddItemtoCart = await AddtoCartHandle(payload)
        if (AddItemtoCart.status === "200") {
            setChanger(!changer);
        }
        else {
            Toast.show(AddItemtoCart.message, Toast.LONG, { backgroundColor: 'red' });

        }
    }
    //  console.log("jk.....",toggle,"id",donateid,"res///",donaterep)
    return (
        <View style={{ width: "100%", borderRadius: 10, backgroundColor: COLORS.white, margin: "2%", alignSelf: "center" }}>

            {cartitem && cartitem.map((item, index) => {
                return (
                    <>
                        <View style={{ flexDirection: "row", width: "100%", borderRadius: 10, padding: "2%" }}>
                            <View style={{ flexDirection: "column", width: "87%", }}>
                                <View style={{ flexDirection: "row", }}>
                                    <View style={{ width: "35%", backgroundColor: "#F9F9F9", borderRadius: 5 }}>
                                        <Image
                                            source={{ uri: item.draw.product_image }}
                                            resizeMode={"cover"}
                                            style={{ height: 80, width: 90, justifyContent: "center", margin: "10%" }}
                                        />
                                    </View>
                                    <View style={{ width: "63%", marginHorizontal: "3%", alignSelf: "center" }}>
                                        <Text style={{ color: COLORS.textHeader, fontSize: RFValue(12), ...FONTS.lexendsemibold, }}>{item.draw.draw_title}</Text>
                                        <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular, }}>{item.draw.product_title}</Text>
                                        <Text style={{ color: COLORS.element, fontSize: RFValue(12), ...FONTS.lexendregular, }}>₹{Number(item.draw.product_price).toFixed(2)}</Text>
                                        <Text style={{ color: COLORS.textHeader, fontSize: RFValue(12), ...FONTS.lexendregular, marginTop: "5%" }}>{(toggle ? "2" : "1")} Ticket
                                            <Text style={{ color: COLORS.gray }}> per unit</Text> </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", width: "10%", alignSelf: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={() => increaseItemQty(item)} ><AntIcon name="plussquare" size={moderateScale(20)} color={COLORS.element} style={{ marginBottom: "10%" }} /></TouchableOpacity>
                                <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular }}>{item.qty}</Text>
                                <TouchableOpacity onPress={() => decreaseItemQty(item)}><AntIcon name="minussquare" size={moderateScale(20)} color={COLORS.element} style={{ marginTop: "10%" }} /></TouchableOpacity>
                            </View>
                        </View>
                        {(cartitem.length - 1 != index) ?
                            <View style={{ borderBottomColor: "#F1F1F1", borderBottomWidth: 3 }} />
                            : null
                        }
                    </>
                )
            })}

            <View style={{ flexDirection: "row", width: "100%", borderBottomStartRadius: 10, borderBottomEndRadius: 10, backgroundColor: COLORS.element, paddingBottom: RFValue(12) }}>
                <View style={{ marginTop: RFValue(12), marginLeft: "2%" }}>
                    <ToggleSwitch
                        isOn={toggle}
                        onColor="#FF777F"
                        offColor="#FF777F"
                        size="small"
                        onToggle={isOn => { setToggle(!toggle), swith(!toggle) }}
                    />
                </View>
                <Text style={{ color: COLORS.white, fontSize: moderateScale(12), ...FONTS.lexendregular, marginTop: RFValue(12), marginLeft: RFValue(5) }}>Donate Product(s) & Double Your Tickets</Text>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    subdivOne: {
        width: horizontalScale(375),
        height: verticalScale(65),
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
export default CartProducts;