import React, { useEffect } from "react";
import { Image, View, Text, Button, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { productDrawHandler } from '../../store/reducers/productdraw';
import DataPage from "../Home/dataPage";
import Draws from "../Draws/draws";
import NotificationList from "../Home/notificationList";
import Tickets from "../Tickets/tickets";
import Cart from "../Cart/cart";
import { icons, COLORS, FONTS } from "../../constants";
import { useDispatch, useSelector } from 'react-redux';
import { RFValue } from "react-native-responsive-fontsize";

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    tabStyle:
        [{ backgroundColor: COLORS.white, borderWidth: 2 }],
};

const Tabs = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useEffect(() => {
        dispatch(productDrawHandler())
    }, [])

    return (
        <Tab.Navigator
            backBehavior="initialRoute"
            initialRouteName={'DataPage'}
            // tabBarOptions={tabOptions}
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: { height: Platform.OS === "ios" ? RFValue(88) : RFValue(65) },
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.element : COLORS.gray;

                    switch (route.name) {
                        case "Notification":
                            return (
                                <View style={{ height: "100%" }}>
                                    <View style={{ width: 36, height: 4, alignSelf: "center", margin: 0, padding: 0 }}>
                                        {focused &&
                                            <Image
                                                source={icons.tabTopSlide}
                                                resizeMode="contain"
                                                style={{ width: "100%", height: "100%" }}
                                            />
                                        }
                                    </View>
                                    <View style={{ marginTop: 7, alignItems: "center" }}>
                                        {focused ? <Image
                                            source={icons.tabBellColor}
                                            resizeMode="contain"
                                            style={{
                                                width: RFValue(26),
                                                height: RFValue(26)
                                            }}
                                        /> :
                                            <Image
                                                source={icons.tabBellNoColor}
                                                resizeMode="contain"
                                                style={{
                                                    width: RFValue(26),
                                                    height: RFValue(26)
                                                }}
                                            />}
                                        <Text style={{ color: tintColor, ...FONTS.lexendregular, fontSize: RFValue(9) }}>Notifications</Text>
                                    </View>
                                </View>
                            );
                        case "Draws":
                            return (
                                <View style={{ height: "100%" }}>
                                    <View style={{ width: 36, height: 4, alignSelf: "center", margin: 0, padding: 0 }}>
                                        {focused &&
                                            <Image source={icons.tabTopSlide}
                                                resizeMode="contain"
                                                style={{ width: "100%", height: "100%" }}
                                            />
                                        }
                                    </View>
                                    <View style={{ marginTop: 7, alignItems: "center" }}>
                                        {focused ? <Image
                                            source={icons.tabDrawColor}
                                            resizeMode="contain"
                                            style={{
                                                width: RFValue(26),
                                                height: RFValue(26)
                                            }}
                                        /> :
                                            <Image
                                                source={icons.tabDrawNoColor}
                                                resizeMode="contain"
                                                style={{
                                                    width: RFValue(26),
                                                    height: RFValue(26)
                                                }}
                                            />}
                                        <Text style={{ color: tintColor, ...FONTS.lexendregular, fontSize: RFValue(9) }}>Draws</Text>
                                    </View>
                                </View>
                            );
                        case "DataPage":
                            return (
                                <View style={{ height: "100%" }}>
                                    <View style={{ width: 36, height: 4, alignSelf: "center", margin: 0, padding: 0 }}>
                                        {focused &&
                                            <Image source={icons.tabTopSlide}
                                                resizeMode="contain"
                                                style={{ width: "100%", height: "100%" }}
                                            />}
                                    </View>
                                    <View style={{ marginTop: 7, alignItems: "center" }}>
                                        {focused ? <Image
                                            source={icons.tabHomeColor}
                                            resizeMode="contain"
                                            style={{
                                                width: RFValue(26),
                                                height: RFValue(26)
                                            }}
                                        /> :
                                            <Image
                                                source={icons.tabHomeNoColor}
                                                resizeMode="contain"
                                                style={{
                                                    width: RFValue(26),
                                                    height: RFValue(26)
                                                }}
                                            />}
                                        <Text style={{ color: tintColor, ...FONTS.lexendregular, fontSize: RFValue(9) }}>Home</Text>
                                    </View>
                                </View>
                            );
                        case "Tickets":
                            return (
                                <View style={{ height: "100%" }}>
                                    <View style={{ width: 36, height: 4, alignSelf: "center", margin: 0, padding: 0 }}>
                                        {focused &&
                                            <Image source={icons.tabTopSlide}
                                                resizeMode="contain"
                                                style={{ width: "100%", height: "100%" }}
                                            />}
                                    </View>
                                    <View style={{ marginTop: 7, alignItems: "center" }}>
                                        {focused ? <Image
                                            source={icons.tabTicketColor}
                                            resizeMode="contain"
                                            style={{
                                                width: RFValue(26),
                                                height: RFValue(26),
                                            }}
                                        /> :
                                            <Image
                                                source={icons.tabTicketNoColor}
                                                resizeMode="contain"
                                                style={{
                                                    width: RFValue(26),
                                                    height: RFValue(26),
                                                }}
                                            />}
                                        <Text style={{ color: tintColor, ...FONTS.lexendregular, fontSize: RFValue(9) }}>Tickets</Text>
                                    </View>
                                </View>
                            );
                        case "Cart":
                            return (
                                <View style={{ height: "100%" }}>
                                    <View style={{ width: 36, height: 4, alignSelf: "center", margin: 0, padding: 0 }}>

                                        {focused && <Image source={icons.tabTopSlide}
                                            resizeMode="contain"
                                            style={{ width: "100%", height: "100%" }}
                                        />}
                                    </View>
                                    <View style={{ marginTop: 7, alignItems: "center" }}>
                                        {focused ? <Image
                                            source={icons.tabTrolleyColor}
                                            resizeMode="contain"
                                            style={{
                                                width: RFValue(26),
                                                height: RFValue(26),
                                            }}
                                        /> :
                                            <Image
                                                source={icons.tabTrolleyNoColor}
                                                resizeMode="contain"
                                                style={{
                                                    width: RFValue(26),
                                                    height: RFValue(26),
                                                }}
                                            />}
                                        <Text style={{ color: tintColor, ...FONTS.lexendregular, fontSize: RFValue(9) }}>Cart</Text>

                                    </View>
                                </View>
                            );
                    }
                }
            })}
        >
            <Tab.Screen
                name="Notification"
                component={NotificationList}
                options={{ headerShown: false }}
            // title: "Dashboard",
            // headerStyle: {
            //     backgroundColor: COLORS.primary,

            // },
            // headerTitleStyle:{
            //     color:COLORS.white,
            //     marginLeft:"25%",
            //     fontSize:RFValue(16,580)

            // }
            // headerLeft: null,
            // headerRight: () => (
            //     <TouchableOpacity
            //         style={{ marginRight: SIZES.padding }}
            //         onPress={() => console.log("Pressed")}
            //     >

            //     </TouchableOpacity>
            // ),
            //}}
            />
            <Tab.Screen
                name="Draws"
                component={Draws}
                options={{
                    headerShown: false
                    // title: "Draws",
                    // headerLeft: () => (
                    //     <TouchableOpacity style={{ marginLeft: "20%",borderWidth:0 }} onPress={() => navigation.navigate('Home',{screen:'Search'})}>
                    //         <MCIcon name="keyboard-backspace" size={RFValue(25)} color={COLORS.white} />
                    //     </TouchableOpacity>
                    // ),
                    // headerStyle: {
                    //     backgroundColor: COLORS.primary,
                    //     // borderBottomStartRadius: 30, 
                    //     // borderBottomEndRadius: 30
                    // },
                    // headerTitleStyle: {
                    //     color: COLORS.white,
                    //     ...FONTS.lexendregular,
                    //     right:"115%",
                    //     fontSize: RFValue(16, 580)
                    // }
                }}
            />
            <Tab.Screen
                name="DataPage"
                component={DataPage}
                options={{ headerShown: false }}
            // {{title: "Search Your Courses",
            // headerStyle: {
            //     backgroundColor: COLORS.primary,
            // },
            // headerTitleStyle:{
            //     color:COLORS.white,
            //     marginLeft:"15%",
            //     marginTop:"5%",
            //     fontSize:RFValue(14,580)
            // }}}
            />
            <Tab.Screen
                name="Tickets"
                component={Tickets}
                options={{
                    headerShown: false
                    // title: "Tickets",
                    // headerLeft: () => (
                    //     <TouchableOpacity style={{ marginLeft: "20%",borderWidth:0 }} onPress={() => navigation.navigate('Home',{screen:'Search'})}>
                    //         <MCIcon name="keyboard-backspace" size={RFValue(25)} color={COLORS.white} />
                    //     </TouchableOpacity>
                    // ),
                    // headerStyle: {
                    //     backgroundColor: COLORS.primary,
                    //     // borderBottomStartRadius: 30, 
                    //     // borderBottomEndRadius: 30
                    // },
                    // headerTitleStyle: {
                    //     color: COLORS.white,
                    //     ...FONTS.lexendregular,
                    //     right:"115%",
                    //     fontSize: RFValue(16, 580)
                    // }
                }}
            />

            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false
                    // title: <Text>MyCourses <Text style={{fontSize:8}}>and</Text> WishLists</Text>,
                    // headerLeft: () => (
                    //     <TouchableOpacity style={{ marginLeft: "20%",borderWidth:0}} onPress={() => navigation.navigate('Home',{screen:'Search'})}>
                    //         <MCIcon name="keyboard-backspace" size={RFValue(25)} color={COLORS.white} />
                    //     </TouchableOpacity>
                    // ),
                    // headerStyle: {
                    //     backgroundColor: COLORS.primary,
                    //     // borderBottomStartRadius: 30, 
                    //     // borderBottomEndRadius: 30
                    // },
                    // headerTitleStyle: {
                    //     color: COLORS.white,
                    //     // marginRight: "25%",
                    //     right:"30%",
                    //     ...FONTS.robotoregular,
                    //     borderWidth:0,
                    //     fontSize: RFValue(16, 580)
                    // }
                }}
            // {...backBehavior:'none'}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
