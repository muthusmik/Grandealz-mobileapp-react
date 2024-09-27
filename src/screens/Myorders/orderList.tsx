import React, { useState, type PropsWithChildren } from 'react';
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
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { horizontalScale, verticalScale } from '../../constants/metrices';
import { ActivityIndicator } from 'react-native';
import OrderEmpty from '../ExceptionScreens/orderEmpty';
import { useEffect } from 'react';


const OrderList = ({ orderlist }) => {
    const navigation = useNavigation();
    const [filterdata, setData] = useState<any>(orderlist);
    //const filterdata =orderlist
    useEffect(() => {
        setData(orderlist)
    }, [orderlist])
    return (
        <SafeAreaView >
            <View >
                {orderlist ?
                    <>
                        {orderlist.message === 'success' ?
                            <FlatList
                                data={filterdata.data}
                                contentContainerStyle={{ paddingBottom: "5%" }}
                                keyExtractor={item => item._id}
                                renderItem={({ item }) => (
                                    <View style={{ marginBottom: "4%" }}>
                                        <TouchableOpacity onPress={() => navigation.navigate("OrderDetails", item)}>
                                            <View style={{ flexDirection: "row", backgroundColor: "#fff", borderRadius: 10 }} >
                                                <View style={{ alignItems: 'center', width: "30%", padding: "2%" }}>
                                                    <View style={{ flexDirection: 'column', width: "100%", height: verticalScale(100), borderRadius: 5, backgroundColor: COLORS.lightGray, alignItems: "center" }}>
                                                        <Image
                                                            source={{ uri: item.draws.draw.product_image }}
                                                            resizeMode="contain"
                                                            style={{ height: "100%", width: "90%" }}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ padding: 10, width: "45%", alignSelf: "center" }}>
                                                    <Text style={{ fontSize: RFValue(13), ...FONTS.lexendsemibold, color: COLORS.black }}>{(item.draws.draw.product_title).substring(0, 15)}{(item.draws.draw.product_title).length > 20 ? "..." : ""}</Text>
                                                    <Text style={{ fontSize: RFValue(13), ...FONTS.lexendregular, color: "#616161" }}>{(item.draws.draw.draw_title).substring(0, 15)}{(item.draws.draw.draw_title).length > 20 ? "..." : ""}</Text>
                                                    <Text style={{ fontSize: RFValue(13), ...FONTS.lexendregular, color: "red" }}>₹{Number(item.draws.draw.product_price).toFixed(2)}</Text>
                                                    <Text style={{ fontSize: RFValue(13), ...FONTS.lexendregular, color: "#616161", marginTop: RFValue(7) }}>{item.draws.draw_tickets.length === 0 ? 1 : item.draws.draw_tickets.length} Tickets</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", marginVertical: "2%", marginStart: "3%" }}>
                                                    <View style={{ flexDirection: "column", justifyContent: "center", marginStart: horizontalScale(30) }}>
                                                        <Image
                                                            source={icons.next}
                                                            style={{
                                                                borderWidth: 1,
                                                                width: verticalScale(30),
                                                                height: verticalScale(25)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                            :
                            <View style={{ marginTop: "25%" }}>
                                <OrderEmpty value={orderlist.message} />
                            </View>}
                    </>
                    :
                    <View style={{ marginTop: "25%" }}>
                        <OrderEmpty value={"You haven't placed any order yet!"} />
                    </View>}
            </View>
        </SafeAreaView>
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
export default OrderList;