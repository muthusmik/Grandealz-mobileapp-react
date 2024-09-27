import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Keyboard,
    Image, TextInput,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { horizontalScale, verticalScale } from "../../constants/metrices";
import { shoppingCart } from "../../constants/icons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../../constants";
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { addressEditHandler } from "../../store/reducers/addressedit";
import { countryList } from "../../services/countryList";
import { stateList } from "../../services/stateList";
import { cityList } from "../../services/cityList";
import { RFValue } from "react-native-responsive-fontsize";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import image from "../../constants/image";
import AntIcon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
// import { RadioButton } from "react-native-paper";
import icons from "../../constants/icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CheckBox from "@react-native-community/checkbox";
import PaymentGate from "./payPage";
import useForm from "./address_validation/useForm";
import validate from "./address_validation/validate";
import { AddAddressHandle } from "../../services/addaddress";
import { addressListHandler } from "../../store/reducers/addresslist";
import { moderateScale } from "../../constants/metrices";
import { ActivityIndicator } from "react-native-paper";
import LoaderKit from 'react-native-loader-kit';
import OrderEmpty from "../ExceptionScreens/orderEmpty";
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddAddress = ({ route }) => {
    const typeUser = route.params.type;
    const amount = route.params.amount;
    const addresslist = useSelector((state) => state.AddressHandle.data);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    //const { handleChange, handleSubmit, formErrors, data, formValues } = useForm(validate);
    const [Name, setName] = useState<any>("");
    const [isSelected, setSelection] = useState<any>(false);
    const [addressType, setAddressType] = useState<any>();
    const [errorName, setErrorName] = useState<any>('');
    const [phone, setPhone] = useState<any>("");
    const [errorPhone, setErrorPhone] = useState<any>('');
    const [pincode, setPincode] = useState<any>("");
    const [errorPin, setErrorPin] = useState<any>('');
    const [address, setAddress] = useState<any>("");
    const [errorAddress, setErrorAddress] = useState<any>('');
    const [locality, setLocality] = useState<any>("");
    const [errorLocality, setErrorLocality] = useState<any>('');
    const [stateIso, setStateIso] = useState<any>(null);
    const [country, setCountry] = useState<any>("");
    const [cityError, setCityError] = useState<any>('');
    const [countryListValue, setCountryListValue] = useState<any>([])
    const [countryValue, setCountryValue] = useState<any>(null)
    const [stateListValue, setStateListValue] = useState<any>([])
    const [stateValue, setStateValue] = useState<any>(null)
    const [cityListValue, setCityListValue] = useState<any>([])
    const [cityValue, setCityValue] = useState<any>(null)
    const [countryError, setCountryError] = useState<any>('')
    const [stateError, setStateError] = useState<any>('')
    const [cityData, setCityData] = useState<any>();
    const [stateData, setStateData] = useState<any>();
    const [countryData, setCountryData] = useState<any>();
    const [optionHo, setOptionHo] = useState<any>(false);
    const [optionWo, setOptionWo] = useState<any>(false)
    const [option, setOption] = useState<any>(false)
    const [addressError, setAddressError] = useState<any>();
    useEffect(() => {
        // { addresslist ? setAddressType(addresslist.length) 
        //     : null }
        // console.log("address type is ", addresslist.length)
        // { addressType / 2 != 1 ? setOption(false) : setOption(true) }
        if (addresslist) {

            if (addresslist.length > 1) {
                setOption(true)
            }
            if (addresslist[0] && addresslist[0].address_type === "Home") {
                setOptionHo(true)
                console.log("address typr vandhu home so ", optionHo)
            }
            if (addresslist[0] && addresslist[0].address_type === "Work") {
                setOptionWo(true)
            }
        }

    }, [])
    const CheckBoxes = () => {
        return (
            <View style={{ flexDirection: "row", left: horizontalScale(17) }}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkBox}
                    tintColors={{ true: "red" }}
                />
            </View>
        )
    }
    const validateFunction = () => {
        console.log(cityValue, "values", stateValue, "samuel", Name, address, phone, locality, pincode, countryValue, stateValue, cityValue);

        //firstName
        let errorCount = 0;
        if (Name.length < 3) {
            setErrorName('Please enter maximum 15 characters for Name (Minimum can be 2) as someone has name like Jo (alphabets only)')
            errorCount++;
        }
        if (Name.length < 1) {
            setErrorName('Please enter Name')
            errorCount++;
        }
        if (address.length <= 1) {
            setErrorAddress('Please enter Address')
            errorCount++;
        }

        if (address.length >= 60) {
            setErrorAddress('Please enter maximum 60 characters for Address')
            errorCount++;
        }
        if (pincode.length < 6) {
            setErrorPin('Please enter Pincode')
            errorCount++;
        }
        if (locality.length > 20) {
            setErrorLocality("Please enter maximum 20 characters for Locality/Town")
            errorCount++;
        }
        if (locality.length <= 2) {
            setErrorLocality('Please enter Locality')
            errorCount++;
        }

        if (phone.length < 10) {
            setErrorPhone('Please enter at least 10 digits for Mobile Number')
            errorCount++;
        }
        if (phone.length < 1) {
            setErrorPhone("Please enter Mobile No")
            errorCount++;
        }
        if (countryValue === null) {
            setCountryError('Please Choose Country')
            errorCount++;
        }
        if (cityValue === null) {
            setCityError('Please Choose City')
            errorCount++;
        }
        if (stateValue === null) {
            setStateError('Please Choose state')
            errorCount++;
        }
        if (addressType === undefined) {
            setAddressError("Select address type")
            errorCount++;
        }
        if (errorCount === 0) {
            setErrorAddress(""), setErrorName(""), setErrorLocality(""), setErrorPhone(""), setErrorPin("");
            return true;
        }
        if (errorCount > 0) {
            if (Name.length > 3) {
                setErrorName('');
            }
            if (address.length > 1) {
                setErrorAddress('');
            }
            if (pincode.length > 5) {
                setErrorPin('');
            }
            if (locality.length > 2) {
                setErrorLocality('');
            }
            if (phone.length > 9) {
                setErrorPhone('');
            }
            if (countryValue != null) {
                setCountryError('');
            }
            if (cityValue != null) {
                setCityError('');
            }
            if (stateValue != null) {
                setStateError('');
            }
            if (addressType != undefined) {
                setAddressError('');
            }
        }
        else {
            return false;
        }
        console.log("errorcount ", errorCount)
    }

    const handleSubmit = async () => {
        const validateLetter = validateFunction();
        console.log("Retrun.............", addressType);

        if (validateLetter) {
            const payload = {
                "name": Name,
                "phone": phone,
                "pincode": pincode,
                "address": address,
                "locality_town": locality,
                "city": {
                    "name": cityData.name,
                    "stateCode": cityData.stateCode,
                    "countryCode": cityData.countryCode
                },
                "state": {

                    "name": stateData.name,
                    "isoCode": stateData.isoCode,
                    "countryCode": stateData.countryCode

                },
                "country": {
                    "name": countryData.name,
                    "isoCode": countryData.isoCode,
                    "flag": countryData.flag,
                    "phonecode": countryData.phonecode,
                    "currency": countryData.currency
                },
                "address_type": addressType == 0 ? "Home" : "Work",
                "is_default_address": false
            }
            console.log("payload for update.............", payload)
            let calling = await AddAddressHandle(payload);
            console.log(calling, "Personal Details Country....");
            if (calling === "Success") {
                Toast.show('Successfully added', Toast.LONG, { backgroundColor: 'red' });

                dispatch(addressListHandler());
                console.log("...........", typeUser, amount)
                navigation.navigate("Address", { type: typeUser, "amount": amount });
            }
            else {
                Toast.show('Something went wrong!', Toast.LONG, { backgroundColor: 'red' });
            }

        }
    }
    const getCountryList = async () => {
        let listCountries = await countryList().then((originalPromiseResult) => {
            //console.log("Personal Details Country....", originalPromiseResult);
            // const value = originalPromiseResult
            //setCountryListValue(originalPromiseResult);
            //console.log("listCoun", originalPromiseResult[56].name)
        })
    }
    const getStateList = async (data: any) => {
        let listState = await stateList(data).then((originalPromiseResult) => {
            //console.log("Personal Details State....", originalPromiseResult);
            // const value = originalPromiseResult
            setStateListValue(originalPromiseResult);
            //console.log("listCoun", originalPromiseResult)
        })
    }
    const getCityList = async (data: any) => {
        let listCity = await cityList(data).then((originalPromiseResult) => {
            //console.log("Personal Details City....", originalPromiseResult);
            // const value = originalPromiseResult
            setCityListValue(originalPromiseResult);
            //console.log("listCity", originalPromiseResult)
        })
    }

    useEffect(() => {
        getCountryList();
        const india = [{ "currency": "INR", "flag": "????", "isoCode": "IN", "name": "India", "phonecode": "91" }];
        setCountryListValue(india)
    }, [])

    useEffect(() => {
        if (countryValue) {
            getStateList(countryValue);
        }
        // else { Alert.alert("Select any nationality") }

    }, [countryValue])

    const themeForList = {
        color: COLORS.black,
        fontFamily: "Lexend-Regular",
    }

    useEffect(() => {
        if (countryValue) {
            if (stateValue) {
                const data = { countryValue, stateIso }
                getCityList(data);
            }
            //  else { Alert.alert("Select any state") }
        }
        // else { Alert.alert("Select any country") }
    }, [stateValue])

    const handleBox = () => {
        if (errorName) {
            setName(""),
                setName(""), setErrorName("");
        }
        else if (errorPhone) {
            setPhone("")
            setPhone(""), setErrorPhone("");
        }
        else if (errorPin) {
            setPincode("")
            setPincode(""), setErrorPin("");
        }
        else if (errorAddress) {
            setAddress("")
            setAddress(""), setErrorAddress("");
        }
        else if (errorLocality) {
            setLocality("")
            setLocality(""), setErrorLocality("");
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#F1F1F", height: "100%" }}>
            <StatusBar
                animated={true}
                backgroundColor="#0a0127"
            />
            <View style={styles.subdivOne}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: horizontalScale(14) }}>
                    <EntypoIcons name="chevron-left" size={30} style={{ flexDirection: "column" }} color={"white"} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), width: horizontalScale(290), textAlign: "center" }}>Add New Address</Text>
            </View>
            {option ?
                <OrderEmpty value={"Home and Work address available"} />
                :
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ height: "100%" }}
                    contentContainerStyle={{ paddingBottom: "12%" }}>
                    <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular, marginLeft: "5%", marginTop: "5%" }}>CONTACT DETAILS</Text>
                    <View style={{ marginHorizontal: "3%", marginTop: "2%" }}>
                        <Pressable onPressIn={() => handleBox()}>
                            <TextInput
                                placeholder="Name*"
                                value={Name}
                                maxLength={16}
                                placeholderTextColor={COLORS.gray}
                                onChangeText={(text: String) => setName(text)}
                                //onChangeText={e => { handleChange(e, "Name"), setErrorName(""), setName(e) }}
                                style={{ paddingStart: 15, borderRadius: 8, width: "95%", backgroundColor: COLORS.white, alignSelf: "center", ...FONTS.lexendregular, fontSize: RFValue(13), color: "black" }}
                            />
                        </Pressable>
                    </View>
                    <View style={{ height: (errorName) ? 16 : 8 }}>
                        {errorName ?
                            <Text style={styles.ErrorText}>{errorName}</Text> : null}
                    </View>
                    <View style={{ marginHorizontal: "3%", marginTop: "2%" }}>
                        <Pressable onPressIn={() => handleBox()}>
                            <TextInput
                                keyboardType={"phone-pad"}
                                placeholder="Mobile No*"
                                value={phone}
                                maxLength={10}
                                onChangeText={(text: String) => setPhone(text)}
                                //onChangeText={e => { handleChange(e, "mobile"), setErrorPhone(""), setPhone(e) }}
                                placeholderTextColor={COLORS.gray}
                                style={{ paddingStart: 15, borderRadius: 8, width: "95%", backgroundColor: COLORS.white, alignSelf: "center", ...FONTS.lexendregular, fontSize: RFValue(13), color: "black" }}
                            />
                        </Pressable>
                    </View>
                    <View style={{ height: (errorPhone) ? 16 : 8 }}>
                        {errorPhone ?
                            <Text style={styles.ErrorText}>{errorPhone}</Text> : null}
                    </View>
                    <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular, marginLeft: "5%", marginTop: "2%" }}>ADDRESS</Text>
                    <View style={{ marginHorizontal: "3%", marginTop: "2%" }}>
                        <Pressable onPressIn={() => handleBox()}>
                            <TextInput
                                keyboardType={"phone-pad"}
                                placeholder="Pin Code*"
                                value={pincode}
                                maxLength={6}
                                placeholderTextColor={COLORS.gray}
                                onChangeText={(text: String) => setPincode(text)}
                                //onChangeText={e => { handleChange(e, "pincode"), setErrorPin(""), setPincode(e) }}
                                style={{ paddingStart: 15, borderRadius: 8, width: "95%", backgroundColor: COLORS.white, alignSelf: "center", ...FONTS.lexendregular, fontSize: RFValue(13), color: "black" }}
                            />
                        </Pressable>
                    </View>
                    <View style={{ height: (errorPin) ? 16 : 8 }}>
                        <Text style={styles.ErrorText}>{errorPin}</Text>
                    </View>
                    <View style={{ marginHorizontal: "3%", marginTop: "2%" }}>
                        <Pressable onPressIn={() => handleBox()}>
                            <TextInput
                                keyboardType={"default"}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="Address (House No, Building, street, Area)*"
                                value={address}
                                placeholderTextColor={COLORS.gray}
                                onChangeText={(text: String) => setAddress(text)}
                                style={{ paddingStart: 15, borderRadius: 8, width: "95%", backgroundColor: COLORS.white, alignSelf: "center", ...FONTS.lexendregular, fontSize: RFValue(14), color: "black" }}
                            />
                        </Pressable>
                    </View>

                    <View style={{ height: (errorAddress) ? 16 : 8 }}>
                        {errorAddress ?
                            <Text style={styles.ErrorText}>{errorAddress}</Text> : null}
                    </View>

                    <View style={{ marginHorizontal: "3%", marginTop: "2%" }}>
                        <Pressable onPressIn={() => handleBox()}>
                            <TextInput
                                keyboardType={"default"}
                                placeholder="Locality / Town*"
                                value={locality}
                                maxLength={40}
                                onChangeText={(text: String) => setLocality(text)}
                                //onChangeText={e => { handleChange(e, "locality"), setErrorLocality(""), setLocality(e) }}
                                placeholderTextColor={COLORS.gray}
                                style={{ paddingStart: 15, borderRadius: 8, width: "95%", backgroundColor: COLORS.white, alignSelf: "center", ...FONTS.lexendregular, fontSize: RFValue(14), color: "black" }}
                            />
                        </Pressable>
                    </View>

                    <View style={{ height: (errorLocality) ? 16 : 8 }}>
                        {errorLocality ?
                            <Text style={styles.ErrorText}>{errorLocality}</Text> : null}
                    </View>
                    <View style={{ flexDirection: "row", marginHorizontal: "3%", marginTop: "2%", width: "95%" }}>
                        <View style={{ flexDirection: "column", width: "46%", marginLeft: "2.5%" }}>
                            <View>
                                <Dropdown
                                    style={{ width: "100%", backgroundColor: COLORS.white, alignSelf: "center", borderRadius: 8, padding: "2%", marginTop: "1%", paddingHorizontal: 14 }}
                                    placeholderStyle={styles.dropText}
                                    selectedTextStyle={styles.dropText}
                                    data={countryListValue}
                                    maxHeight={350}
                                    itemTextStyle={themeForList}
                                    labelField="name"
                                    valueField="isoCode"
                                    onChange={item => { setCountryValue(item.isoCode), setCountryData(item) }}
                                    placeholder={(countryValue) ? countryValue : "Country*"}
                                />
                            </View>
                            <View style={{ height: (countryError) ? 16 : 8 }}>
                                <Text style={styles.ErrorTextCountry}>{countryError}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "column", width: "49%" }}>
                            <View style={{ marginHorizontal: "3%" }}>
                                <Dropdown
                                    style={{ width: "100%", backgroundColor: COLORS.white, alignSelf: "center", borderRadius: 8, padding: "2%", marginTop: "1%", paddingHorizontal: 14 }}
                                    placeholderStyle={styles.dropText}
                                    selectedTextStyle={styles.dropText}
                                    data={stateListValue}
                                    maxHeight={350}
                                    itemTextStyle={themeForList}
                                    labelField="name"
                                    valueField="name"
                                    onChange={item => { setStateValue(item.name), setStateIso(item.isoCode), setStateData(item) }}
                                    placeholder={(stateValue) ? stateValue : "State*"}
                                />
                            </View>

                            <View style={{ height: (stateError) ? 16 : 8 }}>
                                {stateError ?
                                    <Text style={styles.ErrorTextState}>{stateError}</Text> : null}
                            </View>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: "1%", marginTop: "2%" }}>
                        <Dropdown
                            style={{ width: "91%", backgroundColor: COLORS.white, alignSelf: "center", borderRadius: 8, padding: "2%", marginTop: "1%", paddingHorizontal: 14 }}
                            placeholderStyle={styles.dropText}
                            selectedTextStyle={styles.dropText}
                            data={cityListValue}
                            maxHeight={350}
                            itemTextStyle={themeForList}
                            labelField="name"
                            valueField="name"
                            onChange={item => { setCityValue(item.name), setCityData(item) }}
                            placeholder={(cityValue) ? cityValue : "Select City"}
                        />
                    </View>

                    <View style={{ height: (cityError) ? 16 : 8 }}>
                        {cityError ?
                            <Text style={styles.ErrorText}>{cityError}</Text> : null}
                    </View>

                    <Text style={{ color: COLORS.textHeader, fontSize: RFValue(13), ...FONTS.lexendregular, marginLeft: "5%", marginTop: "2%" }}>SAVE ADDRESS AS</Text>
                    <View style={{ marginTop: "2%", flexDirection: "row", width: "89%", alignSelf: "center", borderRadius: 10, backgroundColor: COLORS.white }}>
                        <>
                            <TouchableOpacity disabled={optionHo} style={{ paddingVertical: "5%", marginHorizontal: "5%", }} onPress={() => setAddressType(0)}>
                                <Text style={{ ...styles.switch, backgroundColor: (addressType == 0) ? COLORS.element : "white", color: (addressType == 0) ? COLORS.white : COLORS.gray, borderColor: (addressType == 0) ? COLORS.element : COLORS.gray }}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={optionWo} style={{ paddingVertical: "5%", }} onPress={() => setAddressType(1)}>
                                <Text style={{ ...styles.switch, backgroundColor: (addressType == 1) ? COLORS.element : "white", color: (addressType == 1) ? COLORS.white : COLORS.gray, borderColor: (addressType == 1) ? COLORS.element : COLORS.gray }}>Work</Text>
                            </TouchableOpacity>
                        </>
                    </View>

                    <View style={{ height: (addressError) ? 16 : 8 }}>
                        {addressError ?
                            <Text style={styles.ErrorText}>{addressError}</Text> : null}
                    </View>
                    <View style={{ marginHorizontal: "2%", marginTop: "2%", paddingVertical: "2%", flexDirection: "row", width: "90%", borderRadius: 10, backgroundColor: COLORS.white, alignSelf: "center" }}>
                        <View><CheckBoxes /></View>
                        <Text style={{ color: COLORS.gray, fontSize: RFValue(12), ...FONTS.lexendregular, paddingHorizontal: "5%", alignSelf: "center" }}>Make this my default address</Text>
                    </View>
                </KeyboardAwareScrollView>
            }
            <View style={{ flexDirection: "row", height: 62, backgroundColor: COLORS.white, paddingVertical: "1%", paddingHorizontal: "2%" }}>
                <TouchableOpacity style={{ flexDirection: "column", width: "90%", marginHorizontal: "5%", marginVertical: "1%", borderRadius: 5, borderWidth: 1, justifyContent: "center", alignItems: "center" }} onPress={e => { handleSubmit() }} disabled={false}>
                    <Text style={{ color: COLORS.textHeader, fontSize: RFValue(14), ...FONTS.lexendregular }}>Add Address</Text>
                </TouchableOpacity>
            </View>

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
    switch: {
        textAlign: "center",
        fontSize: RFValue(11),
        ...FONTS.lexendregular,
        borderRadius: 4,
        borderWidth: 1,
        paddingVertical: "1%",
        paddingHorizontal: "4%"
    },
    subdivTwo: {
        height: verticalScale(748),
        alignItems: "center",
        justifyContent: "center",
        // borderWidth:2
    },
    checkBox: {
        alignSelf: "center",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "black",
        color: COLORS.element
    },
    dropText: {
        ...FONTS.lexendregular,
        color: COLORS.black,
        fontSize: moderateScale(16)
    },
    errorText: {
        ...FONTS.lexendregular,
        color: COLORS.element,
        fontSize: moderateScale(10)
    },
    ErrorText: {
        color: "red",
        ...FONTS.lexendregular,
        fontSize: RFValue(10),
        marginStart: verticalScale(25),
    },
    ErrorTextState: {
        color: "red",
        ...FONTS.lexendregular,
        fontSize: RFValue(10),
        marginStart: verticalScale(10),
    },
    ErrorTextCountry: {
        color: "red",
        ...FONTS.lexendregular,
        fontSize: RFValue(10),
        marginStart: verticalScale(4),
    },

})
export default AddAddress;
