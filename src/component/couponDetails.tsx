import React, { type PropsWithChildren,useEffect,useState } from 'react';
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
import { horizontalScale, verticalScale } from '../constants/metrices';
import { COLORS, FONTS } from '../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { couponPage } from '../services/copoun';
import { TextInput } from 'react-native-paper';


const data = [
    {
        id: '1',
        imag: icons.ticketicon,
        imag1: image.cash,
        video: "Lorem Ipsum is simply",
        price: "1500 Cash",
        watchedOn: "12.08.22 09:55pm",
        ticketno: "20-232301-32133265",

    },
    {
        id: '2',
        imag: icons.ticketicon,
        imag1: image.cash,
        video: "Lorem Ipsum is simply",
        price: "1500 Cash",
        watchedOn: "12.08.22 09:55pm",
        ticketno: "20-232301-32133265",
    },
    {
        id: '3',
        imag: icons.ticketicon,
        imag1: image.cash,
        video: "Lorem Ipsum is simply",
        price: "1500 Cash",
        watchedOn: "12.08.22 09:55pm",
        ticketno: "20-232301-32133265",
    },
    

];
const CouponDetails = () => {
    const [dataoff , setDataOff]=useState();
    useEffect(()=>{
        const coupn = async ()=>{
             let offer= await couponPage()
             console.log("offer coupons",offer);
            setDataOff(offer)
         }
         coupn();
     },[]) 

     const[applycoupon,setApplycoupon]=useState("")
     const[error,setError]=useState("")
    //  console.log(applycoupon)

    const validatePromocode=()=>{
        let code=13
        if(applycoupon.length==0)
        {
            setError('Please input Coupon code!')
        }
        else if(applycoupon.length<12)
        {
            setError('Invalid Coupon code!')
        }
        else if(applycoupon.length>=code)
        {
            setError('Invalid Coupon code!')
        }
        
    }

    return (
        <SafeAreaView >
            <View style={{ width: horizontalScale(375), height: verticalScale(670) }} >
                <View style={{ width: "95%", padding: "1%", borderRadius: 10, backgroundColor: COLORS.white, margin: "2%", marginTop: "5%", }}>
                
                    <View style={{ flexDirection: "row", width: "100%", borderRadius: 10, padding: "0%", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{ flexDirection: "column", }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {/* <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular, marginStart: "5%" }}>Apply Promo Code</Text> */}
                                <TextInput
                                placeholder='PromoCode'
                                // placeholderTextColor={"black"}
                                onChangeText={(text:string)=>{setApplycoupon(text),error? setError(""):null}}
                                value={applycoupon}
                                underlineColor="white"
                                activeUnderlineColor={'transparent'}
                                style={{width:200,height:40,backgroundColor:"white",fontSize:RFValue(12),color:COLORS.black,...FONTS.lexendregular,borderWidth:10,borderColor:"white"}}
                                />                                 
                                
                            </View>
                        </View>                       
                        <TouchableOpacity style={{ flexDirection: "column", }}  onPress={() => validatePromocode()}>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Text style={{width:60,height:26, borderWidth: 1, paddingLeft:12,paddingTop:3, borderRadius: 5, color: COLORS.textHeader, fontSize: RFValue(12), ...FONTS.lexendregular, marginStart: "5%" }}>Apply</Text>
                            </View>
                        </TouchableOpacity>                      
                        {/* <MCIcon name="chevron-right" size={moderateScale(35)} color={COLORS.black} style={{ flexDirection: "column", width: "75%" }} /> */}
                    </View>
                   
                </View>
                <View style={{ height: "3%",marginTop:"-9%" }}>
                      {error ? <Text style={{ ...FONTS.lexendregular, color: COLORS.element, fontSize: RFValue(12), paddingStart: "7%" }}>{error}</Text> : null}
                      </View>
                <View>
                    <Text style={{...FONTS.lexendsemibold,color:COLORS.black,marginHorizontal:15,paddingVertical:5,marginTop:"5%"}}>Available Coupons</Text>
                </View>
                <FlatList
                    data={dataoff}
                    contentContainerStyle={{ marginLeft: horizontalScale(12), paddingBottom: "5%" }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={{ paddingTop: verticalScale(14)}}>
                            <TouchableOpacity style={{ backgroundColor: "white", flexDirection: "row", width: horizontalScale(350), height: verticalScale(150), borderRadius: 10, }}>
                                <View style={{ flexDirection: "column", width: horizontalScale(30), right: horizontalScale(10), alignSelf: "center", backgroundColor: COLORS.lightGray, height: verticalScale(35), borderBottomEndRadius:55, borderTopEndRadius: 55 }} />
                                <View style={{ flexDirection: "column", width: horizontalScale(300), right: horizontalScale(10) }}>
                                    <View style={{ flexDirection: "row", padding: 5,/* paddingBottom:25, borderBottomColor: "#616161", borderBottomWidth: 1 */ }}>
                                        <View style={{ flexDirection: "column", width: horizontalScale(208) }}>
                                            <View style={{ marginBottom: "0%",borderLeftWidth:4, borderColor:'red',borderRightWidth:4,marginLeft:-24,height:30,borderRadius:3,width:horizontalScale(348)}}>
                                                <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(16), paddingVertical: 2,marginLeft:30 }}>Flat {item.discount}% OFF</Text>
                                            </View>
                                            <Text style={{ ...FONTS.lexendregular, color: COLORS.gray, fontSize: RFValue(12), paddingVertical: 2,marginLeft:10 }}>Use</Text>
                                        </View>
                                        <View>
                                            <Text style={{marginTop:10}}>{item.coupon}</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderStyle: "dashed", borderBottomWidth: 1, borderColor: "grey",marginStart:"4%" }} />
                                    <View style={{  flexDirection: "row",justifyContent:"space-between",marginTop:10 }}>
                                        <View style={{ flexDirection: "column" }}>
                                        {/* <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(12), paddingVertical: 4 }}>{item.description}</Text> */}
                                            <Text style={{ ...FONTS.lexendsemibold, color: COLORS.black, fontSize: RFValue(12), paddingVertical: 7}}>Save {item.discount}% with this code</Text>
                                        </View>
                                        <View style={{ flexDirection: "column", }}>
                                            <View style={{ flexDirection: "column", alignItems: "center",paddingTop:6 }}>
                                                <Text style={{width:60,height:26, borderWidth: 1, paddingLeft:12,paddingTop:3, borderRadius: 5, color: COLORS.textHeader, fontSize: RFValue(12), ...FONTS.lexendregular, marginStart: "5%" }}>Apply</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "column", width: horizontalScale(30), alignSelf: "center", backgroundColor: COLORS.lightGray, height: verticalScale(35), borderBottomStartRadius: 55, borderTopStartRadius: 55 }} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
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
export default CouponDetails;