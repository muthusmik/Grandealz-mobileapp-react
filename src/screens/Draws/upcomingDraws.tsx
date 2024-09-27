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
import { COLORS, FONTS } from '../../constants';
import { horizontalScale, verticalScale } from '../../constants/metrices';
import { RFValue } from 'react-native-responsive-fontsize';
import { drawCommingGet } from '../../services/register';
import { ActivityIndicator } from 'react-native';
import DrawEmpty from '../ExceptionScreens/DrawEmpty';

const UpcomingDraws = (filter) => {
    console.log("filter", filter.son)
    const [close, setClose] = useState<any>();

    useEffect(() => {
        setClose(filter.son)
    }, [filter])
    return (
        <View style={{ paddingHorizontal: 18 }}>
            {(filter.son).length > 0 ?
                <FlatList
                    data={close}
                    contentContainerStyle={{ marginTop: 10 }}
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
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: RFValue(13), color: COLORS.textHeader, ...FONTS.lexendsemibold, paddingVertical: 2 }}>{item.draw_title}</Text>
                                    <Text style={{ fontSize: RFValue(13), color: COLORS.textHeader, ...FONTS.lexendregular }}>{item.draw_sub_title}</Text>
                                    <Text style={{ fontSize: RFValue(13), color: COLORS.element, ...FONTS.lexendregular, paddingVertical: 2 }}>₹{Number(item.product_price).toFixed(2)}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                : <DrawEmpty value={"There are no Upcoming Draws at the moment. Please try again later."} />}
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
export default UpcomingDraws;