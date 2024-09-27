import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StatusBar,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { verticalScale, horizontalScale } from "../../constants/metrices";
import { shoppingCart } from "../../constants/icons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import TicketDetails from "../../component/ticketDetails";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../constants";
import { activeTicketGet } from "../../services/ticket";
import { Button } from "react-native-paper";
import LoaderKit from 'react-native-loader-kit';
import { useIsFocused } from "@react-navigation/core";
import TicketEmpty from "../ExceptionScreens/ticketEmpty";


const Tickets = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [Ticketlistdata, setTicketlistdata] = useState<any>();
    const [loader, setLoader] = useState<any>(false);
    useEffect(() => {
        if (isFocused) {
            setLoader(true);
            soon();
        }
    }, [isFocused])
    const soon = async () => {
        let TicketList = await activeTicketGet()
        setTicketlistdata(TicketList)
        setLoader(false)
    }
    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor="#0A0127"
            />
            <View style={styles.subdivOne}>
                <Text style={{ fontFamily: "Lexend-SemiBold", color: "white", fontSize: RFValue(20), textAlign: "center" }}>Tickets</Text>
            </View>
            <View style={styles.subdivTwo}>
                {(!loader) ?
                    (Ticketlistdata) ?
                        <TicketDetails Ticketdata={Ticketlistdata} />
                        :
                        <TicketEmpty />
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
            </View>
            <View>
                <Text>You can view active coupons here after you make your purchase</Text>
                <Button>Start Shopping</Button>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    subdivOne: {
        width: horizontalScale(375),
        height: verticalScale(80),
        backgroundColor: "#0A0127",
        justifyContent: 'center',
    },
    subdivTwo: {
        backgroundColor: COLORS.lightGray
    }
})
export default Tickets;