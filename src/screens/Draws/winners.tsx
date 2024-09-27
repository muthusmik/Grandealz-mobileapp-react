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
import image from '../../constants/image';
import icons from '../../constants/icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../../constants';
import { horizontalScale, verticalScale } from '../../constants/metrices';
import { drawWinnerGet } from '../../services/register';
import { ActivityIndicator } from 'react-native';
import OrderEmpty from '../ExceptionScreens/orderEmpty';
import DrawEmpty from '../ExceptionScreens/DrawEmpty';
import { drawWinnerfilter } from '../../services/register';
const Winners = (filters) => {
    console.log("winners", filters.win)
    const [close, setClose] = useState<any>();
    const [flalistRefresh, setFlatListRefresh] = useState<any>();
    useEffect(() => {
        setClose(filters.win)
    }, [filters])

    // const remainingData = async () => {
    //     let data = {
    //         "skip": 1
    //     }
    //     let closingData = await drawWinnerfilter(data)
    //     console.log(closingData.data);
    //     setFlatListRefresh(closingData.data);
    // }
    return (
        <View style={{ paddingHorizontal: 18 }}>
            {close ?
                <FlatList
                    data={close}
                    contentContainerStyle={{ marginTop: 10 }}
                    // extraData={flalistRefresh}
                    // overScrollMode={'never'}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={{ borderRadius: 5, backgroundColor: "white", paddingVertical: 16, marginBottom: 14 }}>
                            <TouchableOpacity style={{ width: "90%", alignSelf: "center" }}>
                                <View style={{ height: verticalScale(180), width: "100%", alignSelf: "center" }}>
                                    <Image
                                        source={{ uri: item.draw_image }}
                                        resizeMode="contain"
                                        style={{ height: "100%", width: "100%", borderRadius: 5 }}
                                    />
                                </View>
                                <View>
                                    <Text style={{ fontSize: RFValue(15), color: COLORS.topBackground, ...FONTS.lexendsemibold, paddingVertical: 2 }}>CONGRATULATIONS </Text>
                                    <Text style={{ fontSize: RFValue(12), color: COLORS.textHeader, ...FONTS.lexendregular }}>
                                        <Text style={{ fontSize: RFValue(12), color: COLORS.textHeader, ...FONTS.lexendsemibold }}>{item.winner.user.first_name} {item.winner.user.last_name} </Text>
                                        on Winning</Text>
                                    <Text style={{ fontSize: RFValue(13), color: COLORS.textHeader, ...FONTS.lexendsemibold, paddingVertical: 2 }}>1 entry our {item.draw_title}</Text>
                                    <Text style={{ fontSize: RFValue(12), color: COLORS.black, ...FONTS.lexendregular }}>Ticket no. {item.winner.draw_ticket}</Text>
                                    {/* <Text style={{ fontSize: RFValue(10), color: COLORS.gray, paddingTop: "3%", ...FONTS.lexendregular, marginHorizontal: "1%", paddingHorizontal: "3.5%" }}>Announced on</Text>
                                    <Text style={{ fontSize: RFValue(10), color: COLORS.gray, ...FONTS.lexendregular, marginHorizontal: "1%", paddingHorizontal: "3.5%" }}>August 07,2022 8:05 PM</Text> */}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                // onEndReachedThreshold={0.2}
                // onEndReached={remainingData}
                />
                : <DrawEmpty value={"There are no Winner Announced at the moment. Please try again later."} />}
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
export default Winners;