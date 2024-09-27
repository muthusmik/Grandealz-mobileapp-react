import React, { useState, useEffect, type PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    Keyboard,
    FlatList,
    useColorScheme,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Modal,
    TextInput,
    Alert,
    Pressable,
    Platform,
} from 'react-native';
import image from '../../constants/image';
import icons from '../../constants/icons';
import { COLORS, FONTS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Winners from './winners';
import moment from 'moment';
import UpcomingDraws from './upcomingDraws';
import { horizontalScale, moderateScale, verticalScale } from '../../constants/metrices';
// import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from "@react-native-community/datetimepicker";
import { drawCommingfilter, drawCommingGet, drawWinnerfilter } from '../../services/register';
import LoaderKit from 'react-native-loader-kit';
import { useKeyboard } from '@react-native-community/hooks';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from 'react-native-paper';
const DrawsMain = () => {
    const [showWinners, setShowWinners] = useState(true);
    const navigation = useNavigation();
    const [dateShow, setDateShow] = useState(false);
    const [date, setDate] = useState(moment(new Date()).toISOString());
    const [modalVisible, setModalVisible] = useState(false);
    const [searcher, setSearcher] = useState("");
    const [year, setYear] = useState("");
    const [winner, setWinner] = useState();
    const [close, setClose] = useState();
    const [loaders, setLoader] = useState(true);
    const [datePlaceHolder, setDatePlaceHolder] = useState(true);
    const daily = moment(new Date()).format("YYYY-MM-DD");
    const [viewMore, setViewMore] = useState(true);
    const [winnersMore, setWinnerMore] = useState<any>();

    const selectedDateFunction = (event, selectedDate: any) => {
        setDateShow(!dateShow);
        const currentDate = selectedDate;
        // console.log("rgerfefefge", currentDate)
        setDate(currentDate);
    }
    const handleFilter = async (search) => {
        // console.log("helloo");

        Keyboard.dismiss()
        if (showWinners) {
            let searc = moment(search.date).format("YYYY-MM-DD")
            setModalVisible(!modalVisible)
            if (searc === daily) searc = "";
            const data = {
                "date": searc,
                "year": search.year,
                "search": search.searcher
            }
            // console.log("date diff", data)
            const winnerfilter = async (data: any) => {
                let filterdata = await drawWinnerfilter(data)
                setWinner(filterdata.data)

                // console.log("winner winner chicken dinner", filterdata)
            }
            winnerfilter(data);
        }
        else {
            setModalVisible(!modalVisible)
            const data = {
                "searcher": search.searcher
            }
            // console.log("upcomming", data)
            const upcome = async (data: any) => {
                let filterdata = await drawCommingfilter(data)
                setClose(filterdata.data)
                // console.log("upcomming data", filterdata.data);
            }
            upcome(data)
        }
    }

    useEffect(() => {
        { winner ? setLoader(false) : null }
    }, [winner])

    var winnerData = winner;
    if (winnersMore) {
        var winnerData = winnerData.concat(winnersMore)
    }
    // console.log("WinnnerData...............", winnerData);

    const resetFilter = async () => {
        if (showWinners) {
            setModalVisible(!modalVisible)
            const data = { "date": "", "search": "", "year": "" }
            const winnerfilter = async (data: any) => {
                let filterdata = await drawWinnerfilter(data)
                setWinner(filterdata.data)
                // console.log("winner winner chicken dinner", filterdata.data)
            }
            winnerfilter(data);
        }
        else {
            setModalVisible(!modalVisible)
            const data = { "searcher": "" }
            const upcome = async (data: any) => {
                let filterdata = await drawCommingfilter(data)
                setClose(filterdata.data)
                setLoader(false)
                // console.log("upcomming data", filterdata.data);
            }
            upcome(data)
        }
    }

    useEffect(() => {
        //console.log("data..............");
        const data = {
            "date": "",
            "year": "",
            "search": ""
        }
        const win = async () => {
            let closingData = await drawWinnerfilter(data)
            let result = closingData.data;
            console.log("im inside the winner page ", closingData);
            setWinner(result)

            // console.log("loader state...........", loader)
        }
        win();
        const value = "status=UpComming"
        const soon = async () => {
            let closingData = await drawCommingGet(value)
            let result = closingData.data;
            // console.log("im inside the upcomming page ", result);
            setClose(result)

        }
        soon();

    }, [])

    const remainingData = async () => {
        setViewMore(false);
        let data = {
            "skip": 1
        }
        let closingData = await drawWinnerfilter(data)
        // console.log(closingData.data);
        setWinnerMore(closingData.data);
    }
    return (
        <>
            <ScrollView
            // keyboardShouldPersistTaps={'handled'}
            >
                <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 18, alignSelf: "center", justifyContent: "space-between", height: verticalScale(46) }}>

                    <View style={{ flexDirection: "row", width: "82%", backgroundColor: "white", borderRadius: 5 }}>
                        <TouchableOpacity style={{ backgroundColor: showWinners ? COLORS.element : "white", flexDirection: "column", width: "50%", borderRadius: 5, justifyContent: "center", alignItems: "center" }} onPress={() => setShowWinners(!showWinners)}>
                            <Text style={{ color: showWinners ? "white" : COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular, }}>Winners</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: !showWinners ? COLORS.element : "white", flexDirection: "column", width: "50%", borderRadius: 5, justifyContent: "center", alignItems: "center" }} onPress={() => setShowWinners(!showWinners)}>
                            <Text style={{ color: !showWinners ? "white" : COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular, }}>Upcoming Draws</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", width: "14%", backgroundColor: "white", borderRadius: 10 }}>
                        <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity onPress={() => { setModalVisible(!modalVisible), setWinnerMore(""), setViewMore(true) }}>
                                <Image
                                    source={icons.filter}
                                    resizeMode={"contain"}
                                    style={{ height: 25, width: 30 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {!loaders ?
                    <View style={{ marginVertical: "1%", position: "relative", paddingBottom: "8%" }}>
                        {showWinners ?
                            <View>
                                <Winners win={winnerData} />
                                {/* {viewMore && <TouchableOpacity style={{ paddingStart: 18 }} onPress={() => remainingData()}><Text style={{ ...FONTS.lexendregular, color: COLORS.element, fontSize: 10, textDecorationLine: "underline" }}>View more</Text></TouchableOpacity>} */}
                            </View> :
                            <View>
                                <UpcomingDraws son={close} />
                            </View>}
                    </View>
                    :
                    <View style={{ width: "100%", alignItems: "center", height: "50%", justifyContent: "center" }}>
                        <LoaderKit
                            style={{ width: 100, height: 105, top: "10%" }}
                            name={'BallClipRotatePulse'} // Optional: see list of animations below
                            size={30} // Required on iOS
                            color={COLORS.element} // Optional: color can be: 'red', 'green',... or '#ddd', '#FFFFFF',
                        />
                    </View>
                }
            </ScrollView>
            <Modal
                animationType="none"
                transparent={true}
                style={{ position: "absolute" }}
                visible={modalVisible}
                // presentationStyle={'fullScreen'}
                onRequestClose={() => {
                    setModalVisible(!modalVisible), setDatePlaceHolder(true);
                }}>
                {/* <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding"> */}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", height: 50, marginTop: 2, alignItems: "center", paddingHorizontal: "4%" }}>
                            <TouchableOpacity>
                                <Pressable
                                    onPress={() => { setModalVisible(!modalVisible), setDatePlaceHolder(true) }}>
                                    <View>
                                        <Image
                                            source={icons.back1}
                                            resizeMode='contain'
                                            style={{
                                                width: 30,
                                                height: 30,
                                            }}
                                        />
                                    </View>
                                </Pressable>
                            </TouchableOpacity>
                            <View style={{}}>
                                <Text style={{ textAlign: "center", fontFamily: "Lexend-Regular", fontSize: RFValue(20), color: "#000000", marginTop: 0 }}>Filter</Text>
                            </View>
                            <TouchableOpacity style={{}} onPress={() => { setSearcher(""), setDate(moment(new Date()).toISOString()), setYear(""), resetFilter(), setDatePlaceHolder(true), setViewMore(true) }}>
                                <Text style={{ textAlign: "center", fontFamily: "Lexend-Regular", fontSize: RFValue(14), color: "#E70736", marginTop: 5 }}>RESET</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: "4%" }}>
                            <TouchableOpacity style={{ alignSelf: "center", flexDirection: "row", borderWidth: 1, paddingStart: 10, borderRadius: 8, borderColor: "#c4c4c2", width: "100%", marginTop: verticalScale(5), }}>
                                <Ionicons name='ios-search-sharp' color={"black"} size={25} style={{ alignSelf: "center" }} />
                                <TextInput
                                    placeholder="Search Here..."
                                    placeholderTextColor={"black"}
                                    // underlineColor="white"
                                    value={searcher}
                                    onBlur={Keyboard.dismiss}
                                    onChangeText={(text: String) => setSearcher(text)}
                                    // activeUnderlineColor={'transparent'}
                                    style={{ color: "black", height: verticalScale(45), width: horizontalScale(200), ...FONTS.lexendregular, fontSize: RFValue(14) }}
                                />
                            </TouchableOpacity>
                            {showWinners ?
                                <>
                                    <TouchableOpacity style={{ alignSelf: "center", flexDirection: "row", borderWidth: 1, paddingStart: 10, borderRadius: 8, borderColor: "#c4c4c2", width: "100%", marginVertical: "5%", }}>
                                        <TextInput
                                            placeholder="Year"
                                            keyboardType={"phone-pad"}
                                            placeholderTextColor={"black"}
                                            // underlineColor="white"
                                            value={year}
                                            maxLength={4}
                                            onChangeText={(text: String) => setYear(text)}
                                            // activeUnderlineColor={'transparent'}
                                            style={{ backgroundColor: "#FFFFFF", color: "black", flexDirection: "column", height: verticalScale(45), width: horizontalScale(200), ...FONTS.lexendregular, fontSize: RFValue(14) }}
                                        />
                                    </TouchableOpacity>
                                    <View >
                                        <TouchableOpacity style={{ width: "100%", borderWidth: 1, borderColor: "#c4c4c2", backgroundColor: COLORS.white, alignSelf: "center", justifyContent: "center", borderRadius: 8, ...FONTS.lexendregular, paddingLeft: 14, height: 50 }}
                                            onPress={() => { setDateShow(true), setDatePlaceHolder(false) }}
                                        >
                                            <Text style={styles.dropText}>{(!datePlaceHolder && date) ? moment(date).format('MM/DD/YYYY') : 'MM/DD/YYYY'}</Text>
                                        </TouchableOpacity>
                                        {dateShow ?
                                            <DateTimePicker
                                                value={new Date(date)}
                                                mode="date"
                                                display="default"
                                                onChange={selectedDateFunction}
                                                // minimumDate={new Date()}
                                                maximumDate={new Date()}
                                            />
                                            : null}
                                    </View>
                                </> : null}

                        </View>
                        <View style={{ alignItems: "center", marginTop: verticalScale(20), width: "100%", height: verticalScale(46) }} >
                            <TouchableOpacity style={{ width: horizontalScale(223), height: "100%", borderRadius: 5, backgroundColor: "#E70736", alignItems: "center", justifyContent: "center" }} onPress={() => { handleFilter({ searcher, date, year }), setViewMore(false) }}>
                                <Text style={{ color: "#FFFFFF", fontSize: RFValue(15), fontFamily: "Lexend-Regular" }}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* </KeyboardAvoidingView>
                </SafeAreaView> */}
            </Modal>
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
    centeredView: {
        flex: 1,
        alignItems: "baseline",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalView: {
        width: "100%",
        height: "auto",
        margin: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
        paddingBottom: 20
    },
    dropText: {
        ...FONTS.lexendregular,
        color: COLORS.black,
        fontSize: moderateScale(16)
    },




})
export default DrawsMain;