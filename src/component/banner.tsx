import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper'
import { useDispatch } from 'react-redux';
import { FONTS } from '../constants';
import icons from '../constants/icons';
import image from '../constants/image';
import { verticalScale, horizontalScale, moderateScale } from '../constants/metrices';
import { bannerHandler } from '../store/reducers/Banners';
import { unwrapResult } from '@reduxjs/toolkit';

const Banner = (data) => {
  const detail = data?.data;
  const banner = detail?.data

  return (
    <View style={{ height: "112%", width: "102%" }}>
      {banner ?
        <Swiper style={{}} loop={false}
          dot={
            <View
              style={{
                backgroundColor: '#D10359',
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                // marginTop: 100,
                marginBottom: 3,
                bottom: "4%"
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#D10359',
                width: 25,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                // marginTop: 100,
                marginBottom: 3,
                bottom: "4%"
              }}
            />
          }
        >
          {banner[0] ?
            <View style={{ height: "100%", width: "100%", paddingRight: "2%" }}>
              <ImageBackground
                source={{ uri: banner[0].background_image }}
                resizeMode="repeat"
                imageStyle={{ borderRadius: 8 }}
                style={{ flexDirection: "row", paddingHorizontal: "5%", paddingTop: "8.5%", height: "100%" }}
              >
                <View style={{ flexDirection: "column", width: "65%", height: "70%" }}>
                  <Text style={{ color: "white", fontSize: moderateScale(5), ...FONTS.lexendregular, width: "100%", height: "8%", marginTop: "2%" }}>{banner[0].title}</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(11), ...FONTS.lexendregular, width: "100%", height: "35%" }}>{banner[0].title}</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(5), ...FONTS.lexendregular, width: "100%", height: "30%" }}>{banner[0].description}</Text>
                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 8, borderColor: "white", width: "50%", height: "22%", justifyContent: "center" }} onPress={() => { banner[0].btn_url }}>
                    <Text style={{ color: "white", fontSize: moderateScale(10), ...FONTS.lexendregular, textAlign: "center" }}>{banner[0].btn_text}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "35%", height: "63%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    source={{ uri: banner[0].image }}
                    resizeMode="contain"
                    style={{
                      width: verticalScale(170),
                      height: 105,
                      // right: 40
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
            : null}
          {banner[1] ?
            <View style={{ height: "100%", width: "100%", paddingRight: "2%" }}>
              <ImageBackground
                source={{ uri: banner[1].background_image }}
                resizeMode="repeat"
                imageStyle={{ borderRadius: 8 }}
                style={{ flexDirection: "row", paddingHorizontal: "5%", paddingTop: "8.5%", height: "100%" }}
              >
                <View style={{ flexDirection: "column", width: "65%", height: "70%" }}>
                  <Text style={{ color: "white", fontSize: moderateScale(5), ...FONTS.lexendregular, width: "100%", height: "8%", marginTop: "2%" }}>{banner[1].title}</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(11), ...FONTS.lexendregular, width: "100%", height: "35%" }}>{banner[1].title}</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(5), ...FONTS.lexendregular, width: "100%", height: "30%" }}>{banner[1].description}</Text>
                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 8, borderColor: "white", width: "50%", height: "22%", justifyContent: "center" }} onPress={() => { banner[1].btn_url }}>
                    <Text style={{ color: "white", fontSize: moderateScale(10), ...FONTS.lexendregular, textAlign: "center" }}>{banner[1].btn_text}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "35%", height: "63%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    source={{ uri: banner[1].image }}
                    resizeMode="contain"
                    style={{
                      width: 170,
                      height: 105,
                      // right: 40
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
            : null}
          {banner[2] ?
            <View style={{ height: "100%", width: "100%", paddingRight: "2%" }}>
              <ImageBackground
                source={{ uri: banner[2].background_image }}
                resizeMode="repeat"
                imageStyle={{ borderRadius: 8 }}
                style={{ flexDirection: "row", paddingHorizontal: "5%", paddingTop: "8.5%", height: "100%" }}
              >
                <View style={{ flexDirection: "column", width: "65%", height: "70%" }}>
                  <Text style={{ color: "white", fontSize: moderateScale(5), ...FONTS.lexendregular, width: "100%", height: "8%", marginTop: "2%" }}>{banner[2].title}</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(11), ...FONTS.lexendregular, width: "100%", height: "35%" }}>{banner[2].title}</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(5), ...FONTS.lexendregular, width: "100%", height: "30%" }}>{banner[2].description}</Text>
                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 8, borderColor: "white", width: "50%", height: "22%", justifyContent: "center" }} onPress={() => { banner[2].btn_url }}>
                    <Text style={{ color: "white", fontSize: moderateScale(10), ...FONTS.lexendregular, textAlign: "center" }}>{banner[2].btn_text}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "35%", height: "63%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    source={{ uri: banner[2].image }}
                    resizeMode="contain"
                    style={{
                      width: 170,
                      height: 105,
                      // right: 40
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
            : null}
          {banner ? null :
            <View style={{ height: "100%", width: "100%", paddingRight: "2%" }}>
              <ImageBackground
                source={image.backimage}
                resizeMode="repeat"
                imageStyle={{ borderRadius: 8 }}
                style={{ flexDirection: "row", paddingHorizontal: "5%", paddingTop: "8.5%", height: "100%" }}
              >
                <View style={{ flexDirection: "column", width: "65%", height: "70%" }}>
                  <Text style={{ color: "white", fontSize: moderateScale(5), ...FONTS.lexendregular, width: "100%", height: "8%", marginTop: "2%" }}>This is Lorem ipsum Text</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(11), ...FONTS.lexendregular, width: "100%", height: "35%" }}>This is Lorem ipsum Text</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(5), ...FONTS.lexendregular, width: "100%", height: "30%" }}>This is Lorem ipsum Text This is Lorem ipsum Text This is Lorem ipsum Text This is Lorem ipsum Text</Text>
                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 8, borderColor: "white", width: "50%", height: "22%", justifyContent: "center" }} onPress={() => { }}>
                    <Text style={{ color: "white", fontSize: moderateScale(10), ...FONTS.lexendregular, textAlign: "center" }}>Detail</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "35%", height: "63%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    source={image.group}
                    resizeMode="contain"
                    style={{
                      width: 170,
                      height: 105,
                      // right: 40
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          }
          {/* <View style={{}}>
          <View style={{ backgroundColor: "#070022", borderRadius: 8, marginHorizontal: "1%" }}>
            <View style={{ marginVertical: "11.5%", marginHorizontal: "5%", flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "column", width: "65%", height: "110%" }}>
                <Text style={{ color: "white", fontSize: moderateScale(4.69), ...FONTS.lexendregular }}>{banner[0].title}</Text>
                <Text style={{ color: "white", fontSize: moderateScale(10.56), ...FONTS.lexendregular }}>{banner[0].title}</Text>
                <Text style={{ color: "white", fontSize: moderateScale(4.69), marginTop: "9%", ...FONTS.lexendregular, width: RFValue(170) }}>{banner[0].description}</Text>
                <TouchableOpacity style={{ borderWidth: 1, borderRadius: 8, borderColor: "white", marginTop: "6%", width: "50%", height: "24%", justifyContent: "center" }} onPress={() => { banner[0].btn_url }}>
                  <Text style={{ color: "white", fontSize: moderateScale(9.5), ...FONTS.lexendregular, textAlign: "center" }}>{banner[0].btn_text}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: "35%", flexDirection: "column", alignItems: "center" }}>
                <Image
                  source={{ uri: banner[0].image }}
                  resizeMode="contain"
                  style={{
                    width: 170,
                    height: 100,
                    // right: 40
                  }}
                />
              </View>
            </View>
          </View> */}
          {/* </View> */}
          {/* <View style={{}}>
            <View style={{ backgroundColor: "#070022", borderRadius: 8, paddingHorizontal: "1%" }}>
              <View style={{ marginVertical: "11.5%", marginHorizontal: "5%", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "column", width: "65%", height: "110%" }}>
                  <Text style={{ color: "white", fontSize: moderateScale(4.69), ...FONTS.lexendregular }}>{banner[1].title}</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(10.56), ...FONTS.lexendregular }}>{banner[1].title}</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(4.69), marginTop: "9%", ...FONTS.lexendregular, width: RFValue(170) }}>{banner[1].description}</Text>
                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 8, borderColor: "white", marginTop: "6%", width: "50%", height: "24%", justifyContent: "center" }} onPress={() => { banner[1].btn_url }}>
                    <Text style={{ color: "white", fontSize: moderateScale(9.5), ...FONTS.lexendregular, textAlign: "center" }}>{banner[1].btn_text}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "35%", flexDirection: "column", alignItems: "center" }}>
                  <Image
                    source={{ uri: banner[1].image }}
                    resizeMode="contain"
                    style={{
                      width: 180,
                      height: 120,
                      // right: 40
                    }}
                  />
                </View>
              </View>
            </View>
          </View> */}
          {/* <View style={{}}>
            <View style={{ backgroundColor: "#070022", borderRadius: 8, marginHorizontal: "1%" }}>
              <View style={{ marginVertical: "11.5%", marginHorizontal: "5%", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "column", width: "65%", height: "110%" }}>
                  <Text style={{ color: "white", fontSize: moderateScale(4.69), ...FONTS.lexendregular }}>Lorem Ipsum is simply dummy text of the printing.</Text>
                  <Text style={{ color: "white", fontSize: moderateScale(10.56), ...FONTS.lexendregular }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
                  <Text style={{ color: "white", fontSize: moderateScale(4.69), marginTop: "9%", ...FONTS.lexendregular, width: RFValue(170) }}>Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is simply dummy text of the printing.</Text>
                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 8, borderColor: "white", marginTop: "6%", width: "50%", height: "24%", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontSize: moderateScale(9.5), ...FONTS.lexendregular, textAlign: "center" }}>See Details</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "35%", flexDirection: "column", alignItems: "center" }}>
                  <Image
                    source={image.group}
                    resizeMode="contain"
                    style={{
                      width: 180,
                      height: 120,
                      // right: 40
                    }}
                  />
                </View>
              </View>
            </View>
          </View> */}
        </Swiper>
        : null}
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    height: "27%"
  },
  slide1: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
export default Banner;
