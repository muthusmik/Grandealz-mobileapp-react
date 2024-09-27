import React from 'react'
import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, ImageBackground, Modal } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale, verticalScale } from '../../constants/metrices';
import { icons } from '../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

const Playnowquizsubmit = (props) => {

    const responseFromPlay = props.route.params;
    const navigation = useNavigation();
    console.log("Props in play now quiz................", props.route.params)
    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <StatusBar
                animated={true}
                backgroundColor="#0a0127"
            />
            <View style={Style.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={true}
                    onRequestClose={() => navigation.goBack()}
                >
                    <View style={Style.maindiv}>
                        <View style={{ marginTop: verticalScale(15) }}>
                            <View style={Style.subdiv2}>
                                <Image
                                    source={icons.loginwhite}
                                    resizeMode='contain'
                                    style={{
                                        height: verticalScale(160),
                                        width: horizontalScale(180),
                                        marginLeft: "12%"
                                    }}
                                />
                            </View>
                            <View style={Style.subdiv3}>
                                <View style={{ alignItems: "center", height: 130, width: horizontalScale(310), marginVertical: "10%" }}>
                                    <View style={{ marginTop: 1, borderWidth: 5, borderColor: "#DADADA", height: verticalScale(140), width: horizontalScale(130), borderRadius: 100, backgroundColor: "#2A2141" }}>
                                        <ImageBackground source={icons.conlogo} style={{ position: "absolute", width: 75, height: 75, marginLeft: 20, marginTop: 15 }}></ImageBackground>
                                    </View>
                                </View>
                                <View style={{ width: horizontalScale(280), height: verticalScale(80), alignSelf: "center" }}>
                                    <Text style={{ fontSize: RFValue(16), fontFamily: "Lexend-SemiBold", textAlign: "center", lineHeight: 30, color: "#303030" }}>Congratulations! Avail your tickets at</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.replace("Tabs", { screen: 'Tickets' })}>
                                    <View style={{ alignItems: "center" }}>
                                        <View style={{ backgroundColor: "#EEEEEE", width: horizontalScale(200), height: verticalScale(45), borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ fontSize: RFValue(15), color: "#D10359", fontFamily: "Lexend-SemiBold" }}>Link</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignSelf: "center", marginTop: "8%", borderWidth: 1, borderRadius: 8, width: horizontalScale(300), padding: "4%" }}
                                    onPress={() => navigation.replace("MyOrders")}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 18, fontFamily: "Lexend-Regular", color: "#0a0127" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}
const Style = StyleSheet.create({
    maindiv: {
        width: horizontalScale(375),
        height: "auto",
        backgroundColor: "#0a0127",
        borderWidth: 2,
        borderColor: "red"
    },
    subdiv2: {
        marginTop: "10%",
        width: horizontalScale(330),
        height: verticalScale(140),
        justifyContent: "center",
        alignItems: "center"
    },
    subdiv3: {
        width: horizontalScale(330),
        height: verticalScale(480),
        marginLeft: 20,
        borderRadius: 15,
        backgroundColor: "#FFFFFF"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.3)",
    },

})
export default Playnowquizsubmit;