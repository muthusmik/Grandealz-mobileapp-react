import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity, Modal,
    Alert,
    TextInput,
    Pressable,
} from 'react-native';
import { horizontalScale, verticalScale } from "../../constants/metrices";
import icons, { close, shoppingCart } from "../../constants/icons";
import moment from 'moment';
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import image from "../../constants/image";
import OrderList from "./orderList";
import { orderFilterHandle, orderlistHandle, orderlistHandlefilter } from "../../services/orderlist";
import { Provider } from "react-redux";
import CheckBox from "@react-native-community/checkbox";
import { RadioButton } from "react-native-paper";
import LoaderKit from 'react-native-loader-kit';

const MyOrders = () => {

    const navigation = useNavigation();

    const [dated, setDated] = useState(new Date());
    const [value, setValue] = useState(null);
    const [timeValue, setTimeValue] = useState();
    const [filt,setFilt]=useState();
    const [loader, setLoader] = useState(true);
    const [Orderlistdata, setOrderlistdata] = useState<any>();
    
    const [modalVisible, setModalVisible] = useState(false);
    const mydate = (moment(dated).format('YYYY-MM-DD'))

    useEffect(() => {
        const orderitems = async () => {
            let OrderList = await orderlistHandle()
            console.log("im the full data order", OrderList)
            setOrderlistdata(OrderList);
            setLoader(false);
        }
        orderitems();

    }, [])
    useEffect(()=>{
        console.log("order order order",Orderlistdata)
    },[Orderlistdata])

    const handlefilt = async (value: any)=>{
        const Orderfilt = async (data: any) => {
            let filterData = await orderlistHandlefilter(data)
            console.log("filter data", filterData);
            setOrderlistdata(filterData)
        }
        Orderfilt(value);
    }
    const resetFilter = async ()=>{
        setModalVisible(!modalVisible)
        setLoader(true);
        const date = {
            "start": mydate,
            "end": mydate,
        }
        const data={"value": null}
        console.log(data, "time data", mydate);
        const Orderfilt = async (data: any, date: any) => {
            let filterData = await orderFilterHandle(data, date)
            console.log("filter data", filterData);
            setOrderlistdata(filterData)
        }
        Orderfilt(data, date);
        setLoader(false);
    }

    const handleFilter = async (data: any, time: any) => {
        setModalVisible(!modalVisible)
        setLoader(true);
        var rDate = (moment(mydate).subtract(time.timeValue, 'days').format('YYYY-MM-DD'));
        console.log(time.timeValue, "im the substracted data", rDate)
        const date = {
            "start": mydate,
            "end": rDate
        }
        console.log(data.value, "status report", time.timeValue, "time data", mydate);
        const Orderfilt = async (data: any, date: any) => {
            let filterData = await orderFilterHandle(data, date)
            console.log("filter data", filterData);
            setOrderlistdata(filterData)
        }
        Orderfilt(data, date);
        setLoader(false);
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#F1F1F", height: "100%" }}>
            <StatusBar
                animated={true}
                backgroundColor="#0a0127"
            />
            <View style={styles.subdivOne}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: horizontalScale(18), flexDirection: "column" }}>
                    <EntypoIcons name="chevron-left" size={30} style={{ flexDirection: "column" }} color={"white"} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), width: "78%", textAlign: "center" }}>My Orders</Text>

            </View>
            <ScrollView style={{ height: "80%", padding: "4%" }}>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                           
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ height: 50, width: "90%", }}>
                                        <Text style={{ marginTop: 10, textAlign: "center", fontSize: RFValue(24), fontFamily: "Lexend-Regular", color: "#000000" }}>Filter orders</Text>
                                    </View>
                                    <View style={{ height: 40, width: "10%", marginTop: 10 }}>
                                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                            <View>
                                                <Image
                                                    source={close}
                                                    resizeMode='contain'
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                        marginTop: 9
                                                    }}
                                                />
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{ width: "100%", height: 500 }}>
                                    <SafeAreaView>
                                        <View style={{ marginLeft: 20, marginBottom: 10 }}>
                                            <Text style={{ fontFamily: "Lexend-Regular", color: "#000000", fontSize: RFValue(20) }}>Status</Text>
                                        </View>
                                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                <View><RadioButton value="Confirmed" color="#E70736" /></View>
                                                <View><Text style={{ textAlign: "center", marginTop: 7, fontSize: RFValue(16), fontFamily: "Lexend-Regular", color: "#000000" }}>Confirmed</Text></View>
                                            </View>
                                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                <View><RadioButton value="Out%20For%20Delivery" color="#E70736" /></View>
                                                <View><Text style={{ textAlign: "center", marginTop: 7, fontSize: RFValue(16), fontFamily: "Lexend-Regular", color: "#000000" }}>On the Way</Text></View>
                                            </View>
                                            <View style={{flexDirection:"row",marginLeft:10}}>                                                
                                                <View><RadioButton value="Delivered" color="#E70736" /></View>
                                                <View><Text style={{textAlign:"center",marginTop:7,fontSize:RFValue(16),fontFamily: "Lexend-Regular",color:"#000000"}}>Delivered</Text></View>
                                            </View>
                                            <View style={{flexDirection:"row",marginLeft:10}}>                                                
                                                <View><RadioButton value="Cancelled" color="#E70736" /></View>
                                                <View><Text style={{textAlign:"center",marginTop:7,fontSize:RFValue(16),fontFamily: "Lexend-Regular",color:"#000000"}}>Cancelled</Text></View>
                                            </View>
                                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                <View><RadioButton value="Refunded" color="#E70736" /></View>
                                                <View><Text style={{ textAlign: "center", marginTop: 7, fontSize: RFValue(16), fontFamily: "Lexend-Regular", color: "#000000" }}>Refunded</Text></View>
                                            </View>
                                            
                                        </RadioButton.Group>
                                    </SafeAreaView>
                                    <SafeAreaView style={{ marginTop: 10 }}>
                                        <View style={{ marginLeft: 20, marginBottom: 10 }}>
                                            <Text style={{ fontFamily: "Lexend-Regular", color: "#000000", fontSize: RFValue(20) }}>Time</Text>
                                        </View>
                                        <RadioButton.Group onValueChange={newValue => setTimeValue(newValue)} value={timeValue}>
                                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                <View><RadioButton value="15" color="#E70736" /></View>
                                                <View><Text style={{ textAlign: "center", marginTop: 7, fontSize: RFValue(16), fontFamily: "Lexend-Regular", color: "#000000" }}>Last 15 days</Text></View>
                                            </View>
                                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                <View><RadioButton value="30" color="#E70736" /></View>
                                                <View><Text style={{ textAlign: "center", marginTop: 7, fontSize: RFValue(16), fontFamily: "Lexend-Regular", color: "#000000" }}>Last 30 days</Text></View>
                                            </View>
                                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                <View><RadioButton value="183" color="#E70736" /></View>
                                                <View><Text style={{ textAlign: "center", marginTop: 7, fontSize: RFValue(16), fontFamily: "Lexend-Regular", color: "#000000" }}>Last 6 Months</Text></View>
                                            </View>
                                            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                <View><RadioButton value="365" color="#E70736" /></View>
                                                <View><Text style={{ textAlign: "center", marginTop: 7, fontSize: RFValue(16), fontFamily: "Lexend-Regular", color: "#000000" }}>Last Year</Text></View>
                                            </View>
                                            
                                        </RadioButton.Group>
                                    </SafeAreaView>

                                    <View style={{ flexDirection: "row", width: "100%", height: 70, alignItems: 'center', justifyContent: "space-around" }}>
                                        <TouchableOpacity onPress={() => { setValue(null), setTimeValue(null),resetFilter() }}>
                                            <View style={{ borderWidth: 1, width: 135, height: 50, borderRadius: 8 }}>
                                                <Text style={{ marginTop: 8, textAlign: "center", color: "#000000", fontSize: RFValue(15), fontFamily: "Lexend-Regular", padding: 5 }}>Clear Filters</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { handleFilter({ value }, { timeValue }) }}>
                                            <View style={{ width: 135, height: 50, borderRadius: 8, backgroundColor: "#E70736" }}>
                                                <Text style={{ marginTop: 8, textAlign: "center", color: "#FFFFFF", fontSize: RFValue(15), fontFamily: "Lexend-Regular", padding: 5 }}>Apply</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>

                        </View>
                    </Modal>
                </View>
                <View style={{ flexDirection: "row", marginBottom: RFValue(10) }}>
                    <View style={{ flexDirection: "row", alignSelf: "center", width: "83%", height: "82%", borderRadius: 20, backgroundColor: "#FFFFFF", marginRight: "2%", }}>
                        {/* <View style={{  }}> */}
                        <View style={{ flexDirection: "column" }}>
                            <View style={{ flexDirection: "row", margin: RFValue(10) }}>
                                <TouchableOpacity onPress={()=>{console.log(handlefilt(filt));
                                }}>
                                <Image
                                    source={icons.search}
                                    resizeMode="contain"
                                    style={{ height: verticalScale(23),width: horizontalScale(25), marginLeft: RFValue(5), top: RFValue(4) }}
                                />
                                </TouchableOpacity>
                                <TextInput
                                    placeholder="Search in orders"
                                    value={filt}
                                    placeholderTextColor={COLORS.gray}
                                    onChangeText={e => {setFilt(e)}}
                                    style={{
                                        flexDirection: "column",
                                        width: horizontalScale(300),
                                        ...FONTS.lexendregular,
                                        fontSize: RFValue(16), color: "black",
                                       padding:1,
                                       marginStart: RFValue(5)
                                    }}
                                />
                                {/* <Text style={{ color: COLORS.gray, fontSize: RFValue(16), ...FONTS.lexendregular, marginStart: RFValue(5) }}>Search in orders</Text> */}
                            </View>
                        </View>
                        {/* </View> */}

                    </View>
                    <View style={{ borderRadius: 10, backgroundColor: "#FFFFFF", marginVertical: "2%", flexDirection: "column" }}>
                        <View style={{ flexDirection: "row", marginHorizontal: "2%", borderRadius: 10 }}>

                            <TouchableOpacity style={{ flexDirection: "column" }} onPress={() => setModalVisible(!modalVisible)}>
                                <Image
                                    source={icons.filter}

                                    style={{ height: verticalScale(30), width: horizontalScale(24), margin: 8, left: 5 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View >
                    {loader ?
                     <View style={{ width: "100%", alignItems: "center", height: "92%", justifyContent: "center" }}>
                        <LoaderKit
                            style={{ width: 100, height: 105 }}
                            name={'BallClipRotatePulse'} // Optional: see list of animations below
                            size={30} // Required on iOS
                            color={COLORS.element} // Optional: color can be: 'red', 'green',... or '#ddd', '#FFFFFF',
                        />
                    </View> :
                        <OrderList orderlist={Orderlistdata} />
                    }
                </View>
            </ScrollView>
            {/* <View style={{ flexDirection: "row", height: "7%", backgroundColor: COLORS.white }}>
                <TouchableOpacity style={{ flexDirection: "column", width: "45%", marginHorizontal: "3%", marginVertical: "1%", borderRadius: 5, borderWidth: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: COLORS.textHeader, fontSize: RFValue(14), ...FONTS.lexendregular }}>Continue to Shopping</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "column", width: "45%", marginHorizontal: "3%", marginVertical: "1%", backgroundColor: COLORS.element, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: COLORS.white, fontSize: RFValue(14), ...FONTS.lexendregular }} >Process to Checkout </Text>
                </TouchableOpacity>
            </View> */}

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    subdivOne: {
        width: horizontalScale(375),
        height: verticalScale(80),
        backgroundColor: "#0a0127",
        alignItems: "center",
        // justifyContent: 'center',
        flexDirection: "row",


    },
    subdivTwo: {
        height: verticalScale(748),
        alignItems: "center",
        justifyContent: "center",
        // borderWidth:2
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: 300,
        height: 550,
        marginTop: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
  


})
export default MyOrders;