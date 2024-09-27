import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { horizontalScale, verticalScale } from "../../constants/metrices";
import icons, { shoppingCart, userHeart } from "../../constants/icons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import image from "../../constants/image";
import OrderList from "./orderList";
import StepIndicator from 'react-native-step-indicator';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { orderdetailsHandle } from "../../services/orderdetails"
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderKit from 'react-native-loader-kit';

const { width, height } = Dimensions.get("window");
const labels = ["Cart", "Delivery Address", "Order Summary", "Payment Method"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#E70736',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#E70736',
    stepStrokeUnFinishedColor: '#E70736',
    separatorFinishedColor: '#E70736',
    separatorUnFinishedColor: '#E70736',
    stepIndicatorFinishedColor: '#E70736',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#E70736',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#E70736',
    labelColor: '#E70736',
    labelSize: 13,
    currentStepLabelColor: '#E70736'
}
const OrderDetails = ({ route }) => {


    const [orderdetailsdata, setOrderdetailsdata] = useState<any>()
    const [currentPosition, setCurrentPosition] = useState<any>(0)
    const [loader, setLoader] = useState<any>(false)
    const navigation = useNavigation();

    const orderid = route.params;
    console.log("details", orderid._id);

    useEffect(() => {
        const orderDetail = async () => {
            setLoader(true)
            let Orderdata = await orderdetailsHandle(orderid._id)
            await AsyncStorage.setItem('orderIdForPlay', orderid._id)
            setOrderdetailsdata(Orderdata)
            setLoader(false)
        }
        orderDetail();
    }, [])
    useEffect(() => {
        console.log("queen Order", orderdetailsdata?.draws.product_price);
    }, [orderdetailsdata])
    const Data = [
        {
            label: 'Order Confirmed',
            datetime: 'Fri, 11th Fab 22'
        },
        {
            label: 'Shipped',
            datetime: 'Set, 12th Fab 22'
        },
        {
            label: 'Out For Delivery',
            datetime: 'Mon, 14th Fab 22'
        },
        {
            label: 'Delivered',
            datetime: 'Mon, 14th Fab 22'
        }
    ];
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
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), width: "78%", textAlign: "center" }}>Order Details</Text>
            </View>
            <View>
                {(!loader) ?
                    <ScrollView style={{ height: "90%", padding: "4%" }}>
                        <View style={{ width: "100%", borderRadius: 8, backgroundColor: "#FFFFFF", flexDirection: "column", marginBottom: "4%" }}>
                            <View style={{ flexDirection: "row", width: "100%", borderRadius: 10, padding: "3%" }}>
                                <View style={{ flexDirection: "column", }}>
                                    {(orderdetailsdata) ? (
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ color: COLORS.gray, fontSize: RFValue(13), ...FONTS.lexendregular }}>Order ID<Text style={{ textTransform: 'uppercase' }}> - {orderdetailsdata._id}</Text></Text>
                                        </View>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                        {(orderdetailsdata?.draws[0]?.draw_tickets && orderdetailsdata?.draws[0]?.draw_tickets.length > 0) ? null :
                            <View style={{ width: "100%", borderRadius: 8, backgroundColor: "#FFFFFF", paddingLeft: "3%", flexDirection: "row", marginBottom: "4%", alignItems: "center" }}>
                                <Text style={{ ...FONTS.lexendregular, color: COLORS.black, justifyContent: "center", width: "60%", paddingVertical: "2%" }}>To avail your tickets</Text>
                                <TouchableOpacity style={{ width: "40%", height: verticalScale(40), backgroundColor: COLORS.element, alignSelf: "flex-end", alignItems: "center", justifyContent: "center", flexDirection: "row", borderBottomEndRadius: 10, borderTopStartRadius: 10 }} onPress={() => navigation.navigate("PlayNow", orderid._id)}>
                                    <Text style={{ ...FONTS.lexendregular, color: COLORS.white, fontSize: RFValue(12) }}>Play Now</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {(orderdetailsdata) ? (orderdetailsdata.draws.map((data: any, index: any) => (
                            <View style={{ marginBottom: "4%" }} >
                                <View key={index} style={{ flexDirection: "row", backgroundColor: "white", borderRadius: 10 }}>
                                    <View style={{ flexDirection: "row", width: "65%", paddingVertical: "5%", paddingLeft: "3%" }}>
                                        <View style={{ flexDirection: "column", backgroundColor: COLORS.pagebackground, padding: "4%", width: "45%", alignItems: "center", borderRadius: 5 }}>
                                            <Image
                                                source={{ uri: data.draw.product_image }}
                                                resizeMode="contain"
                                                style={{ height: verticalScale(100), width: horizontalScale(80) }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: "column", width: "100%", paddingLeft: "4%", marginTop: RFValue(5) }}>
                                            <Text style={{ fontSize: RFValue(13), ...FONTS.lexendsemibold, color: COLORS.black }}>{data.draw.product_title}</Text>
                                            <Text style={{ fontSize: RFValue(13), ...FONTS.lexendregular, color: "#616161" }}>{data.draw.draw_title}</Text>
                                            <Text style={{ fontSize: RFValue(20), ...FONTS.lexendregular, color: "red", marginTop: "8%" }}>₹{Number(data.draw.product_price).toFixed(2)}</Text>
                                        </View>
                                    </View>
                                    {data.draw_tickets.length > 0 ?
                                        <View style={{ flexDirection: "column", width: "33%", marginLeft: "2%", justifyContent: "flex-end" }}>
                                            <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(12), color: "#000", textAlign: "right", marginRight: "5%", paddingVertical: "20%" }}>{data.draw_tickets.length} Tickets </Text>
                                        </View>
                                        :
                                        null
                                        // <View style={{ flexDirection: "column", width: "33%", marginLeft: "2%", justifyContent: "flex-end" }}>
                                        //     <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(10), color: "#000", textAlign: "right", marginRight: "5%" }}>Avail Your Ticket</Text>
                                        //     <TouchableOpacity style={{ width: "95%", backgroundColor: COLORS.element, alignSelf: "flex-end", flexDirection: "row", borderBottomEndRadius: 10, borderTopStartRadius: 10 }} onPress={() => navigation.replace("PlayNow", orderid._id)}>
                                        //         <Text style={{ width: "100%", textAlign: "center", paddingVertical: "8%", ...FONTS.lexendregular, color: COLORS.white, fontSize: RFValue(12) }}>Play Now</Text>
                                        //     </TouchableOpacity>
                                        // </View>
                                    }
                                </View>
                            </View>
                        ))) : null}
                        <View style={{ marginTop: 10 }}>
                            <View style={{ backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 8 }}>
                                <StepIndicator
                                    customStyles={customStyles}
                                    currentPosition={currentPosition}
                                    labels={labels}
                                    stepCount={4}
                                    direction="vertical"
                                    renderLabel={({ position, stepStatus, label, currentPosition }) => {
                                        return (
                                            <View style={{ padding: 10, paddingLeft: 5, width: width - 100 }}>
                                                <Text style={{ ...FONTS.lexendsemibold, color: "black" }}>{Data[position]?.label}</Text>
                                                <Text style={{}}>{Data[position]?.datetime}</Text>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        </View>
                        {/* <View style={{ marginVertical: "4%", borderRadius: 8, padding: 10, backgroundColor: "white", flexDirection: "row" }}>
                            <Image
                                source={icons.download}
                                style={{
                                    borderWidth: 1,
                                    paddingLeft: 10,
                                    width: 20,
                                    height: 20,
                                    flexDirection: "column"
                                }}
                            />
                            <Text style={{ flexDirection: "column", ...FONTS.lexendregular, color: COLORS.black }}>  Invoice <Text style={{ color: "#E70736" }}>{" "}download</Text> </Text>
                        </View> */}
                        <View style={{ borderRadius: 8, padding: 10, backgroundColor: "white", flexDirection: "row", marginTop: "4%" }}>
                            <View style={{ padding: 7 }}>
                                <Text style={{ ...FONTS.lexendsemibold, color: "black", fontSize: RFValue(15) }}>
                                    Shipping Details
                                </Text>
                                <Text style={{ marginTop: 8, ...FONTS.lexendregular, color: "black", fontSize: RFValue(12) }}>Davin connor</Text>
                                <Text style={{ marginTop: 8, ...FONTS.lexendregular, color: "#616161", fontSize: RFValue(12) }}>120, Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                <Text style={{ marginTop: 10, ...FONTS.lexendregular, color: "#616161", fontSize: RFValue(12) }}>Mobile:<Text style={{ marginTop: 10, ...FONTS.lexendregular, color: "black" }}> 9654896542 </Text></Text>
                            </View>
                        </View>
                        {(orderdetailsdata) ? (
                            <>
                                <View style={{ marginVertical: "4%", borderRadius: 8, padding: 5, backgroundColor: "white", flexDirection: "row", }}>
                                    <View style={{ width: "100%" }}>
                                        <Text style={{ ...FONTS.lexendsemibold, color: "black", padding: 10, fontSize: RFValue(13) }}>
                                            Price Details
                                        </Text>
                                        <View style={{ borderTopWidth: 1, borderColor: "#616161", width: "95%", marginLeft: RFValue(9) }} />
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 6 }}>
                                            <View style={{ flexDirection: "column" }}>
                                                <Text style={{ color: "gray", fontSize: RFValue(13), ...FONTS.lexendregular }}>Total MRP</Text>
                                            </View>
                                            <View style={{ flexDirection: "column" }}>
                                                <Text style={{ color: "gray", fontSize: RFValue(13), ...FONTS.lexendregular }}>₹{Number(orderdetailsdata.sub_total).toFixed(2)}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
                                            <View style={{ flexDirection: "column" }}>
                                                <Text style={{ color: "gray", fontSize: RFValue(13), ...FONTS.lexendregular }}>Tax (GST)</Text>
                                            </View>
                                            <View style={{ flexDirection: "column" }}>
                                                <Text style={{ color: "gray", fontSize: RFValue(13), ...FONTS.lexendregular }}>₹{Number(orderdetailsdata.tax).toFixed(2)}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 6 }}>
                                            <View style={{ flexDirection: "column" }}>
                                                <Text style={{ color: "gray", fontSize: RFValue(13), ...FONTS.lexendregular }}>Promo Code</Text>
                                            </View>
                                            <View style={{ flexDirection: "column" }}>
                                                <Text style={{ color: "gray", fontSize: RFValue(13), ...FONTS.lexendregular }}>₹{Number(orderdetailsdata.coupon_discount).toFixed(2)}</Text>
                                            </View>
                                        </View>
                                        {/* <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingBottom: 6 }}>
                                            <View style={{ flexDirection: "column" }}>
                                                <Text style={{ color: "gray", fontSize: RFValue(13), ...FONTS.lexendregular }}>Coins</Text>
                                            </View>
                                            <View style={{ flexDirection: "column" }}>
                                                <Text style={{ color: "gray", fontSize: RFValue(13), ...FONTS.lexendregular }}>₹{Number(orderdetailsdata.coin_redeem).toFixed(2)}</Text>
                                            </View>
                                        </View> */}
                                        <View style={{ borderTopWidth: 1, borderColor: "#616161", width: "95%", marginLeft: RFValue(9) }} />
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 6 }}>
                                            <View style={{ flexDirection: "column" }}>
                                                <Text style={{ color: "gray", fontSize: RFValue(13), ...FONTS.lexendregular }}>Total Amount</Text>
                                                <Text style={{ color: "gray", fontSize: RFValue(10), ...FONTS.lexendregular }}>Inclusive of Tax (GST)</Text>
                                            </View>
                                            <View style={{ flexDirection: "column" }}>
                                                <Text style={{ color: "gray", fontSize: RFValue(13), ...FONTS.lexendregular }}>₹{Number(orderdetailsdata.total).toFixed(2)}</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                                <View style={{ marginBottom: "4%", borderRadius: 8, backgroundColor: "white", height: RFValue(40) }}>
                                    <View style={{ margin: RFValue(10), flexDirection: "row", alignItems: "center" }}>
                                        <Text style={{ flexDirection: "column", color: "black", fontSize: 9 }}>{'\u2B24'}</Text>
                                        <Text style={{ ...FONTS.lexendregular, fontWeight: "400", color: "black", fontSize: RFValue(13), flexDirection: "column" }}> Debit Card ₹{Number(orderdetailsdata.total).toFixed(2)}</Text>
                                    </View>
                                </View>
                            </>
                        ) : null}
                        <View style={{ padding: 20 }}></View>
                    </ScrollView> :
                    <View style={{ width: "100%", alignItems: "center", height: "92%", justifyContent: "center" }}>
                        <LoaderKit
                            style={{ width: 100, height: 105 }}
                            name={'BallClipRotatePulse'} // Optional: see list of animations below
                            size={30} // Required on iOS
                            color={COLORS.element} // Optional: color can be: 'red', 'green',... or '#ddd', '#FFFFFF',
                        />
                    </View>
                }
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
        flexDirection: "row",
    },
    subdivTwo: {
        height: verticalScale(748),
        alignItems: "center",
        justifyContent: "center",
        // borderWidth:2
    },
    indicatorCOntainer: {
        height: height - 170,
        width: width - 30,
        padding: 30,
        margin: 15,
        elevation: 10,
        borderRadius: 20,
        backgroundColor: "red"
    }

})
export default OrderDetails;