import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, Modal, ImageBackground, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { horizontalScale, verticalScale } from '../../constants/metrices';
import { COLORS, icons } from '../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { allocteTickets } from '../../services/allocateTicket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const Playnowquiz = (props) => {
    const [questions, setQustions] = useState(props.route.params);
    const navigation = useNavigation();
    const [answer, setAnswer] = useState<any>('')
    const [quesno, setQuesNo] = useState(0);
    const [option, setOption] = useState<any>('')
    const [error, setError] = useState<any>('')
    const [tryAgainState, setTryAgainState] = useState(true)
    const [buttonOptionOne, setButtonOptionOne] = useState(false)
    const [buttonOptionTwo, setButtonOptionTwo] = useState(false)
    const [buttonOptionThree, setButtonOptionThree] = useState(false)
    const [buttonOptionFour, setButtonOptionFour] = useState(false)
    const [buttonSubmit, setButtonSubmit] = useState(false)
    const [congratState, setCongratState] = useState(false)

    console.log("Page props in play now quiz.............", answer)
    useEffect(() => {
        if (option == 1) {

            setButtonOptionTwo(false), setButtonOptionThree(false), setButtonOptionFour(false)
        }
        else if (option == 2) {
            setButtonOptionOne(false), setButtonOptionThree(false), setButtonOptionFour(false)
        }
        else if (option == 3) {
            setButtonOptionTwo(false), setButtonOptionOne(false), setButtonOptionFour(false)
        }
        else if (option == 4) {
            setButtonOptionTwo(false), setButtonOptionThree(false), setButtonOptionOne(false)
        }
        else {
            setButtonOptionTwo(false), setButtonOptionThree(false), setButtonOptionOne(false)
        }
    }, [option])
    useEffect(() => {
        getRandom(0, questions.length - 1);
    }, [questions])
    function getRandom(min, max) {
        const floatRandom = Math.random()
        const difference = max - min
        // random between 0 and the difference
        const random = Math.round(difference * floatRandom)

        const randomWithinRange = random + min
        setQuesNo(randomWithinRange);
        console.log("randomWithinRange", randomWithinRange)
    }
    const validateAnswer = async () => {
        console.log("answer", answer)
        setButtonSubmit(true);
        if (answer.length != 0) {
            console.log("Ans from api.....", questions[quesno].ans, "User selected ans........", answer)
            let orderId = await AsyncStorage.getItem("orderIdForPlay")
            console.log("OrderId in play now quiz..............", orderId)
            if (answer == questions[quesno].ans) {
                await allocteTickets(orderId)
                    .then((originalPromiseResult) => {
                        console.log("Response for allocate........", originalPromiseResult)
                        if (originalPromiseResult.message === "success") {
                            // navigation.replace("Playnowquizsubmit", originalPromiseResult.data)
                            setCongratState(true)
                        }
                        else if (originalPromiseResult === undefined) {
                            Toast.show('Something went wrong!, Please try again later', Toast.LONG, { backgroundColor: 'red' });
                        }
                        else if (originalPromiseResult.message === "Tickets already allocated") {
                            Toast.show(originalPromiseResult.message, Toast.LONG, { backgroundColor: 'red' });
                            setCongratState(true)
                            // navigation.replace("Playnowquizsubmit", originalPromiseResult.data)
                        }
                    })
                // console.log("enna mapla ok yaaaaa.",result)
            }
            else {
                setButtonOptionOne(true), setButtonOptionTwo(true), setButtonOptionThree(true), setButtonOptionFour(true)
                Toast.show("Oops! Your answer is wrong", Toast.LONG, { backgroundColor: 'red' });
                setTryAgainState(false)
                setButtonSubmit(true)
            }
        }
        else {
            setError('Please select any choice')
            setButtonSubmit(false)
            setTryAgainState(true)
        }
    }
    const tryAgainFunction = () => {
        navigation.replace("playnowquiz", props.route.params)
        // setButtonOptionOne(false), setButtonOptionTwo(false), setButtonOptionThree(false), setButtonOptionFour(false), setButtonSubmit(false), setOption(0), setTryAgainState(true)
    }
    return (
        <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: "rgba(0,0,0,0.5)" }}>
            <StatusBar
                animated={true}
                backgroundColor="#0a0127"
            />
            <View style={{ backgroundColor: COLORS.black }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={true}
                    onRequestClose={() => navigation.goBack()}
                >
                    <View style={Style.maindiv}>
                        <View style={Style.subdiv2}>
                            <Image
                                source={icons.loginwhite}
                                resizeMode='contain'
                                style={{
                                    height: verticalScale(110),
                                    width: horizontalScale(180),
                                }}
                            />
                        </View>
                        <View style={Style.subdiv3}>
                            <View style={{ width: "110%", marginTop: "10%", backgroundColor: "#EEEEEE", alignSelf: "center" }}>
                                <Text style={{ textAlign: "center", paddingVertical: "8%", width: "100%", color: "#303030", fontFamily: "Lexend-Regular" }}>{questions[quesno].q}</Text>
                            </View>
                            <Button disabled={buttonOptionOne} style={{ ...Styles.options, ...{ backgroundColor: (option === 1) ? COLORS.element : "white", borderColor: (option == 1) ? COLORS.element : COLORS.black } }} onPress={() => { setAnswer(questions[quesno].options[0]), setOption(1), setError("") }}>
                                <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "Lexend-Regular", color: (option === 1) ? COLORS.white : COLORS.black }}>{questions[quesno].options[0]}</Text>
                            </Button>
                            <Button disabled={buttonOptionTwo} style={{ ...Styles.options, ...{ backgroundColor: (option === 2) ? COLORS.element : "white", borderColor: (option == 2) ? COLORS.element : COLORS.black } }} onPress={() => { setAnswer(questions[quesno].options[1]), setOption(2), setError("") }}>
                                <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "Lexend-Regular", color: (option === 2) ? COLORS.white : COLORS.black }}>{questions[quesno].options[1]}</Text>
                            </Button>
                            <Button disabled={buttonOptionThree} style={{ ...Styles.options, ...{ backgroundColor: (option === 3) ? COLORS.element : "white", borderColor: (option == 3) ? COLORS.element : COLORS.black } }} onPress={() => { setAnswer(questions[quesno].options[2]), setOption(3), setError("") }}>
                                <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "Lexend-Regular", color: (option === 3) ? COLORS.white : COLORS.black }}>{questions[quesno].options[2]}</Text>
                            </Button>
                            <Button disabled={buttonOptionFour} style={{ ...Styles.options, ...{ backgroundColor: (option === 4) ? COLORS.element : "white", borderColor: (option == 4) ? COLORS.element : COLORS.black } }} onPress={() => { setAnswer(questions[quesno].options[3]), setOption(4), setError("") }}>
                                <Text style={{ textAlign: "center", fontSize: 15, fontFamily: "Lexend-Regular", color: (option === 4) ? COLORS.white : COLORS.black }}>{questions[quesno].options[3]}</Text>
                            </Button>
                            {buttonSubmit ? null :
                                <Button disabled={buttonSubmit} style={{ ...Styles.options, borderColor: COLORS.black }} onPress={() => { validateAnswer() }}>
                                    <Text style={{ textAlign: "center", fontSize: 16, fontFamily: "Lexend-Regular", color: "#0a0127" }}>Submit</Text>
                                </Button>
                            }
                            <View style={{ height: "4%" }}>
                                {(error) ? <Text style={{ fontFamily: "Lexend-Regular", fontSize: RFValue(12), textAlign: "center", color: COLORS.element }}>{error}</Text> : null}
                            </View>
                            {!tryAgainState ?
                                <Button disabled={tryAgainState} onPress={() => tryAgainFunction()}>
                                    <Text style={{ fontSize: RFValue(14), textAlign: "center", color: COLORS.element, fontFamily: "Lexend-SemiBold" }}>Try Again</Text>
                                </Button>
                                : null}
                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={congratState}
                    onRequestClose={() => navigation.goBack()}
                >
                    <View style={Style.maindiv}>
                        <View style={Style.subdiv2}>
                            <Image
                                source={icons.loginwhite}
                                resizeMode='contain'
                                style={{
                                    height: verticalScale(110),
                                    width: horizontalScale(180),
                                }}
                            />
                        </View>
                        <View style={Style.subdiv3}>
                            <View style={{ alignItems: "center", width: "100%", marginVertical: "10%", marginTop: "20%" }}>
                                <View style={{ borderWidth: 5, borderColor: "#DADADA", height: verticalScale(94), width: horizontalScale(90), borderRadius: 90, backgroundColor: "#2A2141" }}>
                                    <ImageBackground source={icons.conlogo} style={{ position: "absolute", width: 45, height: 45, marginLeft: 20, marginTop: 15 }}></ImageBackground>
                                </View>
                            </View>
                            <View style={{ width: "90%", alignSelf: "center" }}>
                                <Text style={{ fontSize: RFValue(16), fontFamily: "Lexend-SemiBold", textAlign: "center", color: "#303030" }}>Congratulations! Avail your tickets at</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.replace("Tabs", { screen: 'Tickets' })}>
                                <View style={{ alignItems: "center", marginTop: "8%" }}>
                                    <View style={{ backgroundColor: "#EEEEEE", width: horizontalScale(200), height: verticalScale(45), borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: RFValue(15), color: "#D10359", fontFamily: "Lexend-SemiBold" }}>Link</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignSelf: "center", marginTop: "8%", borderWidth: 1, borderRadius: 8, width: "110%", padding: "4%" }}
                                onPress={() => navigation.replace("MyOrders")}
                            >
                                <Text style={{ textAlign: "center", fontSize: RFValue(15), fontFamily: "Lexend-Regular", color: "#0a0127" }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

        </SafeAreaView >
    )
}
const Styles = StyleSheet.create({
    subdivmain: {
        width: "100%",
        height: "100%",
        backgroundColor: "red",
        alignSelf: "center"
    },
    subdivmain1: {
        marginTop: "8%",
        width: horizontalScale(330),
        height: verticalScale(140),
        justifyContent: "center",
        alignItems: "center"
    },
    subdiv2: {
        width: "100%",
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
    },
    options: {
        alignSelf: "center",
        marginTop: "8%",
        borderWidth: 1,
        borderRadius: 8,
        width: "110%",
        padding: "1%"
    }
})
const Style = StyleSheet.create({
    centeredView: {
        flex: 1,
        height: "100%",
        Width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red",
    },
    maindiv: {
        marginTop: "22%",
        alignSelf: 'center',
        // backgroundColor: "rgba(11, 0, 41, 0.8)",
        backgroundColor: COLORS.primary,
        width: "90%",
        height: "auto",
        paddingBottom: "16%",
        borderRadius: 20
    },
    subdiv2: {
        width: "100%",
        alignItems: "center",
    },
    subdiv3: {
        width: "90%",
        height: "auto",
        alignSelf: "center",
        paddingHorizontal: "8%",
        paddingBottom: "5%",
        borderRadius: 15,
        backgroundColor: "#FFFFFF"
    },
})
export default Playnowquiz
