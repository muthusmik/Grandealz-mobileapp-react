import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Image,
    FlatList,
    useColorScheme,
    View,
    TouchableOpacity,
} from 'react-native';
import image from '../../constants/image';
import icons from '../../constants/icons';
import { COLORS, FONTS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { horizontalScale, moderateScale, verticalScale } from '../../constants/metrices';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CheckBox from "@react-native-community/checkbox";
import EntypoIcons from "react-native-vector-icons/Entypo";

const AddNewPayee = () => {
    const navigation = useNavigation();
    const CheckBoxes = () => {
        const [isSelected, setSelection] = useState(false);
        return (
            <View style={{ flexDirection: "row", left: horizontalScale(17) }}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkBox}
                    tintColors={{ true: COLORS.element }}
                />

            </View>
        )
    }

    return (
        <>
            <View style={styles.subdivOne}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: horizontalScale(18), flexDirection: "column" }}>
                    <EntypoIcons name="chevron-left" size={30} style={{ flexDirection: "column" }} color={"white"} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), width: "80%", textAlign: "center" }}>Add New Card</Text>
            </View>
            <View style={{ borderColor: "red", width: "100%", padding: "4%", height: verticalScale(740) }}>
                <View style={{ borderRadius: 8, width: "100%", backgroundColor: COLORS.white }}>
                    <Text style={{ color: COLORS.gray, fontSize: RFValue(10), marginHorizontal: "5%", marginTop: "3%", ...FONTS.lexendregular }}>Credit/Debit Card number</Text>
                    <TextInput
                        keyboardType={"number-pad"}
                        placeholder="xxxx xxxx xxxx xxxx"
                        maxLength={16}
                        placeholderTextColor={COLORS.textHeader}
                        style={{ marginStart: "5%", fontSize: RFValue(20), ...FONTS.lexendregular, color: COLORS.black }}
                    />
                </View>
                <View style={{ flexDirection: "row", width: "100%", marginVertical: "4%" }}>
                    <View style={{ flexDirection: "column", width: "50%" }}>
                        <View style={{ borderRadius: 8, width: "95%", backgroundColor: COLORS.white }}>
                            <Text style={{ color: COLORS.gray, fontSize: RFValue(10), marginHorizontal: "5%", marginTop: "3%", ...FONTS.lexendregular }}>Expiry Date</Text>
                            <TextInput
                                keyboardType={"numbers-and-punctuation"}
                                placeholder="xx/xx"
                                maxLength={5}
                                placeholderTextColor={COLORS.textHeader}
                                style={{ marginStart: "5%", fontSize: RFValue(20), ...FONTS.lexendregular, color: COLORS.black }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "column", width: "50%" }}>
                        <View style={{ borderRadius: 8, width: "99%", backgroundColor: COLORS.white }}>
                            <Text style={{ color: COLORS.gray, fontSize: RFValue(10), marginHorizontal: "5%", marginTop: "3%", ...FONTS.lexendregular }}>Enter CVV</Text>
                            <TextInput
                                keyboardType={"number-pad"}
                                placeholder="xxx"
                                maxLength={3}

                                placeholderTextColor={COLORS.textHeader}
                                style={{ marginStart: "5%", fontSize: RFValue(20), ...FONTS.lexendregular, color: COLORS.black }}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: "2%", flexDirection: "row", width: "95%", alignItems: "center" }}>
                    <CheckBoxes />
                    <Text style={{ color: COLORS.textHeader, fontSize: RFValue(12), ...FONTS.lexendregular, paddingHorizontal: "5%" }}>Save the card for future purchases.</Text>
                </View>


                <TouchableOpacity style={{ alignSelf: "center", marginTop: "15%", marginHorizontal: "3%", marginBottom: "2%", padding: "3%", flexDirection: "row", width: "35%", borderWidth: 1, borderRadius: 10, alignItems: "center", justifyContent: "center", }}>
                    <Text style={{ color: COLORS.textHeader, fontSize: RFValue(16), ...FONTS.lexendsemibold, paddingHorizontal: "5%" }}>Pay Now</Text>

                </TouchableOpacity>
            </View>
        </>
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
    checkBox: {
        alignSelf: "center",
        flexDirection: "column",
    }
})
export default AddNewPayee;