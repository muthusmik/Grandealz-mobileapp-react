import React, { type PropsWithChildren, useEffect, useState } from 'react';
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
import { CartDrawlistHandle } from "../../services/cartdrawslist";
import { useIsFocused } from "@react-navigation/core";
import Toast from 'react-native-simple-toast';
import { AddtoCartHandle } from "../../services/addtocart";

const CartRelated = ({ cartdts, changer, setChanger }) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [similarproduct, setSimilarproduct] = useState<any>();
    const [drawid, setDrawid] = useState();
    const [count, setCount] = useState(0);
    const [logic, setLogic] = useState(true)
    const [cartList, setCartList] = useState(cartdts);

    useEffect(() => {
        if (isFocused) {
            cartIdList();
        }
    }, [cartdts])

    useEffect(() => {
        if (isFocused) {
            CartDrawlist();
            cartIdList();
        }
    }, [isFocused])

    const CartDrawlist = async () => {
        let drawdatalist = await CartDrawlistHandle()
        var Alreadysoldout: any = [];
        (drawdatalist.data).forEach((element: any) => {
            if (element.total_no_of_sold_out_tickets / element.total_no_of_tickets != 1) {
                Alreadysoldout.push(element);
            }
        })
        setSimilarproduct(Alreadysoldout)
    }
    useEffect(() => {

        if (similarproduct) {
            { cartList.length === similarproduct.length ? setLogic(false) : setLogic(true) }
        }
    }, [cartList])

    useEffect(() => {
        if (drawid) {
            const AddtoCartitems = async () => {
                const payload = { "draw": drawid, "qty": 1 }
                let AddItemtoCart = await AddtoCartHandle(payload)
                if (AddItemtoCart.status === "200") {
                    setChanger(!changer);
                }
                else {
                    Toast.show(AddItemtoCart.message, Toast.LONG, { backgroundColor: 'red' });
                    setChanger(!changer);
                }
            }
            AddtoCartitems()
        }
    }, [drawid])
    const cartIdList = () => {
        var AlreadyInCart: any[] = [];
        let data = cartdts?.draws;
        if (data) {
            (data).forEach((element: any) => {
                var Data = (element.draw._id);
                AlreadyInCart.push(Data);
            })
        }
        setCartList(AlreadyInCart);
    }
    return (
        <View>
            {logic ?
                <>
                    <View style={{ marginVertical: "4%" }}>
                        <Text style={{ color: "#616161", fontSize: RFValue(13), ...FONTS.lexendsemibold, }}>People Have also bought this together</Text>
                    </View>
                    <FlatList
                        horizontal={true}
                        data={similarproduct}
                        showsHorizontalScrollIndicator={false}
                        // ItemSeparatorComponent={() => (
                        //     <View style={{ width: 10 }} />
                        // )}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <>
                                {!(cartList.includes(`${item._id}`)) ?
                                    <View style={{ marginRight: 14 }}>
                                        <View style={{ backgroundColor: COLORS.white, borderRadius: 5, width: RFValue(154), padding: RFValue(15) }}>
                                            <TouchableOpacity>
                                                <View style={{ backgroundColor: "#F9F9F9", padding: 4 }}>
                                                    <Image
                                                        source={{ uri: item.product_image }}
                                                        resizeMode={'contain'}
                                                        style={{
                                                            height: RFValue(95),
                                                            width: RFValue(95),
                                                            margin: 10
                                                        }}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <View>
                                                <Text style={{ color: COLORS.textHeader, fontSize: RFValue(12), ...FONTS.lexendsemibold, marginVertical: 4 }}>{item.currency} {item.product_price} Cash</Text>
                                                <Text style={{ color: "#616161", fontSize: RFValue(12), ...FONTS.lexendregular, marginBottom: 2 }}>{item.product_title}</Text>
                                                <Text style={{ color: COLORS.element, fontSize: RFValue(12), ...FONTS.lexendregular, }}>₹{Number(item.product_price).toFixed(2)}</Text>
                                            </View>
                                            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", borderWidth: 1, borderRadius: 5, marginTop: 16, height: verticalScale(26), width: "90%", alignSelf: "center" }} onPress={() => { setDrawid(item._id), setCount(count + 1) }}>
                                                <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular }}>Add</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    : null}
                            </>
                        )}
                    />
                </>
                : null}
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
export default CartRelated;