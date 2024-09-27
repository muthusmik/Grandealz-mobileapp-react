import React, { type PropsWithChildren, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import icons from '../constants/icons';
import image from '../constants/image';
import { COLORS, FONTS } from '../constants';
import { verticalScale, horizontalScale, moderateScale } from '../constants/metrices';
import EntypoIcons from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector, useStore } from 'react-redux';
import moment from "moment";
import Share from 'react-native-share';
import { addToWishlistHandle, wishlistHandle } from '../services/wishlist';
import { ourCartPage } from '../services/ourCart';
import { RemovewishlistHandle } from '../services/deletewishlist';
import { AddtoCartHandle } from '../services/addtocart';
import Toast from 'react-native-simple-toast';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const PriceDetails = ({ route }) => {
  const pricing = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cartList, setCartList] = useState<any>([]);
  const [wishedId, setWishedId] = useState<string>("");
  const [tabPrize, setTabPrize] = useState<any>(true);
  const [tabProd, setTabProd] = useState<any>(false);
  const [heart, setHeart] = useState<any>(false);

  // console.log("routedData.....................", pricing)


  const handleAddtoCart = async () => {
    const payload = { "draw": pricing._id, "qty": 1 }
    // console.log("payload", payload)
    let AddItemtoCart = await AddtoCartHandle(payload)
    if (AddItemtoCart.status === "200") {

      cartStock();
    }
    else {

      // setChanger(!changer);
    }
  }
  const RemoveWishlist = async () => {
    // console.log("Removewish........", wishedId);
    let Removeitems = await RemovewishlistHandle(wishedId)
    showHeartIfExists();

    // console.log("result...........", Removeitems)
  }
  const handleAddWishlist = async () => {
    // console.log("Addwish........", pricing._id);
    const result = await addToWishlistHandle(pricing._id);

    showHeartIfExists();
    // console.log("result...........", result)

  }
  const sharePage = async () => {
    const shareOptions = {
      title: pricing.draw_title,
      message: pricing.draw_description,
      url: pricing.draw_image,
      social: Share.Social.WHATSAPP,
      whatsAppNumber: "",  // country code + phone number
      filename: 'test', // only for base64 file in Android
    };
    Share.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }
  const showHeartIfExists = async () => {
    let priceitem = await wishlistHandle();
    // console.log("priceitem..........",priceitem)
    var WishIdArray: any[] = [];
    (priceitem).forEach((element: any) => {
      var Data = (element.draw._id);
      if (Data === pricing._id) {
        // console.log("trueeeeeeeeeeeee.........", element._id);
        setWishedId(element._id);
      }
      WishIdArray.push(Data);
    })
    if (WishIdArray.includes(pricing._id)) {
      // console.log(`true${pricing._id}`)
      setHeart(true);
    } else {
      //console.log(`false${pricing._id}`)
      setHeart(false);
    }
  }

  const cartStock = async () => {
    let ourCartStock = await ourCartPage()
    // console.log("CartData List on cart", ourCartStock)
    var AlreadyInCart: any = [];
    let data = ourCartStock?.draws;

    if (data) {
      (data).forEach((element: any) => {
        var Data = (element.draw._id);
        AlreadyInCart.push(Data);
      })
    }
    setCartList(AlreadyInCart);
    // console.log("dtaaaa.....................", AlreadyInCart)
  }
  const goToCart = async () => {
    if (!(cartList.includes(`${pricing._id}`))) {
      // console.log("data not in cart ")
      const payload = { "draw": pricing._id, "qty": 1 }
      let AddItemtoCart = await AddtoCartHandle(payload)
      if (AddItemtoCart.status === "200") {
        cartStock();
        navigation.navigate("Tabs", { screen: "Cart" })
      }
      else {
        Toast.show(AddItemtoCart.message, Toast.LONG, { backgroundColor: 'red' });

      }
    }
    else {
      // console.log("cart");
      navigation.navigate("Tabs", { screen: "Cart" })
    }
  }

  useEffect(() => {
    showHeartIfExists();
    cartStock();
  }, [])

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        backgroundColor={"#0a0127"}
      />
      <View style={{ height: "92%", width: "100%" }}>
        <View
          style={{
            backgroundColor: "#0a0127",
            height: verticalScale(80),
            justifyContent: "center",
          }}>
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: horizontalScale(18), flexDirection: "column" }}>
              <EntypoIcons name="chevron-left" size={30} style={{ flexDirection: "column" }} color={"white"} />
            </TouchableOpacity>
            {tabPrize ?
              <Text style={{ ...FONTS.lexendsemibold, color: "white", fontSize: RFValue(20), width: "78%", textAlign: "center" }}>Prize Details</Text>
              : null}
            {tabProd ?
              <Text style={{ ...FONTS.lexendsemibold, color: "white", fontSize: RFValue(20), width: "78%", textAlign: "center" }}>Product Details</Text>
              : null}
          </View>
        </View>
        <ScrollView style={{ padding: "4%", backgroundColor: COLORS.lightGray }}>
          <View style={{ borderRadius: 9, backgroundColor: "white", width: "100%" }}>
            <View style={{ flexDirection: "row", padding: 8, alignItems: "center" }}>
              <View style={{ height: verticalScale(30), width: horizontalScale(30) }}>
                <Image
                  source={image.calander}
                  resizeMode="contain"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </View>
              <View style={{ flexDirection: "column", width: "84%", marginLeft: "3%" }}>
                <Text style={{ color: COLORS.black, ...FONTS.lexendregular, fontSize: RFValue(13) }}>Max Draw Date: {moment(pricing.max_draw_date).format('MMMM DD,YYYY')}</Text>
                <Text style={{ color: "gray", ...FONTS.lexendregular, fontSize: RFValue(10) }}>Or earlier if the campaign is sold out</Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Image
                  source={icons.ellipsePink}
                  resizeMode="contain"
                  style={{ width: 8, height: 8, flexDirection: "row", bottom: 6 }}
                />
                <Image
                  source={icons.ellipseGray}
                  resizeMode="contain"
                  style={{ width: 8, height: 8, flexDirection: "row", top: 5 }}
                />
              </View>
            </View>
            <View style={{ borderWidth: 0.5, width: "100%", borderColor: "lightgrey" }} />
            <View style={{ alignItems: 'center' }}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", padding: "4%" }}>
                <View style={{ flexDirection: "column", alignSelf: "flex-start", marginLeft: "2%" }}>
                  <AnimatedCircularProgress
                    size={60}
                    width={4}
                    fill={pricing.total_no_of_sold_out_tickets / pricing.total_no_of_tickets * 100}
                    tintColor={COLORS.element}
                    rotation={0}
                    // onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor={COLORS.lightGray}>
                    {
                      (fill) => (
                        <>
                          {(pricing.total_no_of_sold_out_tickets !== pricing.total_no_of_tickets) ?
                            <View style={{ alignItems: "center" }}>
                              <Text style={{ color: "#E70736", ...FONTS.lexendregular, fontSize: 10, textAlign: "center" }}>{pricing.total_no_of_sold_out_tickets}</Text>
                              {/* <View style={{ backgroundColor: "#7F7E76B2", width: "80%", borderWidth: 1, borderColor: "#7F7E76B2" }} /> */}
                              <Text style={{ ...FONTS.lexendsemibold, alignSelf: "center", color: "black", fontSize: 8 }}>Sold
                                <Text style={{ ...FONTS.lexendregular, color: "black", fontSize: 8 }}> out of</Text></Text>
                              <Text style={{ color: "#E70736", ...FONTS.lexendregular, fontSize: 10, textAlign: "center" }}>{pricing.total_no_of_tickets}</Text>
                            </View> : <Text style={{ ...FONTS.lexendregular, alignSelf: "center", fontSize: 12, color: COLORS.element }}>All Sold</Text>
                          }
                        </>
                      )
                    }
                  </AnimatedCircularProgress>
                </View>
                <View style={{ alignSelf: "flex-end", flexDirection: "column", height: "100%" }}>
                  <TouchableOpacity onPress={() => { sharePage() }}>
                    <Image
                      source={icons.share}
                      style={{
                        width: 25,
                        height: 25
                      }}
                    />
                  </TouchableOpacity >
                  {!heart ?
                    <TouchableOpacity style={{ top: 12 }} onPress={() => handleAddWishlist()}>
                      <AntDesign name="hearto" size={25} color={"black"} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ top: 12 }} onPress={() => RemoveWishlist()}>
                      <AntDesign name="heart" size={25} color={COLORS.element} />
                    </TouchableOpacity>
                  }
                </View>
              </View>
              <View style={{ flexDirection: 'column', marginBottom: "6%" }}>
                {tabPrize ? <Image
                  source={{ uri: pricing.draw_image }}
                  resizeMode="contain"
                  style={{
                    width: 257,
                    height: 162,
                    borderRadius: 5
                  }}
                /> : null}
                {tabProd ?
                  <Image
                    resizeMode="contain"
                    source={{ uri: pricing.product_image }}
                    style={{
                      width: 257,
                      height: 162,
                      borderRadius: 5
                    }}
                  />
                  : null}
              </View>
            </View>
          </View>
          <View style={{ marginVertical: "5%", paddingBottom: "10%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "1%" }}>
              <TouchableOpacity style={{ flexDirection: "column", width: "48%", borderWidth: 1, borderColor: tabPrize ? COLORS.element : COLORS.black, borderRadius: 5 }} onPress={() => { setTabPrize(true), setTabProd(false) }}>
                <Text style={{ textAlign: "center", fontSize: RFValue(15), padding: "6%", backgroundColor: tabPrize ? COLORS.element : COLORS.lightGray, color: tabPrize ? "white" : "black", ...FONTS.lexendregular, borderRadius: 4 }}>Prize Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: "column", width: "48%", borderWidth: 1, borderColor: tabProd ? COLORS.element : COLORS.black, borderRadius: 5 }} onPressIn={() => { setTabPrize(false), setTabProd(true) }}>
                <Text style={{ textAlign: "center", fontSize: RFValue(15), backgroundColor: tabProd ? COLORS.element : COLORS.lightGray, color: tabProd ? "white" : "black", padding: "6%", ...FONTS.lexendregular, borderRadius: 4 }}>Product Details</Text>
              </TouchableOpacity>
            </View>
            {tabPrize ?
              <Text style={{ fontSize: RFValue(15), ...FONTS.lexendregular, color: COLORS.black, }}>{pricing.draw_sub_title}</Text> : null}
            {tabProd ?
              <Text style={{ fontSize: RFValue(15), ...FONTS.lexendregular, color: COLORS.black, }}>{pricing.product_title}</Text> : null}
            <Text style={{ color: COLORS.element, fontSize: RFValue(15), ...FONTS.lexendsemibold }}>₹{pricing.product_price} Cash</Text>
            {tabPrize ?
              <Text style={{ marginVertical: "3%", marginBottom: "7%", fontSize: RFValue(10), ...FONTS.lexendregular, color: COLORS.black, }}>{pricing.draw_description}</Text>
              : null}
            {tabProd ?
              <Text style={{ marginVertical: "3%", marginBottom: "7%", fontSize: RFValue(10), ...FONTS.lexendregular, color: COLORS.black, }}>{pricing.product_description}</Text>
              : null}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity style={{ flexDirection: "column", width: "48%" }} onPressIn={() => { navigation.navigate("Tabs") }} >
                <Text style={{ textAlign: "center", fontSize: RFValue(15), borderWidth: 1, padding: "6%", color: "#000", ...FONTS.lexendregular, borderRadius: 5 }}>Go to Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: "column", borderWidth: 1, borderRadius: 5, width: "48%" }} onPressIn={() => { navigation.navigate("Tabs", { screen: "Cart" }) }}>
                <Text style={{ textAlign: "center", fontSize: RFValue(15), padding: "6%", color: "#000", ...FONTS.lexendregular, borderRadius: 5 }}>
                  View Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* <View style={{ backgroundColor: "white",borderWidth:2 }}> */}
      <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: "space-between", height: "8%", paddingHorizontal: "4%", alignItems: "center" }}>
        {!(cartList.includes(`${pricing._id}`)) ?
          <TouchableOpacity style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", borderWidth: 1, borderRadius: 5, width: "48%", height: verticalScale(46), backgroundColor: COLORS.element, borderColor: COLORS.element }}>
            <Text style={{ fontSize: RFValue(15), color: "white", ...FONTS.lexendregular }} onPress={() => { handleAddtoCart() }}>ADD TO CART</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", borderWidth: 1, borderRadius: 5, width: "48%", height: verticalScale(46), backgroundColor: COLORS.element, borderColor: COLORS.element }}>
            <Text style={{ fontSize: RFValue(15), color: "white", ...FONTS.lexendregular }} onPress={() => { navigation.navigate("Tabs", { screen: "Cart" }) }}>VIEW CART</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", borderWidth: 1, borderRadius: 5, width: "48%", height: verticalScale(46) }} onPress={() => goToCart(/* route.params */)}>
          <Text style={{ fontSize: RFValue(15), color: "#000", ...FONTS.lexendregular }}>
            BUY NOW
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{ flexDirection: "row", marginVertical: "2%", justifyContent: "space-evenly" }}>
          <TouchableOpacity style={{ flexDirection: "column", borderRadius: 6 }}>
            <Text style={{ fontSize: RFValue(15), paddingHorizontal: 35, padding: 10, backgroundColor: COLORS.element, color: "white", ...FONTS.lexendregular, borderRadius: 8 }}> ADD TO CART</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "column", borderWidth: 1, borderRadius: 6, marginLeft: "2%" }}>
            <Text style={{ fontSize: RFValue(15), padding: 10, paddingHorizontal: 35, backgroundColor: "#fff", color: "#000", ...FONTS.lexendregular, borderRadius: 8 }}>
              BUY NOW
            </Text>
          </TouchableOpacity>
        </View> */}
      {/* </View> */}
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
    alignContent: "center",
    ...FONTS.lexendregular
  },

})
export default PriceDetails;
