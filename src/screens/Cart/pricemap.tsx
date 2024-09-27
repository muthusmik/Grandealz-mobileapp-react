import React, { useEffect, useState, type PropsWithChildren } from 'react';
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
import image from '../../constants/image';
import icons from '../../constants/icons';
import { COLORS, FONTS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { horizontalScale, moderateScale, verticalScale } from '../../constants/metrices';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const data = [
    {
        id: '1',
        imag: image.cash,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 sold out 1985"

    },
    {
        id: '2',
        imag: image.cash,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 sold out 1985"
    },
    {
        id: '3',
        imag: image.cash,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 sold out 1985"
    },
    {
        id: '4',
        imag: image.cash,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 sold out 1985"
    },
    {
        id: '5',
        imag: image.cash,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 sold out 1985"
    },
    {
        id: '6',
        imag: image.cash,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 sold out 1985"
    },
    {
        id: '7',
        imag: image.cash,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 sold out 1985"
    },
];
const PriceMap = ({ priceval }) => {

    const navigation = useNavigation();
    const [cartAmountDetails, setCartAmountDetails] = useState<any>(priceval);
    useEffect(() => {
        setCartAmountDetails(priceval)
    }, [priceval])

    return (
        <View style={{ width: "100%", borderRadius: 10, backgroundColor: COLORS.white, alignSelf: "center", marginVertical: verticalScale(20) }}>
            <View style={{ width: "100%", borderRadius: 10, padding: "3%", backgroundColor: COLORS.white }}>
                <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendsemibold, alignItems: "flex-start" }}>Price Details</Text>
                <View style={{ borderBottomColor: "#616161", borderBottomWidth: 1, alignItems: "flex-start", marginTop: "3%" }} />
                <View style={{ width: "100%", alignSelf: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "3%" }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular }}>Total MRP </Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular, }}>₹ {Number(cartAmountDetails.sub_total).toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "3%" }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular }}>Tax(GST) </Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular, }}>₹ {Number(cartAmountDetails.tax).toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: "2%", marginTop: "3%" }}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular, }}>Promo Code </Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular, }}>-₹ {Number(cartAmountDetails.coupon_discount).toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ borderBottomColor: "#616161", borderBottomWidth: 1, alignItems: "flex-start" }} />
                <View style={{ width: "100%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: "1%", alignItems: "center" }}>
                        <View style={{ flexDirection: "column", marginTop: "3%" }}>
                            <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular }}>Total Amount</Text>
                            <Text style={{ fontSize: RFValue(10), color: COLORS.gray, ...FONTS.lexendregular }}>Inclusive of Tax (GST)</Text></View>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular }}>₹{Number(cartAmountDetails.total).toFixed(2)}</Text>
                        </View>
                    </View>
                    {/* <View>
                        <Text style={{ fontSize: RFValue(10), color: COLORS.gray, ...FONTS.lexendregular }}>Inclusive of Tax (GST)</Text>
                    </View> */}
                </View>
            </View>
        </View>

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
export default PriceMap;