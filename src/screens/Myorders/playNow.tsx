import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, verticalScale } from "../../constants/metrices";
import { COLORS, FONTS, icons } from "../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import image, { audicar } from "../../constants/image";
import { useNavigation } from "@react-navigation/native";
import { orderdata, quizGet } from "../../services/quizGet";
import Toast from 'react-native-simple-toast';

const PlayNow = (props: any) => {

    const navigation = useNavigation();
    const orderId = props.route.params;
    const [orderDetails, setOrderDetails] = useState();
    const [title, setTitle] = useState();
    // console.log("Order Id......", orderId)
    const callingApiForQuiz = async () => {
        await quizGet().then((originalPromiseResult) => {
            // console.log("Quiz response in play now.................", originalPromiseResult.data.data)
            if (originalPromiseResult.status == "200") {
                navigation.replace("playnowquiz", originalPromiseResult?.data?.data, orderId)
            }
            else {
                Toast.show('Something went wrong!, Please try again later', Toast.LONG, { backgroundColor: 'red' });
            }
        })
    }
    useEffect(() => {
        // console.log("inside ap call");
        callingOrderId(orderId);
    }, [])

    const callingOrderId = async (orderId: any) => {
        let res = await orderdata(orderId)
        console.log("ffgtvrtbtr..........", res.data.draws);

        if (res.status === "200") {
            setOrderDetails(res.data.draws[0].draw.draw_image);
            setTitle(res.data.draws[0].draw.draw_title)
            console.log("result in order", res.data.draws[0].draw.draw_image)
        }
        else {
            Toast.show('Something went wrong!, Please try again later', Toast.LONG, { backgroundColor: 'red' });
        }
    }
    return (
        <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" }}>
            <StatusBar
                animated={true}
                backgroundColor="#0a0127"
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => navigation.goBack()}
            >
                <View style={Style.maindiv}>
                    <View style={Style.subdiv2}>
                        <Image
                            source={icons.loginwhite}
                            resizeMode='contain'
                            style={{
                                height: verticalScale(110),
                                width: horizontalScale(180),
                            }}
                        />
                    </View>
                    <View style={Style.subdiv3}>
                        <View style={{ width: "100%", backgroundColor: "#FF636C", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                            <Text style={{ fontSize: RFValue(16), color: "#FFFFFF", textAlign: "center", ...FONTS.lexendregular, padding: "4%" }}>{(title) ? title : "The All new Audi Q3"}</Text>
                        </View>
                        <View style={{ width: "90%", marginVertical: verticalScale(18), alignSelf: 'center' }}>
                            <Text style={{ textAlign: "center", color: "#303030", fontFamily: "Lexend-Regular", fontSize: 13 }}>
                                Please provide an answer to the question and avail your ticket.
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <View style={{ borderWidth: 0.5, borderColor: "lightgray", width: "94%", borderRadius: 10, alignSelf: "center" }}>
                                <View style={{ width: "100%", backgroundColor: "#FF636C", borderTopLeftRadius: 9, borderTopRightRadius: 9 }}>
                                    <Text style={{ fontSize: RFValue(16), color: "#FFFFFF", textAlign: "center", padding: "4%", ...FONTS.lexendregular }}>Chance to win</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flexDirection: "column", width: "38%", height: verticalScale(110), alignItems: "center", borderRadius: 5, margin: 10, backgroundColor: COLORS.lightGray }}>
                                        {(orderDetails) ? <Image
                                            source={{ uri: orderDetails }}
                                            resizeMode={"contain"}
                                            style={{ height: "90%", width: "90%", justifyContent: "center" }}
                                        /> :
                                            <Image
                                                source={image.audicar}
                                                resizeMode={"contain"}
                                                style={{ height: "90%", width: "90%", justifyContent: "center" }}
                                            />
                                        }
                                    </View>
                                    <View style={{ flexDirection: "column", width: "50%", alignSelf: "center" }}>
                                        <Text style={{ fontSize: RFValue(16), color: "#0a0127", fontFamily: "Lexend-Regular" }}>{(title) ? title : "The All new Audi Q3"}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: "center", marginTop: "8%", borderWidth: 1, borderRadius: 8, width: "94%", padding: "4%" }} onPress={() => callingApiForQuiz()}>
                            <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "Lexend-SemiBold", color: "black" }}>Start</Text>
                        </TouchableOpacity>
                        <View style={{ marginVertical: "5%" }}>
                            <Text style={{ fontSize: 15, textAlign: "center", color: "#E70736", fontFamily: "Lexend-Regular" }}>Terms and conditions</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    submaindiv: {
        width: horizontalScale(375),
        height: verticalScale(900),
        backgroundColor: "#0a0127",
    },
    subdiv1: {
        margin: 20,
        width: horizontalScale(330),
        height: 70,
        alignItems: "center"

    },
    subdiv2: {
        width: horizontalScale(330),
        height: verticalScale(550),
        marginLeft: 20,
        borderRadius: 15,
        backgroundColor: "#FFFFFF"
    }
})
const Style = StyleSheet.create({
    centeredView: {
        flex: 1,
        height: "100%",
        Width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red",
    },
    maindiv: {
        marginTop: "22%",
        justifyContent: "center",
        alignSelf: 'center',
        // backgroundColor: "rgba(11, 0, 41, 0.8)",
        backgroundColor: COLORS.primary,
        width: "90%",
        // height: "auto",
        paddingBottom: "20%",
        borderRadius: 20
    },
    subdiv2: {
        width: "100%",
        alignItems: "center",
    },
    subdiv3: {
        width: "90%",
        height: "auto",
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "white"
    },
})
export default PlayNow;
