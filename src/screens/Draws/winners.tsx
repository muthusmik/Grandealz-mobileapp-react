import React, { type PropsWithChildren } from 'react';
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
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../../constants';
import { verticalScale } from '../../constants/metrices';


const data = [
    {
        id: '1',
        imag: image.whitecar,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 soul out 1985"

    },
    {
        id: '2',
        imag: image.whitecar,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 soul out 1985"
    },
    {
        id: '3',
        imag: image.whitecar,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 soul out 1985"
    },
    {
        id: '4',
        imag: image.whitecar,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 soul out 1985"
    },
    {
        id: '5',
        imag: image.whitecar,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 soul out 1985"
    },
    {
        id: '6',
        imag: image.whitecar,
        from: "Lorem ipsum dolor sit amet Lorem ipsum dolor ipsum doolr",
        to: "1689 soul out 1985"
    },

];
const Winners = () => {
    return (

        <FlatList
            data={data}
            contentContainerStyle={{ width: "91%",alignSelf:"center",marginTop:"2%" }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={{ borderRadius: 9, backgroundColor: "white",alignItems:"center",paddingVertical:verticalScale(20),marginBottom:"5%" }}>
                    <TouchableOpacity>

                        <View>
                            <Image
                                source={image.drawsCar}
                                resizeMode={"contain"}
                                style={{ height: RFValue(150), width: RFValue(310) }}
                            />
                        </View>
                        <View style={{ marginLeft: "2%" }}>

                            <Text style={{ fontSize: RFValue(16), color: COLORS.topBackground, ...FONTS.lexendsemibold, padding: "1%" }}>CONGRATULATIONS </Text>
                            <Text style={{ fontSize: RFValue(14), color: COLORS.textHeader, marginHorizontal: "1%", ...FONTS.lexendregular }}>
                                <Text style={{ fontSize: RFValue(16), color: COLORS.textHeader }}>Arjun Bista </Text>
                                on Winning</Text>
                            <Text style={{ fontSize: RFValue(16), color: COLORS.textHeader, ...FONTS.lexendsemibold, marginHorizontal: "1%", paddingBottom: "1%" }}>1 entry our range Rover campaign</Text>
                            <Text style={{ fontSize: RFValue(12), color: COLORS.black, marginHorizontal: "1%", ...FONTS.lexendregular }}>Coupon no. LS-00090-A1205-D</Text>
                            <Text style={{ fontSize: RFValue(10), color: COLORS.gray, paddingTop: "5%", ...FONTS.lexendregular, marginHorizontal: "1%" }}>Announced on</Text>
                            <Text style={{ fontSize: RFValue(10), color: COLORS.gray, ...FONTS.lexendregular, marginHorizontal: "1%" }}>August 07.2022 8:05 PM</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        />


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
export default Winners;