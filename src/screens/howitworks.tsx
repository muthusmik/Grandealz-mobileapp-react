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
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import icons from "../constants/icons";
import image from "../constants/image";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../constants";

const HowItWorks = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: "#F1F1F", height: "100%" }}>
            <StatusBar
                animated={true}
                backgroundColor="#0a0127"
            />
            <View style={styles.subdivOne}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: horizontalScale(18) }}>
                    <EntypoIcons name="chevron-left" size={30} style={{ flexDirection: "column" }} color={"white"} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), textAlign: "center", width: "75%" }}>How It Works</Text>
            </View>
            <ScrollView>
                <View style={{ padding: "2%", backgroundColor: COLORS.lightGray, width: "100%" }}>
                    <View style={{ marginTop: 14 }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(20), color: "#E70736" }}>How It Work in 3 Steps</Text>
                            <Text style={{ ...FONTS.lexendregular, fontSize: RFValue(13), textAlign: "center", width: "88%", color: "#616161", marginTop: 10 }}>Simply buy our products and get a chance to win luxury prizes</Text>
                        </View>
                        <View style={{ backgroundColor: "white", borderRadius: 5, width: "72%", height: verticalScale(348), alignSelf: "center", marginTop: 14 }}>
                            <View style={{ alignSelf: "flex-start", marginLeft: "4%", alignItems: "center", borderRightColor: "#7F7E76", borderTopEndRadius: 30, borderTopStartRadius: 30, borderBottomEndRadius: 30, borderBottomStartRadius: 30, borderWidth: 3, marginTop: "4%", height: verticalScale(46), width: "44%", borderColor: "#D8000D", flexDirection: "row" }}>
                                <View style={{ flexDirection: "column", marginLeft: "8%" }}>
                                    <Text style={{ color: "#E70736", ...FONTS.lexendregular, fontSize: RFValue(13), textAlign: "center" }}>1000</Text>
                                    <Text style={{ ...FONTS.lexendsemibold, alignSelf: "center", color: "black", fontSize: RFValue(10), }}> Sold</Text>
                                </View>
                                <View style={{ backgroundColor: "#7F7E76B2", height: verticalScale(26), marginHorizontal: "8%", borderWidth: 1, borderColor: "#7F7E76B2" }} />
                                <View style={{ flexDirection: "column" }}>
                                    <Text style={{ ...FONTS.lexendregular, color: " rgba(127, 126, 118, 0.7)", fontSize: RFValue(9) }}> OUT OF</Text>
                                    <Text style={{ color: "#E70736", ...FONTS.lexendregular, fontSize: RFValue(13), textAlign: "center" }}>1500</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: "center", width: horizontalScale(314), height: "36%", right: "14%", flexDirection: "row", marginVertical: "2%" }}>
                                <View style={{ alignSelf: "flex-end" }}>
                                    <Image
                                        source={icons.backarrow1}
                                        resizeMode="contain"
                                        style={{
                                            width: 80, height: 60
                                        }}
                                    />
                                    <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(10) }}>Win This*</Text>
                                </View>
                                <View style={{ alignSelf: "center", flexDirection: "row", width: "76%", marginTop: "6%", right: "6%" }}>
                                    <View style={{ width: "100%" }}>
                                        <Image
                                            source={image.audi}
                                            resizeMode="contain"
                                            style={{
                                                width: "100%"
                                            }}
                                        />
                                    </View>
                                    <View style={{ right: "72%", top: "26%" }}>
                                        <Image
                                            source={icons.greenTshirt}
                                            resizeMode="contain"
                                            style={{
                                                width: 76, height: 76
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{ right: "24%", alignSelf: "flex-end", top: "2%" }}>
                                    <Text style={{ ...FONTS.lexendsemibold, marginLeft: "22%", color: COLORS.black, fontSize: RFValue(10) }}>Buy This</Text>
                                    <Image
                                        source={icons.backarrow2}
                                        resizeMode="contain"
                                        style={{
                                            width: 80, height: 60
                                        }}
                                    />
                                </View>
                            </View>
                            <Text style={{ ...FONTS.lexendregular, fontSize: RFValue(10), color: COLORS.gray, textAlign: "center", marginTop: "12%" }}>Buy a Hashtag Hoodie <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(10), color: "#E70736" }}>₹1500</Text></Text>
                            <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, alignSelf: "center", width: "70%", marginTop: "4%" }} onPress={() => navigation.navigate("Tabs")}>
                                <Text style={{ ...FONTS.lexendregular, fontSize: RFValue(10), textAlign: "center", padding: "5%", color: "black" }}>Start Shopping</Text>
                            </TouchableOpacity>
                            <Text style={{ ...FONTS.lexendregular, fontSize: RFValue(10), color: "black", textAlign: "center", marginVertical: "3%" }}>Get a chance to <Text style={{ ...FONTS.lexendregular, fontSize: RFValue(10), color: "#E70736" }}>WIN</Text></Text>
                            <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(13), color: "black", textAlign: "center" }}>All new Audi entron GT </Text>
                        </View>
                        <Text style={{ ...FONTS.lexendregular, fontSize: RFValue(10), color: "#616161", textAlign: "center", marginTop: "4%" }}>*Terms and condition apply</Text>
                        <View style={{ marginTop: "5%", width: "100%", alignItems: "center" }}>
                            <View>
                                <Image
                                    source={icons.rect}
                                    resizeMode="contain"
                                    style={{ width: 80, height: 70 }}
                                />
                                <View style={styles.textView}>
                                    <Text style={styles.imageText}>1</Text>
                                </View>
                            </View>
                            <Text style={{ textAlign: "center", ...FONTS.lexendsemibold, fontSize: RFValue(20), color: "#E70736" }}>Shop From our Products</Text>
                            <Text style={{ ...FONTS.lexendregular, fontSize: RFValue(13), color: "#616161", textAlign: "center", width: "60%" }}>Select from our wide range of clothing and stationery</Text>
                            <Image
                                source={icons.howgrpimg}
                                resizeMode="contain"
                                style={{
                                    width: 360, height: 300
                                }}
                            />
                        </View>
                        <View style={{ marginTop: "4%", width: "100%", alignItems: "center" }}>
                            <View>
                                <Image
                                    source={icons.rect}
                                    resizeMode="contain"
                                    style={{ width: 80, height: 70 }}
                                />
                                <View style={styles.textView}>
                                    <Text style={styles.imageText}>2</Text>
                                </View>
                            </View>
                            <Text style={{ textAlign: "center", ...FONTS.lexendsemibold, fontSize: RFValue(20), color: "#E70736", width: "84%" }}>Get complimentary coupons to enter the draw</Text>
                            <Text style={{ ...FONTS.lexendregular, fontSize: RFValue(13), color: "#616161", textAlign: "center", marginTop: "2%" }}>With each product purchased, you are awarded a complimentary coupon to a prize draw.</Text>
                            <TouchableOpacity style={{ backgroundColor: "white", flexDirection: "row", width: horizontalScale(350), alignSelf: "center", height: verticalScale(164), borderRadius: 6, marginTop: "4%" }}>
                                <View style={{ flexDirection: "column", width: horizontalScale(30), right: horizontalScale(10), alignSelf: "center", backgroundColor: COLORS.lightGray, height: verticalScale(45), borderBottomEndRadius: 55, borderTopEndRadius: 55 }} />
                                <View style={{ flexDirection: "column", width: horizontalScale(300), right: horizontalScale(10) }}>
                                    <View style={{ flexDirection: "row", padding: 8, borderBottomWidth: 2 }}>
                                        <View style={{ flexDirection: "column", alignSelf: "center", width: horizontalScale(208) }}>
                                            <View>
                                                <Image
                                                    source={icons.ticketicon}
                                                    resizeMode="contain"
                                                    style={{ height: verticalScale(40), width: horizontalScale(120) }}
                                                />
                                            </View>
                                            <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(10), paddingVertical: 8 }}>Draw Title :- <Text style={{ ...FONTS.lexendregular }}>Lorem Ipsum is simply</Text></Text>
                                            <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(10) }}>Product :- <Text style={{ ...FONTS.lexendregular }}> Pencil</Text></Text>
                                            <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(10), paddingVertical: 8 }}>Purchased on :- <Text style={{ ...FONTS.lexendregular, color: COLORS.gray }}>12.08.22 09:55</Text></Text>
                                        </View>
                                        <View style={{ flexDirection: "column", backgroundColor: COLORS.element, borderRadius: 10, width: horizontalScale(100), right: horizontalScale(16), height: verticalScale(105), top: verticalScale(10), alignItems: "center" }}>
                                            {/* <Text style={{ ...FONTS.lexendregular, color: "white", textAlign: "center" }}></Text> */}
                                            <Image
                                                source={image.cars}
                                                resizeMode="contain"
                                                style={{ height: "100%", width: "100%" }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: "1.5%", alignItems: "flex-end" }}>
                                        <Text style={{ ...FONTS.lexendsemibold, color: COLORS.gray, fontSize: RFValue(10) }}>Ticket no. <Text style={{ ...FONTS.lexendregular, color: COLORS.element }}>20-232301-32133265</Text></Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "column", width: horizontalScale(30), alignSelf: "center", backgroundColor: COLORS.lightGray, height: verticalScale(45), borderBottomStartRadius: 50, borderTopStartRadius: 50 }} />
                            </TouchableOpacity>
                            <View style={{ width: horizontalScale(350), paddingHorizontal: 8, backgroundColor: "white", elevation: 3, borderBottomEndRadius: 8, borderBottomStartRadius: 8, alignItems: "flex-end" }}>
                                <Text style={{ ...FONTS.lexendsemibold, color: COLORS.gray, fontSize: RFValue(10), paddingVertical: 8 }}>Ticket no. <Text style={{ ...FONTS.lexendregular, color: COLORS.element }}>20-232301-32133265</Text>{"       "}</Text>
                            </View>
                            <View style={{ width: horizontalScale(350), paddingHorizontal: 8, backgroundColor: "white", elevation: 2, borderBottomEndRadius: 8, borderBottomStartRadius: 8, alignItems: "flex-end" }}>
                                <Text style={{ ...FONTS.lexendsemibold, color: COLORS.gray, fontSize: RFValue(10), paddingVertical: 8 }}>Ticket no. <Text style={{ ...FONTS.lexendregular, color: COLORS.element }}>20-232301-32133265</Text>{"       "}</Text>
                            </View>
                            <View style={{ width: horizontalScale(350), paddingHorizontal: 8, backgroundColor: "white", elevation: 1, borderBottomEndRadius: 8, borderBottomStartRadius: 8, alignItems: "flex-end" }}>
                                <Text style={{ ...FONTS.lexendsemibold, color: COLORS.gray, fontSize: RFValue(10), paddingVertical: 8 }}>Ticket no. <Text style={{ ...FONTS.lexendregular, color: COLORS.element }}>20-232301-32133265</Text>{"       "}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: "4%", width: "100%", alignItems: "center" }}>
                            <View>
                                <Image
                                    source={icons.rect}
                                    resizeMode="contain"
                                    style={{ width: 80, height: 70 }}
                                />
                                <View style={styles.textView}>
                                    <Text style={styles.imageText}>3</Text>
                                </View>
                            </View>
                            <Text style={{ textAlign: "center", ...FONTS.lexendsemibold, fontSize: RFValue(20), color: "#E70736", width: "84%" }}>Win luxury Prizes</Text>
                            <Text style={{ ...FONTS.lexendregular, width: "85%", fontSize: RFValue(13), color: "#616161", textAlign: "center", marginTop: "2%" }}>Once all product within a campaign are sold, the draw will happen and the winner will be announced</Text>
                            <View style={{}}>
                                <Image
                                    source={image.group}
                                    resizeMode="contain"
                                    style={{
                                        width: 380, height: 300
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={{ borderWidth: 1, alignSelf: "center", marginVertical: 12, justifyContent: "center", borderRadius: 5, width: "85%", height: 45 }}
                                onPress={() => navigation.navigate("Faq")}
                            >
                                <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(15), color: COLORS.black, width: "100%", textAlign: "center" }}>Have Question? Read Our Faqs</Text>
                            </TouchableOpacity>
                        </View>
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
    },
    textView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    imageText: {
        fontSize: 20,
        color: 'white',
        fontFamily: "Lexend-SemiBold"
    },

})
export default HowItWorks;