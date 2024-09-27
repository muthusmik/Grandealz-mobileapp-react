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
import image from '../constants/image';
import icons from '../constants/icons';
import { COLORS, FONTS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { horizontalScale, verticalScale } from '../constants/metrices';
import { drawGetCall } from '../services/register';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { productDrawHandler } from '../store/reducers/productdraw';

const data = [
  {
    id: '1',
    imag: image.cash,
    from: "Lorem ipsum dolor sit amet, consectetur",
    to: "1689 sold out 1985"

  },
  {
    id: '2',
    imag: image.cash,
    from: "Lorem ipsum dolor sit amet, consectetur",
    to: "1689 sold out 1985"
  },
  {
    id: '3',
    imag: image.cash,
    from: "Lorem ipsum dolor sit amet, consectetur",
    to: "1689 sold out 1985"
  },
  {
    id: '4',
    imag: image.cash,
    from: "Lorem ipsum dolor sit amet, consectetur",
    to: "1689 sold out 1985"
  },

];
const ClosingSoon = () => {
  const navigation = useNavigation();
  const [closingsoondata, setClosingsoondata] = useState<any>();
  const dispatch = useDispatch();

  const DataInfo = useSelector(state => state.productDrawHandle?.data)

  // //drawGetCall
  // useEffect(() => {
  //   dispatch(productDrawHandler())
  //     .then(unwrapResult)
  //     .then((originalPromiseResult) => {

  //       let result = originalPromiseResult;

  //       var a: any[] = [];
  //       result.map((e: { total_no_of_sold_out_tickets: number; total_no_of_tickets: number; }) => {
  //         var data = (e.total_no_of_sold_out_tickets * 100 / e.total_no_of_tickets);
  //         if ((data>=80) && (data<100)) {
  //           a.push(e)
  //         }
  //         setClosingsoondata(a)
  //       })
  //     })
  // }, [])


  useEffect(() => {
    var ClosingSoon: any = [];
    (DataInfo).forEach((element: any) => {
      var Data = (element.total_no_of_sold_out_tickets * 100 / element.total_no_of_tickets)
      if ((Data >= 80) && (Data < 100)) {
        ClosingSoon.push(element);
      }
    })
    setClosingsoondata(ClosingSoon)
    console.log("ermmm", ClosingSoon)
  }, [])

  const handleSearch = (value: any) => {
    navigation.navigate("PriceDetails", value)
  }
  const handleProgressActive = (event: any) => {
    const val = (event.total_no_of_sold_out_tickets) / (event.total_no_of_tickets) * 100
    // console.log(`${val}%`);
    return `${val}%`
  }
  return (
    <>
      <SafeAreaView>
        {(closingsoondata?.length > 0) ? (
          <>
            <View style={{ marginLeft: "4%" }}>
              <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(18), ...FONTS.lexendsemibold, color: "black" }}>Closing Soon</Text>
              <View style={{ width: horizontalScale(40), borderWidth: 1, backgroundColor: "#E70736", borderColor: "#E70736" }} />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <FlatList
                horizontal={true}
                data={closingsoondata}
                // ItemSeparatorComponent={() => (
                //   <View style={{ width: 5 }} />
                // )}
                contentContainerStyle={{ marginHorizontal: "1%" }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={{ paddingHorizontal: horizontalScale(8) }}>
                    <TouchableOpacity style={{ borderRadius: 9, borderTopWidth: 2, borderTopColor: "#E70736", backgroundColor: "white", height: RFValue(145), width: RFValue(110) }} onPress={() => /* navigation.navigate("PriceDetails") */ handleSearch(item)}>
                      <View style={{ alignItems: 'center', borderTopEndRadius: 8, borderTopStartRadius: 8 }}>
                        <View style={{ flexDirection: 'column', marginTop: RFValue(12) }}>
                          {/* <Image
                            source={{ uri: item.product_image }}
                            // resizeMode="cover"
                            style={{
                              height: verticalScale(53),
                              width: horizontalScale(86),
                              borderRadius: 5
                            }}
                          /> */}
                          <Image
                            source={{ uri: item.draw_image }}
                            // resizeMode="cover"
                            style={{
                              height: verticalScale(53),
                              width: horizontalScale(86),
                              borderRadius: 5,
                              // position: "absolute",
                              // alignSelf: "flex-end",
                              // justifyContent: "center"
                            }}
                          />
                        </View>
                      </View>
                      <View style={{ width: "90%", borderRadius: 5, backgroundColor: "#f9f9f9", alignSelf: "center", alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: RFValue(10), color: COLORS.black, ...FONTS.lexendregular, marginVertical: 6 }}>{item.product_title}</Text>
                        <Text style={{ fontSize: RFValue(9), textAlign: "center", color: COLORS.black, ...FONTS.lexendregular }}>{item.total_no_of_sold_out_tickets} sold out of {item.total_no_of_tickets}</Text>
                        <View style={{ width: "70%", height: 6, borderColor: "#F1F1F1", borderWidth: 1, marginVertical: 6, borderRadius: 12, backgroundColor: COLORS.lightGray }}>
                          <Text style={{ backgroundColor: "#EC092D", width: handleProgressActive(item), borderRadius: 12 }}></Text>
                        </View>
                      </View>
                      {/* <View style={{ flexDirection: "row", justifyContent: "center", marginTop: RFValue(20), padding: 5 }}>
                        <Text style={{ fontSize: RFValue(10), color: COLORS.black, ...FONTS.lexendregular, lineHeight: 11.25, }}>{item.product_title}</Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: RFValue(9), textAlign: "center", color: COLORS.black, ...FONTS.lexendregular }}>{item.total_no_of_sold_out_tickets} sold out of {item.total_no_of_tickets}</Text>
                      </View>
                      <View style={{ marginLeft: "15%", width: "70%", height: "4%", borderColor: "#F1F1F1", borderWidth: 1, margin: 2, borderRadius: 12, backgroundColor: "#F1F1F1" }}>
                        <Text style={{ backgroundColor: "#EC092D", width: handleProgressActive(item), borderRadius: 12 }}></Text>
                      </View> */}
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </>
        ) : null}
      </SafeAreaView>
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

})
export default ClosingSoon;
