import React, { type PropsWithChildren, useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    FlatList,
    useColorScheme,
    View,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from '../constants/image';
import icons from '../constants/icons';
import { horizontalScale, verticalScale } from '../constants/metrices';
import { COLORS, FONTS } from '../constants';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import { couponPage } from '../services/copoun';
import { TextInput } from 'react-native-paper';
import { AddCouponHandle } from "../store/reducers/addcouponcode"
import { useNavigation } from '@react-navigation/native';
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import TicketEmpty from "../screens/ExceptionScreens/ticketEmpty";
import Toast from 'react-native-simple-toast';

const CouponDetails = () => {
    const [dataoff, setDataOff] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        const coupn = async () => {
            let offer = await couponPage()
            console.log("offer coupons", offer);
            setDataOff(offer)
        }
        coupn();
    }, [])
    const [applycoupon, setApplycoupon] = useState("")
    const [error, setError] = useState("")
    const navigation = useNavigation();
    const validatePromocode = () => {
        if (applycoupon.length == 0) {
            setError('Please input Coupon code!')
        }
        else {
            dispatch(AddCouponHandle(applycoupon)).then(unwrapResult).then(async (originalPromiseResult) => {
                if (originalPromiseResult.status === "200") {
                    Toast.show(originalPromiseResult.message, Toast.LONG, { backgroundColor: 'red' });
                    navigation.navigate("Tabs", { screen: "Cart" })
                }
                else {
                    setError(originalPromiseResult.message)
                    Toast.show(originalPromiseResult.message, Toast.LONG, { backgroundColor: 'red' });
                }
            })
        }
    }
    const CouponValue = (data) => {
        setApplycoupon(data)
        setError("")
    }
    return (
        <SafeAreaView >
            {(dataoff) ? (
                <View style={{ width: horizontalScale(375), height: "100%" }} >

                    <View style={{ width: "95%", padding: "1%", borderRadius: 10, backgroundColor: COLORS.white, margin: "2%", marginTop: "5%", }}>
                        <TouchableOpacity onPress={() => { setApplycoupon("") }}>
                            <Text style={{ marginRight: "6%", color: COLORS.element, fontSize: RFValue(10), ...FONTS.lexendregular, alignSelf: "flex-end" }}>Remove</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", width: "100%", borderRadius: 10, padding: "0%", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ flexDirection: "column", }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {/* <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular, marginStart: "5%" }}>Apply Promo Code</Text> */}
                                    <TextInput
                                        placeholder='Add promo code'
                                        placeholderTextColor={"black"}
                                        onChangeText={(text: string) => { setApplycoupon(text), error ? setError("") : null }}
                                        value={applycoupon}
                                        underlineColor="white"
                                        activeUnderlineColor={'transparent'}
                                        style={{ width: 200, height: 40, backgroundColor: "white", fontSize: RFValue(12), color: COLORS.black, ...FONTS.lexendregular, borderWidth: 1, borderColor: "white" }}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={{ flexDirection: "column", }} onPress={() => validatePromocode()}>
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Text style={{ width: 60, height: 26, borderWidth: 1, paddingLeft: 12, paddingTop: 3, borderRadius: 5, color: COLORS.textHeader, fontSize: RFValue(12), ...FONTS.lexendregular, marginStart: "5%" }}>Apply</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: "3%", marginTop: "-7%" }}>
                        {error ? <Text style={{ ...FONTS.lexendregular, color: COLORS.element, fontSize: RFValue(12), paddingStart: "7%" }}>{error}</Text> : null}
                    </View>
                    <View>
                        <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, marginHorizontal: 15, paddingVertical: 5, marginTop: "5%", fontSize: RFValue(15) }}>Available Coupons</Text>
                    </View>
                    <FlatList
                        data={dataoff}
                        contentContainerStyle={{ marginLeft: horizontalScale(12) }}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={{ paddingTop: verticalScale(14) }}>
                                <TouchableOpacity style={{ backgroundColor: "white", flexDirection: "row", width: "96.5%", borderRadius: 10, }}>
                                    <View style={{ flexDirection: "column", width: horizontalScale(30), right: horizontalScale(10), marginTop: "17%", backgroundColor: COLORS.lightGray, height: verticalScale(35), borderBottomEndRadius: 55, borderTopEndRadius: 55 }} />
                                    <View style={{ flexDirection: "column", width: horizontalScale(300), right: horizontalScale(10) }}>
                                        <View style={{ flexDirection: "row", padding: 15, justifyContent: "space-between",/* paddingBottom:25, borderBottomColor: "#616161", borderBottomWidth: 1 */ }}>
                                            <View style={{ flexDirection: "column", width: horizontalScale(208), }}>
                                                <View style={{ marginBottom: "0%", borderLeftWidth: 4, borderColor: 'red', borderRightWidth: 4, marginLeft: -35, height: 30, borderRadius: 3, width: horizontalScale(348) }}>
                                                    <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(14), padding: 2, marginLeft: 10 }}>Flat {item.discount}% OFF</Text>
                                                </View>
                                                <Text style={{ ...FONTS.lexendregular, color: COLORS.gray, fontSize: RFValue(12), paddingVertical: 2, marginLeft: 10 }}>Use {item.description}</Text>
                                            </View>
                                            <View style={{ flexDirection: "column", paddingRight: "10%" }}>
                                                <Text style={{ marginTop: 10, color: COLORS.gray }}>{item.coupon}</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderStyle: "dashed", borderBottomWidth: 1, borderColor: "grey", marginStart: "4%" }} />
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, padding: 10 }}>
                                            <View style={{ flexDirection: "column", width: "80%" }}>
                                                {/* <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(12), paddingVertical: 4 }}>{item.description}</Text> */}
                                                <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(12), paddingVertical: 10 }}>Save {item.discount}% with this code</Text>
                                            </View>
                                            <View style={{ flexDirection: "column" }}>
                                                <TouchableOpacity style={{ flexDirection: "column", alignItems: "center", paddingTop: 0 }} onPress={() => CouponValue(item.coupon)}>
                                                    <Text style={{ width: 65, height: 30, borderWidth: 1, paddingLeft: 12, paddingTop: 4, borderRadius: 5, color: COLORS.textHeader, fontSize: RFValue(12), ...FONTS.lexendregular, marginStart: "5%" }}>Apply</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "column", width: horizontalScale(30), marginTop: "17%", backgroundColor: COLORS.lightGray, height: verticalScale(35), borderBottomStartRadius: 55, borderTopStartRadius: 55 }} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <View style={{ padding: "22%" }}></View>
                </View>
            ) : <TicketEmpty />}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
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
export default CouponDetails;