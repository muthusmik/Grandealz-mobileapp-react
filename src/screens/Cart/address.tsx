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
    Alert,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import { horizontalScale, moderateScale, verticalScale } from "../../constants/metrices";
import { shoppingCart } from "../../constants/icons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import image from "../../constants/image";
import AntIcon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
// import { RadioButton } from "react-native-paper";
import icons from "../../constants/icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector, useStore } from "react-redux";
import { RemoveAddressHandle } from "../../services/deleteaddress";
import { addressListHandler } from "../../store/reducers/addresslist";
import { unwrapResult } from "@reduxjs/toolkit";
const Address = ({ route }) => {

    const typeUser = route.params.type;
    const amount = route.params.amount
    console.log("typeUser...............", typeUser, amount)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const addresslist = useSelector((state) => state.AddressHandle.data);
    const [address, setAddress] = useState("");
    const [selection, setSelection] = useState(null);
    const [listing, setListing] = useState(true)

    useEffect(() => {

        if (addresslist.length === 2) {
            setListing(true);
        }
        else {
            setListing(false)
        }

    }, [addresslist])


    const handledata = (data: any) => {

        console.log("editing page", { data: data, type: typeUser })
        navigation.navigate("EditAddress", { data: data, type: typeUser, totalAmount: amount })
    }
    const handleDelete = async (data: any) => {
        Alert.alert("", "Are you sure you want to delete?", [
            {
                text: 'Cancel',
                // onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => deletedacc()
            },
        ])
        console.log("deleting page", data)
        const deletedacc = async () => {
            let Removeitems = await RemoveAddressHandle(data)
            console.log("removed stats", Removeitems.message)
            dispatch(addressListHandler())
                .then(unwrapResult).then((originalPromiseResult) => {
                    console.log("result data", originalPromiseResult)
                    Toast.show(Removeitems.message, Toast.LONG, { backgroundColor: 'red' });
                })
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#F1F1F", height: "100%" }}>
            <StatusBar
                animated={true}
                backgroundColor="#0a0127"
            />
            <View style={styles.subdivOne}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: horizontalScale(14) }}>
                    <EntypoIcons name="chevron-left" size={30} style={{ flexDirection: "column" }} color={"white"} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), width: horizontalScale(280), textAlign: "center" }}>Address</Text>
            </View>



            <ScrollView style={{ height: "80%" }}>
                <View style={{ width: "92%", alignSelf: "center", borderRadius: 10, backgroundColor: COLORS.white, marginTop: 14, padding: 6 }}>
                    <TouchableOpacity disabled={listing} style={{ flexDirection: "row", width: "100%", borderRadius: 5, justifyContent: "center" }} onPress={() => navigation.navigate('AddAddress', { type: "payment", "amount": amount })}>
                        <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular, margin: 14 }}>Add new Address</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingBottom: 12 }}>
                    {(addresslist.length > 0) ?
                        (typeUser === "payment") ?
                            (addresslist).map((data: any, index: any) => (
                                <TouchableOpacity onPress={() => setSelection(index)} key={index} style={{ width: "92%", alignSelf: "center", borderRadius: 10, backgroundColor: COLORS.white, marginHorizontal: "2%", marginTop: "5%", marginBottom: "0%", borderColor: (selection == index) ? COLORS.element : COLORS.white, borderWidth: 1, }}>
                                    <View style={{ flexDirection: "row", width: "90%", borderRadius: 10, padding: "1%" }}>
                                        <View style={{ flexDirection: "column", width: "90%", }}>
                                            <View style={{ flexDirection: "row", width: "100%" }}>
                                                <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular, marginLeft: "3%", marginVertical: "1%" }}>{data.name}</Text>
                                                <TouchableOpacity style={{ width: "15%", justifyContent: "center", alignItems: "center", marginStart: "2%", }}>
                                                    <Text style={{ width: "100%", color: COLORS.gray, fontSize: RFValue(8), textAlign: "center", ...FONTS.lexendregular, borderRadius: 2, borderWidth: 1, padding: "4%", borderColor: COLORS.gray }}>{data.address_type}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={{ flexDirection: "column", width: "10%", borderRadius: 5, alignItems: "center", borderWidth: 1, padding: "2%", marginVertical: "1%" }} onPress={() => { handledata(data._id) }}>
                                            <Entypo name="edit" size={moderateScale(15)} color={COLORS.black} style={{ paddingVertical: "2%" }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: "column", width: "10%", borderRadius: 5, alignItems: "center", borderWidth: 1, padding: "2%", margin: "1%" }} onPress={() => { handleDelete(data._id) }}>
                                            <AntIcon name="delete" size={moderateScale(15)} color={COLORS.black} style={{ paddingVertical: "2%" }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular, marginHorizontal: "3%", marginTop: "0%" }}>
                                            {data.address},{data.locality_town},{`\n`}
                                            {data.city.name},{`\n`}
                                            {data.state.name},{`\n`}
                                            {data.pincode},{`\n`}
                                            {data.country.name}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular, margin: "3%" }}>
                                            Mobile: <Text style={{ color: COLORS.textHeader, fontSize: RFValue(12), ...FONTS.lexendregular, margin: "3%" }}>{data.phone}</Text>
                                        </Text>
                                    </View>
                                    <View style={{ padding: "2%" }} />
                                </TouchableOpacity>

                            ))
                            :
                            (addresslist).map((data: any, index: any) => (
                                <View key={index} style={{ width: "92%", alignSelf: "center", borderRadius: 10, backgroundColor: COLORS.white, marginHorizontal: "2%", marginTop: "5%", marginBottom: "0%", borderColor: (selection == index) ? COLORS.element : COLORS.white, borderWidth: 1, }}>
                                    <View style={{ flexDirection: "row", width: "90%", borderRadius: 10, padding: "1%" }}>
                                        <View style={{ flexDirection: "column", width: "90%", }}>
                                            <View style={{ flexDirection: "row", width: "100%" }}>
                                                <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular, marginLeft: "3%", marginVertical: "1%" }}>{data.name}</Text>
                                                <TouchableOpacity style={{ width: "15%", justifyContent: "center", alignItems: "center", marginStart: "2%", }}>
                                                    <Text style={{ width: "100%", color: COLORS.gray, fontSize: RFValue(8), textAlign: "center", ...FONTS.lexendregular, borderRadius: 2, borderWidth: 1, borderColor: COLORS.gray, padding: "4%" }}>{data.address_type}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={{ flexDirection: "column", width: "10%", borderRadius: 5, alignItems: "center", borderWidth: 1, padding: "2%", marginVertical: "1%" }} onPress={() => { handledata(data._id) }}>
                                            <Entypo name="edit" size={moderateScale(15)} color={COLORS.black} style={{ paddingVertical: "2%" }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: "column", width: "10%", borderRadius: 5, alignItems: "center", borderWidth: 1, padding: "2%", margin: "1%" }} onPress={() => { handleDelete(data._id) }}>
                                            <AntIcon name="delete" size={moderateScale(15)} color={COLORS.black} style={{ paddingVertical: "2%" }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular, marginHorizontal: "3%", marginTop: "0%" }}>
                                            {data.address},{data.locality_town},{`\n`}
                                            {data.city.name},{`\n`}
                                            {data.state.name},{`\n`}
                                            {data.pincode},{`\n`}
                                            {data.country.name}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular, margin: "3%" }}>
                                            Mobile: <Text style={{ color: COLORS.textHeader, fontSize: RFValue(12), ...FONTS.lexendregular, margin: "3%" }}>{data.phone}</Text>
                                        </Text>
                                    </View>
                                    <View style={{ padding: "2%" }} />
                                </View>

                            ))
                        :
                        <View style={{ width: "100%", alignItems: "center", padding: "5%", justifyContent: "center", }}>
                            <Text style={{ color: "black" }}> No Addresses Saved </Text>
                        </View>
                    }
                </View>
            </ScrollView>

            {selection != null ?
                <View style={{ flexDirection: "row", height: "8%", backgroundColor: COLORS.white, paddingHorizontal: horizontalScale(8) }}>
                    <View style={{ flexDirection: "column", width: "55%", marginHorizontal: "3%", marginVertical: "4%" }}>
                        <Text style={{ color: COLORS.element, fontSize: RFValue(14), ...FONTS.lexendregular }} >₹{route.params.amount.toFixed(2)}</Text>
                        <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular }} >Total Amount</Text>
                    </View>
                    {/* onPress={() => navigation.navigate("payment")} */}
                    <TouchableOpacity style={{ flexDirection: "column", width: "35%", marginVertical: "1%", borderRadius: 5, borderWidth: 1, alignSelf: "center" }} onPress={() => navigation.navigate("OrderConfirmed")} >
                        <Text style={{ color: COLORS.textHeader, fontSize: RFValue(14), ...FONTS.lexendregular, paddingVertical: verticalScale(10), textAlign: "center" }}>Continue</Text>
                    </TouchableOpacity>
                </View>
                : null
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
        flexDirection: "row",
    },
    subdivTwo: {
        height: verticalScale(748),
        alignItems: "center",
        justifyContent: "center",
        // borderWidth:2
    }

})
export default Address;