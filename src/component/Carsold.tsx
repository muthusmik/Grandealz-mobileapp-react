import React, { type PropsWithChildren, useState, useEffect } from 'react';
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
import image from '../constants/image';
import icons from '../constants/icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS, COLORS } from '../constants';
import { horizontalScale, verticalScale } from '../constants/metrices';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

interface CarSoldProps {
    soldPresence: any
}

const Carsold = (props: CarSoldProps) => {
    const navigation = useNavigation();
    const [soldoutdata, setSoldoutdata] = useState<any>();
    //drawGetCall

    const DataInfo = useSelector(state => state?.productDrawHandle?.data)

    useEffect(() => {
        var Alreadysoldout: any = [];
        (DataInfo).forEach((element: any) => {
            if (element.total_no_of_sold_out_tickets / element.total_no_of_tickets == 1) {
                Alreadysoldout.push(element);
            }
        })
        setSoldoutdata(Alreadysoldout)
        if (Alreadysoldout && Alreadysoldout.length > 0) {
            props.soldPresence(true)
        }
        else {
            props.soldPresence(false)
        }
        console.log("SoldOut Data in carsold.tsx", soldoutdata)
    }, [DataInfo])

    return (
        <SafeAreaView >
            {(soldoutdata && soldoutdata.length > 0) &&
                <>
                    <View>
                        <LinearGradient
                            colors={["#D10359", "#EC092D"]}
                            style={{ paddingVertical: verticalScale(10), backgroundColor: "#D10359", height: verticalScale(250), width: "100%" }}
                        >
                            <Text style={{ marginLeft: 24, ...FONTS.lexendregular, fontWeight: "600", color: COLORS.white, fontSize: RFValue(15) }}>
                                SOLD OUT
                            </Text>
                            <View style={{ marginLeft: "6.5%", width: "10%", borderTopWidth: 2 }} />
                            <Text style={{ marginLeft: 24, ...FONTS.lexendregular, color: COLORS.white, marginTop: "1%", paddingBottom: "30%" }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text>
                        </LinearGradient>
                    </View>
                    <View style={{ bottom: 142, position: "relative" }} >
                        <FlatList
                            data={soldoutdata}
                            contentContainerStyle={{}}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={{ paddingHorizontal: "6%", marginBottom: 14 }}>
                                    <View style={{ borderRadius: 9, backgroundColor: "white", paddingVertical: 20 }}>
                                        <View style={{ alignItems: 'center', borderTopEndRadius: 8, borderTopStartRadius: 8, flexDirection: 'column' }}>
                                            <Image
                                                source={{ uri: item.draw_image }}
                                                resizeMode="contain"
                                                style={{
                                                    height: verticalScale(180),
                                                    width: horizontalScale(280),
                                                    // margin: "3%",
                                                    borderRadius: 5
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: horizontalScale(280), alignSelf: "center", marginTop: 10 }}>
                                            <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(13), fontWeight: "600", color: "black" }}>Campaign:- {item.draw_title}</Text>
                                            <Text style={{ ...FONTS.lexendregular, fontSize: RFValue(13), fontWeight: "300", color: "black" }}>{item.draw_sub_title}</Text>
                                            <Text style={{ ...FONTS.lexendregular, fontSize: RFValue(13), fontWeight: "400", color: "#E70736" }}>Draw date to be announced</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </>
            }
        </SafeAreaView >
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
export default Carsold;
