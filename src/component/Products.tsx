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
import { COLORS, FONTS } from '../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { horizontalScale, verticalScale } from '../constants/metrices';
import Toast from 'react-native-simple-toast';
import { AddtoCartHandle } from "../services/addtocart";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { productDrawHandler } from '../store/reducers/productdraw';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Product = ({ addedCart, changer, change, soldPresence }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [close, setClose] = useState<any>();
    const [drawid, setDrawid] = useState(null);

    const DataInfo = useSelector(state => state.productDrawHandle.data)

    // console.log("datavvv..of....", addedCart)

    useEffect(() => {
        if (drawid) {
            const AddtoCartitems = async () => {
                const payload = { "draw": drawid, "qty": 1 }
                let AddItemtoCart = await AddtoCartHandle(payload)
                if (AddItemtoCart.status === "200") {
                    changer(!change)
                }
                else {
                    Toast.show(AddItemtoCart.message, Toast.LONG, { backgroundColor: 'red' });
                }
            }
            AddtoCartitems()
        }
    }, [drawid])

    const handleSearch = (value: any) => {
        navigation.navigate("PriceDetails", value)
    }

    return (
        <SafeAreaView >
            {DataInfo ?
                <View style={{ paddingHorizontal: "3%" }}>
                    <FlatList
                        data={DataInfo}
                        contentContainerStyle={{ paddingBottom: soldPresence ? 16 : "25%" }}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={{ borderTopEndRadius: 5, borderTopStartRadius: 5, borderTopWidth: 2, borderTopColor: "red", backgroundColor: "white", marginBottom: 12, borderBottomEndRadius: 8, borderBottomStartRadius: 8 }}>
                                <View style={{ alignSelf: "flex-end", marginRight: "5%", marginTop: 10 }}>
                                    <AnimatedCircularProgress
                                        size={60}
                                        width={4}
                                        fill={item.total_no_of_sold_out_tickets / item.total_no_of_tickets * 100}
                                        tintColor={COLORS.element}
                                        rotation={0}
                                        // onAnimationComplete={() => console.log('onAnimationComplete')}
                                        backgroundColor={COLORS.lightGray}>
                                        {
                                            (fill) => (
                                                <>
                                                    {(item.total_no_of_sold_out_tickets !== item.total_no_of_tickets) ?
                                                        <View style={{ alignItems: "center" }}>
                                                            <Text style={{ color: "#E70736", ...FONTS.lexendregular, fontSize: 10, textAlign: "center" }}>{item.total_no_of_sold_out_tickets}</Text>
                                                            {/* <View style={{ backgroundColor: "#7F7E76B2", width: "80%", borderWidth: 1, borderColor: "#7F7E76B2" }} /> */}
                                                            <Text style={{ ...FONTS.lexendsemibold, alignSelf: "center", color: "black", fontSize: 8 }}>Sold
                                                                <Text style={{ ...FONTS.lexendregular, color: "black", fontSize: 8 }}> out of</Text></Text>
                                                            <Text style={{ color: "#E70736", ...FONTS.lexendregular, fontSize: 10, textAlign: "center" }}>{item.total_no_of_tickets}</Text>
                                                        </View> : <Text style={{ ...FONTS.lexendregular, alignSelf: "center", fontSize: 12, color: COLORS.element }}>All Sold</Text>
                                                    }
                                                </>
                                            )
                                        }
                                    </AnimatedCircularProgress>
                                </View>
                                <TouchableOpacity disabled={item.total_no_of_sold_out_tickets / item.total_no_of_tickets != 1 ? false : true} style={{ flexDirection: 'column', width: "100%", marginTop: 6 }} onPress={() => handleSearch(item)}>
                                    <View style={{ height: verticalScale(162), width: horizontalScale(257), alignSelf: "center" }}>
                                        <Image
                                            source={{ uri: item.draw_image }}
                                            resizeMode="contain"
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                borderRadius: 5
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={item.total_no_of_sold_out_tickets / item.total_no_of_tickets != 1 ? false : true} style={{ marginVertical: 12, flexDirection: "row", width: "94%", alignSelf: "center", justifyContent: "space-between" }} onPress={() => handleSearch(item)}>
                                    <View style={{ flexDirection: "column", marginStart: "2%", width: "78%" }}>
                                        <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(24), color: "#E70736" }}>Win</Text>
                                        <Text style={{ fontSize: RFValue(13), color: "black", ...FONTS.lexendsemibold, }}>{item.draw_title}</Text>
                                        <Text style={{ fontSize: RFValue(12), color: "black", ...FONTS.lexendregular, }}>Buy {item.draw_sub_title} : <Text style={{ color: "red" }}>₹{item.product_price}</Text></Text>
                                    </View>
                                    <View style={{ padding: 2, alignSelf: "center", justifyContent: "center", width: "20%", borderWidth: 1, borderRadius: 10, borderColor: "#afb3b0" }}>
                                        <Image
                                            source={{ uri: item.product_image }}
                                            resizeMode="contain"
                                            style={{
                                                height: verticalScale(66),
                                                width: "100%",
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                {item.total_no_of_sold_out_tickets / item.total_no_of_tickets != 1 ?
                                    <>
                                        {!(addedCart.includes(`${item._id}`)) ?
                                            <TouchableOpacity style={{ borderWidth: 1, width: "80%", height: verticalScale(46), borderRadius: 5, alignSelf: "center", justifyContent: "center" }} onPress={() => setDrawid(item._id)}>
                                                <Text style={{ textAlign: "center", color: "black", fontSize: RFValue(15), ...FONTS.lexendsemibold }}>Add to Cart</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={{ borderWidth: 1, width: "80%", height: verticalScale(46), borderRadius: 5, alignSelf: "center", justifyContent: "center" }} onPressIn={() => { navigation.navigate("Tabs", { screen: "Cart" }) }}>
                                                <Text style={{ textAlign: "center", color: "black", fontSize: RFValue(15), ...FONTS.lexendsemibold }}>Go To Cart</Text>
                                            </TouchableOpacity>
                                        }
                                    </>
                                    :
                                    <TouchableOpacity disabled={true} style={{ borderWidth: 1, width: "80%", height: verticalScale(46), borderRadius: 5, backgroundColor: COLORS.lightGray, alignSelf: "center", justifyContent: "center" }} onPress={() => setDrawid(item._id)}>
                                        <Text style={{ textAlign: "center", color: "black", fontSize: RFValue(15), ...FONTS.lexendsemibold }}>Add to Cart</Text>
                                    </TouchableOpacity>
                                }
                                <View style={{ flexDirection: "row", paddingVertical: "4%", width: "100%" }}>
                                    <View style={{ flexDirection: "column", marginLeft: 10, width: horizontalScale(29), height: verticalScale(29), alignSelf: "center" }}>
                                        <Image
                                            source={image.calander}
                                            resizeMode="contain"
                                            style={{
                                                width: "100%",
                                                height: "100%"
                                            }} />
                                    </View>
                                    <View style={{ flexDirection: "column", alignSelf: "center", width: "83%" }}>
                                        <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(12), marginLeft: 6, ...FONTS.lexendsemibold, color: COLORS.black }}>
                                            Max Draw Date: {moment(item.max_draw_date).format('MMMM DD YYYY')}
                                        </Text>
                                        <Text style={{ fontSize: RFValue(10), marginLeft: 6, ...FONTS.lexendregular, color: "gray" }}>
                                            {(item.max_draw_date_description).substring(0, 100)}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: "column", alignSelf: "center" }}>
                                        <Image
                                            source={icons.ellipsePink}
                                            resizeMode="contain"
                                            style={{ width: 8, height: 8, flexDirection: "row", bottom: 2 }}
                                        />
                                        <Image
                                            source={icons.ellipseGray}
                                            resizeMode="contain"
                                            style={{ width: 8, height: 8, flexDirection: "row", top: 2 }}
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
                : null}
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
export default Product;
