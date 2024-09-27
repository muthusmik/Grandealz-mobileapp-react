import React, { type PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import Banner from '../../component/banner';
import Carsold from '../../component/Carsold';
import ClosingSoon from '../../component/closingdata';
import Product from '../../component/Products';
import icons from '../../constants/icons';
import image from '../../constants/image';
import { COLORS, FONTS } from '../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { horizontalScale, moderateScale, verticalScale } from '../../constants/metrices';

const data = [
  {
    id: '1',
    imag: image.cash,
    from: "Lorem Ipsum is simply dummy ",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "20 october, 08:20PM"
  },
  {
    id: '2',
    imag: image.cash,
    from: "Lorem Ipsum is simply dummy ",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "20 october, 08:20PM"
  },
  {
    id: '3',
    imag: image.cash,
    from: "Lorem Ipsum is simply dummy ",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "20 october, 08:20PM"
  },
  {
    id: '4',
    imag: image.cash,
    from: "Lorem Ipsum is simply dummy ",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "20 october, 08:20PM"
  },
  {
    id: '5',
    imag: image.cash,
    from: "Lorem Ipsum is simply dummy ",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "20 october, 08:20PM"
  },
  {
    id: '6',
    imag: image.cash,
    from: "Lorem Ipsum is simply dummy ",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "20 october, 08:20PM"
  },
  {
    id: '7',
    imag: image.cash,
    from: "Lorem Ipsum is simply dummy ",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "20 october, 08:20PM"
  },
  {
    id: '8',
    imag: image.cash,
    from: "Lorem Ipsum is simply dummy ",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "20 october, 08:20PM"
  },
  {
    id: '9',
    imag: image.cash,
    from: "Lorem Ipsum is simply dummy ",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "20 october, 08:20PM"
  },
  {
    id: '10',
    imag: image.cash,
    from: "Lorem Ipsum is simply dummy ",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "20 october, 08:20PM"
  },

];
const NotificationList = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} >

      <View style={{ flex: 0.9 }}>
        <StatusBar
          animated={true}
          backgroundColor={"#0a0127"}
        />
        <View
          style={{
            backgroundColor: "#0a0127",
          }}>

          <View style={{ height: verticalScale(80), justifyContent: 'center' }}>
            <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), textAlign: "center" }}>Notifications</Text>
          </View>
        </View>

        <View style={{}}>
          <FlatList
            data={data}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={{ paddingHorizontal: "4%", marginTop: 14 }}>
                <TouchableOpacity style={{ backgroundColor: "white", borderRadius: 5, elevation: 1, flexDirection: "row", paddingVertical: moderateScale(10) }}>
                  <View style={{ flexDirection: "column", width: horizontalScale(10), height: verticalScale(10), marginStart: 6,marginTop:5 }}>
                    <Image
                      source={icons.rect}
                      resizeMode="contain"
                      style={{
                        height: "100%",
                        width: "100%"
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "column", width: "72%", marginLeft: 6,marginTop:0  }}>
                    <Text style={{ fontSize: 13, ...FONTS.lexendsemibold, color: COLORS.black }}>{item.from}</Text>
                    <Text style={{ fontSize: 10, ...FONTS.lexendregular, color: "#000", marginTop: 4, marginBottom: 8 }}>{item.to}</Text>
                    <Text style={{ fontSize: 13, ...FONTS.lexendregular, color: COLORS.gray }}>{item.date}</Text>
                  </View>
                  <View style={{ flexDirection: "column", width: horizontalScale(70), backgroundColor: COLORS.lightGray, height: verticalScale(70), alignSelf: "center", alignItems: "center", justifyContent: "center", borderRadius: 5 }}>
                    <Image
                      source={item.imag}
                      resizeMode="contain"
                      style={{
                        width: 70,
                        height: 43,
                        borderRadius: 2
                        // top: 9,
                        // left: 4
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
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
export default NotificationList;