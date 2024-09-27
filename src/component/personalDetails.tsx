import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    TextInput,
    ScrollView,
    ToastAndroid,
    Platform,
    Modal,
    // DatePickerIOS
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import SafeAreaView from 'react-native-safe-area-view';
import { icons, COLORS, FONTS } from '../constants';
import { horizontalScale, moderateScale, verticalScale } from '../constants/metrices';
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import image from '../constants/image';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RadioButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { current, unwrapResult } from '@reduxjs/toolkit';
import { countryList } from '../services/countryList';
import { stateList } from '../services/stateList';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DateTimePicker from "@react-native-community/datetimepicker";
import { personalDetailsUpdate } from '../services/personalDetailsUpdate';
import { userDetailsHandler } from '../store/reducers/userDetails';
import LoaderKit from 'react-native-loader-kit';

const PersonalDetails = (props: any) => {
    // console.log("Page props in Personal details..............", props.route.params)
    const userData: any = useSelector<any>(state => state.userDetailsHandle?.data?.data);
    const userDate = moment(userData?.date_of_birth).toISOString();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState(userData?.first_name);
    const [lastName, setLastName] = useState(userData?.last_name);
    const [email, setEmail] = useState(userData?.email);
    const [mblNumber, setMblNumber] = useState(userData?.phone);
    const [mblCode, setMblCode] = useState(userData?.country_phone_code);
    const [checked, setChecked] = React.useState(userData?.gender);
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mblCodeError, setMblCodeError] = useState('');
    const [mblNumberError, setMblNumberError] = useState('');
    const [countryListValue, setCountryListValue] = useState([])
    const [countryValue, setCountryValue] = useState<any>(userData?.nationality)
    const [stateListValue, setStateListValue] = useState([])
    const [stateValue, setStateValue] = useState<any>('')
    const [cityListValue, setCityListValue] = useState([])
    const [cityValue, setCityValue] = useState<any>('')
    const [Gender, setGenderError] = useState("")
    const [countryError, setCountryError] = useState("")
    const [stateError, setStateError] = useState("")
    const [countryResidenceValue, setCountryResidenceValue] = useState<any>(userData?.country_of_residence)
    const [countryResidenceError, setCountryResidenceError] = useState('')
    const [date, setDate] = useState(moment(userData?.date_of_birth).toISOString())
    const [dateShow, setDateShow] = useState(false);
    const [dateError, setDateError] = useState("");
    const [loader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    var url = userData?.profile_pic.split('/');

    // console.log("kaliraaaaaaaaaaaaaaaaaaaaaa", url[3]);
    // console.log("userData ..;;;;;;;;;;;;;;;;;;;;;", userData.country_phone_code)
    const getCountryList = async () => {
        let listCountries = await countryList().then((originalPromiseResult) => {
            //console.log("Personal Details Country....", originalPromiseResult);
            // const value = originalPromiseResult
            setCountryListValue(originalPromiseResult);
            console.log("listCoun", originalPromiseResult[56].name)
        })
    }
    const getStateList = async (data: any) => {
        let listCountries = await stateList(data).then((originalPromiseResult) => {
            //console.log("Personal Details State....", originalPromiseResult);
            // const value = originalPromiseResult
            setStateListValue(originalPromiseResult);
            //console.log("listCoun", originalPromiseResult)
        })
    }

    useEffect(() => {
        getCountryList();
    }, [])

    useEffect(() => {
        if (countryValue) {
            getStateList(countryValue);
        }
        // else { Alert.alert("Select any nationality") }

    }, [countryValue])

    useEffect(() => {
        if (countryValue) {
            if (stateValue) {
                getStateList(countryValue);
            }
            //  else { Alert.alert("Select any state") }
        }
        // else { Alert.alert("Select any country") }

    }, [cityValue])

    const validateFunction = () => {
        console.log("values", firstName, lastName, email, mblNumber, mblCode, checked, countryResidenceValue, countryValue, stateValue, date);
        //firstName
        let errorCount = 0;
        if (firstName.length === 0 || firstName === undefined) {
            setFirstNameError('Please select First Name')
            errorCount++;
        }
        else {
            setFirstNameError('')
        }
        //lastName
        if (lastName.length === 0 || lastName === undefined) {
            setLastNameError('Please select Last Name')
            errorCount++;
        }
        else {
            setLastNameError('')
        }
        if (checked.length == 0) {
            setGenderError('Please select Gender')
            errorCount++;
        }
        else {
            setGenderError('')
        }
        //Nationality
        if (countryValue.length == 0) {
            setCountryError('Please select Nationality')
            errorCount++;
        }
        else {
            setCountryError('')
        }
        if (countryResidenceValue.length == 0) {
            setCountryResidenceError('Please select Country of residence')
            errorCount++;
        }
        else {
            setCountryResidenceError('')
        }
        //Date of birth
        if (date === null) {
            setDateError('Please select date of birth')
            errorCount++;
        }
        else {
            setDateError('')
        }
        if (errorCount === 0) {
            setDateError(""), setCountryResidenceError(""), setStateError(""), setCountryError(""), setGenderError(""), setLastNameError(""), setFirstNameError("");
            return true;
        }
        else {
            return false;
        }
    }

    const uploadpersonalDetails = async () => {
        const validateLetter = validateFunction();
        //console.log("Retrun.............", validateLetter);
        if (validateLetter) {
            setLoader(true)
            const payload = {
                "first_name": firstName,
                "last_name": lastName,
                "date_of_birth": moment(date).format('YYYY-MM-DD'),
                "gender": checked,
                "country_phone_code": mblCode,
                "profile_pic": url[3],
                "country_of_residence": countryResidenceValue,
                "nationality": "Indian",
            }
            // console.log("payload for update.............", payload)
            let callingAutobot = await personalDetailsUpdate(payload).then((originalPromiseResult) => {
                // console.log("Personal Details Country....", originalPromiseResult);
                if (originalPromiseResult === undefined) {
                    if (Platform.OS == 'android')
                        ToastAndroid.showWithGravity(
                            'Something went wrong!, Please try again later',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    else
                        Alert.alert("Error", 'Please try again later')
                    setLoader(false)
                }
                else {
                    if (Platform.OS == 'android')
                        ToastAndroid.showWithGravity(
                            'Updated SuccessFully!',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    else
                        Alert.alert("Success", 'Updated SuccessFully!')
                    dispatch(userDetailsHandler());
                    setLoader(false)
                }
            })
        }
        else {

        }

    }

    const selectedDateFunction = (event, selectedDate) => {
        const currentDate = selectedDate ? selectedDate : date;
        // console.log("rgerfefefge", currentDate)
        setDate(currentDate);
        setDateShow(false);
        setModalVisible(false)
    }
    const themeForList = {
        color: COLORS.black,
        fontFamily: "Lexend-Regular",
    }

    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor={"#0a0127"}
            />
            <View style={styles.subdivOne}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: horizontalScale(18), flexDirection: "column" }}>
                    <EntypoIcons name="chevron-left" size={30} style={{ flexDirection: "column" }} color={"white"} />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), width: "75%", textAlign: "center" }}>Personal Details</Text>
            </View>
            {(!loader) ?
                <ScrollView style={{ backgroundColor: COLORS.pagebackground, height: "90%" }}>
                    <View style={{ margin: "1%" }}>
                        <Text style={{ paddingLeft: "5%", ...FONTS.lexendregular, color: COLORS.gray, fontSize: RFValue(12), paddingTop: "3%" }}>First Name</Text>
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor={"black"}
                            onChangeText={(text: String) => setFirstName(text)}
                            value={firstName}
                            style={{ ...styles.inputHeight, width: "91%", backgroundColor: COLORS.white, alignSelf: "center", borderRadius: 8, ...FONTS.lexendregular, color: COLORS.black, fontSize: RFValue(16), paddingLeft: 14, marginTop: "1%" }}
                        />
                    </View>
                    {firstNameError ?
                        <View style={{ paddingLeft: 19, height: "1.8%", marginLeft: "2%" }}>
                            <Text style={styles.errorText}>{firstNameError}</Text>
                        </View>
                        : null}
                    <View style={{ margin: "1%" }}>
                        <Text style={{ paddingLeft: "5%", ...FONTS.lexendregular, color: COLORS.gray, fontSize: RFValue(12) }}>Last Name</Text>
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor={"black"}
                            onChangeText={(text: String) => setLastName(text)}
                            value={lastName}
                            style={{ ...styles.inputHeight, width: "91%", backgroundColor: COLORS.white, alignSelf: "center", borderRadius: 8, ...FONTS.lexendregular, color: COLORS.black, fontSize: RFValue(16), paddingLeft: 14, marginTop: "1%" }}
                        />
                    </View>
                    {lastNameError ? <View style={{ paddingLeft: 19, height: "1.8%", marginLeft: "2%" }}>
                        <Text style={styles.errorText}>{lastNameError}</Text>
                    </View>
                        : null}
                    <View style={{ margin: "1%" }}>
                        <Text style={{ paddingLeft: "5%", ...FONTS.lexendregular, color: COLORS.gray, fontSize: RFValue(12) }}>Email</Text>
                        <TextInput
                            editable={false} selectTextOnFocus={false}
                            placeholder="Email id"
                            placeholderTextColor={"black"}
                            onChangeText={(text: String) => setEmail(text)}
                            value={email}
                            style={{ ...styles.inputHeight, width: "91%", backgroundColor: COLORS.white, alignSelf: "center", borderRadius: 8, ...FONTS.lexendregular, color: COLORS.black, fontSize: RFValue(16), paddingLeft: 14, marginTop: "1%" }}
                        />
                    </View>

                    <View style={{ flexDirection: "row", margin: "1%" }}>
                        <View style={{ flexDirection: "column", width: "34%", paddingLeft: "5%" }}>
                            <Text style={{ ...FONTS.lexendregular, color: COLORS.gray, fontSize: RFValue(12) }}>Country Code</Text>
                            <TextInput
                                placeholder="CC"
                                editable={false} selectTextOnFocus={false}
                                keyboardType={"phone-pad"}
                                placeholderTextColor={"black"}
                                onChangeText={(text: String) => { setMblCode(text) }}
                                value={mblCode}
                                style={{ backgroundColor: COLORS.white, right: "2.5%", borderRadius: 8, ...FONTS.lexendregular, color: COLORS.black, fontSize: RFValue(16), paddingLeft: 14, marginTop: "1%" }}
                            />
                        </View>
                        <View style={{ flexDirection: "column", width: "65%" }}>
                            <Text style={{ ...FONTS.lexendregular, color: COLORS.gray, fontSize: RFValue(12), paddingLeft: "7%" }}>Mobile</Text>
                            <TextInput
                                placeholder="Mobile Number"
                                editable={false} selectTextOnFocus={false}
                                keyboardType={"phone-pad"}
                                maxLength={10}
                                placeholderTextColor={"black"}
                                onChangeText={(text: String) => setMblNumber(text)}
                                value={mblNumber}
                                style={{ width: "89%", backgroundColor: COLORS.white, alignSelf: "center", borderRadius: 8, ...FONTS.lexendregular, color: COLORS.black, fontSize: RFValue(16), paddingLeft: 14, marginTop: "1%" }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "89%", padding: "1.5%", marginTop: "3%", backgroundColor: COLORS.white, alignSelf: "center", borderRadius: 8 }}>
                        <View style={{ borderColor: checked === 'M' ? COLORS.element : COLORS.lightGray, borderRadius: 30, borderWidth: Platform.OS === "ios" ? 2 : 0, ...styles.radioios }}>

                            {Platform.OS === "ios" && checked === 'M' ? <View style={{ backgroundColor: COLORS.element, borderRadius: 30, height: 15, width: 15, alignSelf: 'center', justifyContent: 'center', marginTop: 3 }} /> : null}
                            <RadioButton
                                value="M"
                                status={checked === 'M' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('M')}
                                uncheckedColor={COLORS.lightGray}
                                color={COLORS.element}
                            />

                        </View>
                        <Text style={{ ...FONTS.lexendregular, color: COLORS.black, fontSize: moderateScale(16), paddingRight: "8%" }}>Male</Text>
                        <View style={{ borderColor: checked === 'F' ? COLORS.element : COLORS.lightGray, borderRadius: 30, borderWidth: Platform.OS === "ios" ? 2 : 0, ...styles.radioios }}>
                            {Platform.OS === "ios" && checked === 'F' ? <View style={{ backgroundColor: COLORS.element, borderRadius: 30, height: 15, width: 15, alignSelf: 'center', justifyContent: 'center', marginTop: 3 }} /> : null}
                            <RadioButton
                                value="F"
                                status={checked === 'F' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('F')}
                                uncheckedColor={COLORS.lightGray}
                                color={COLORS.element}
                            />
                        </View>
                        <Text style={{ ...FONTS.lexendregular, color: COLORS.black, fontSize: moderateScale(16) }}>Female</Text>

                    </View>
                    {Gender ?
                        <View style={{ paddingLeft: 19, height: "1.8%", marginLeft: "2%" }}>
                            <Text style={styles.errorText}>{Gender}</Text>
                        </View>
                        : null}
                    <View style={{ margin: "1%" }}>
                        <Text style={{ paddingLeft: "5%", ...FONTS.lexendregular, color: COLORS.gray, fontSize: RFValue(12) }}>Nationality</Text>
                        <Dropdown
                            style={{ width: "91%", backgroundColor: COLORS.white, alignSelf: "center", borderRadius: 8, padding: "2%", marginTop: "1%", paddingHorizontal: 14 }}
                            placeholderStyle={styles.dropText}
                            selectedTextStyle={styles.dropText}
                            data={countryListValue}
                            maxHeight={350}
                            itemTextStyle={themeForList}
                            labelField="name"
                            valueField="isoCode"
                            onChange={item => { setCountryValue(item.isoCode) }}
                            placeholder={(userData?.nationality) ? userData?.nationality : "Select Nationality"}
                        />
                    </View>
                    {countryError ?
                        <View style={{ paddingLeft: 19, height: "1.8%", marginLeft: "2%" }}>
                            <Text style={styles.errorText}>{countryError}</Text>
                        </View>
                        : null}
                    <View style={{ margin: "1%" }}>
                        <Text style={{ paddingLeft: "5%", ...FONTS.lexendregular, color: COLORS.gray, fontSize: RFValue(12) }}>Country of residence</Text>
                        <Dropdown
                            style={{ width: "91%", backgroundColor: COLORS.white, alignSelf: "center", borderRadius: 8, padding: "2%", marginTop: "1%", paddingHorizontal: 14 }}
                            placeholderStyle={styles.dropText}
                            selectedTextStyle={styles.dropText}
                            data={countryListValue}
                            maxHeight={350}
                            itemTextStyle={themeForList}
                            labelField="name"
                            valueField="name"
                            onChange={item => { setCountryResidenceValue(item.name) }}
                            placeholder={(userData?.country_of_residence) ? countryResidenceValue : "Select country of residence"}
                        />
                    </View>
                    {countryResidenceError ?
                        <View style={{ paddingLeft: 19, height: "1.8%", marginLeft: "2%" }}>
                            <Text style={styles.errorText}>{countryResidenceError}</Text>
                        </View>
                        : null}
                    <View style={{ margin: "1%" }}>
                        <Text style={{ paddingLeft: "5%", ...FONTS.lexendregular, color: COLORS.gray, fontSize: RFValue(12) }}>Date of birth</Text>
                        <TouchableOpacity style={{ width: "91%", backgroundColor: COLORS.white, alignSelf: "center", justifyContent: "center", borderRadius: 8, ...FONTS.lexendregular, color: COLORS.black, fontSize: RFValue(16), paddingLeft: 14, marginTop: "1%", height: 50 }}
                            onPress={() => Platform.OS == 'ios' ? setModalVisible(true) : setDateShow(true)}
                        >
                            <Text style={styles.dropText}>{(date) ? moment(date).format('YYYY-MM-DD') : "Date of birth"}</Text>
                            {/* {console.log("Date/...........",new Date(),"ddfdfd..........",userDate)} */}
                        </TouchableOpacity>
                        {dateShow ?
                            <DateTimePicker
                                value={new Date()}
                                mode="date"
                                display="default"
                                onChange={selectedDateFunction}
                                // minimumDate={new Date()}
                                maximumDate={new Date()}
                            />
                            : null}
                        {/* { modalVisible ?<View style={styles.modalView}> */}


                        <DatePicker
                            modal
                            open={modalVisible}
                            date={new Date(date)}
                            mode="date"
                            maximumDate={new Date()}
                            onConfirm={(date) => {
                                setModalVisible(false)
                                selectedDateFunction({}, date)
                            }}
                            onCancel={() => {
                                setModalVisible(false)
                            }}
                        />
                    </View>
                    {dateError ?
                        <View style={{ paddingLeft: 19, height: "1.8%", marginLeft: "2%" }}>
                            <Text style={styles.errorText}>{dateError}</Text>
                        </View>
                        : null}
                    <TouchableOpacity style={{ borderWidth: 1, alignSelf: "center", borderColor: COLORS.gray, marginVertical: verticalScale(30), width: "60%", borderRadius: 10 }}
                        onPress={() => uploadpersonalDetails()}
                    >
                        <Text style={{ ...FONTS.lexendsemibold, fontSize: RFValue(18), textAlign: "center", color: COLORS.black, paddingVertical: "6%" }}>Save</Text>
                    </TouchableOpacity>
                    <View style={{ paddingBottom: "30%" }} />

                </ScrollView>
                :
                <View style={{ width: "100%", alignItems: "center", height: "92%", justifyContent: "center" }}>
                    <LoaderKit
                        style={{ width: 100, height: 105 }}
                        name={'BallClipRotatePulse'} // Optional: see list of animations below
                        size={30} // Required on iOS
                        color={COLORS.element} // Optional: color can be: 'red', 'green',... or '#ddd', '#FFFFFF',
                    />
                </View>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    subdivOne: {
        width: horizontalScale(375),
        height: verticalScale(80),
        backgroundColor: "#0a0127",
        alignItems: "center",
        // justifyContent: 'center',
        flexDirection: "row"
    },
    radioios: {
        ...Platform.select({
            ios: {
                height: 25,
                width: 25,
                margin: 2
            }
        })
    },
    touchButton: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: "center"
    },
    fontSizeStyle: {
        ...FONTS.lexendregular,
        color: COLORS.black,
        fontSize: RFValue(14),
        width: "82%",
        left: "30%"
    },
    viewBox: {
        width: "89%",
        backgroundColor: COLORS.white,
        alignSelf: "center",
        borderRadius: 10,
        padding: 5
    },
    fontHeadStyle: {
        ...FONTS.lexendsemibold,
        color: COLORS.black,
        fontSize: RFValue(18),
        width: "82%",
        left: "6%",
        marginTop: "3%"
    },
    divider: {
        borderTopColor: COLORS.lightGray,
        width: "118%",
        right: "10%",
        borderTopWidth: 2
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
    inputHeight: {
        ...Platform.select({
            ios: {
                height: 50
            }
        })
    },
    centeredView: {
        flex: 1,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        // backgroundColor: 'block',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
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

export default PersonalDetails;