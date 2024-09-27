import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  // CheckBox,
  useColorScheme,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  // Button
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { horizontalScale, verticalScale } from "../constants/metrices";
// import InputBox from 'react-native-floating-label-inputbox';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { loginicon } from "../constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";




const Landing = (props: Props) => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
      setAnimationLoaded(true);
    }, 2000);
  }, []);

  const authentication = async () => {
    let Token = await AsyncStorage.getItem('loginToken');
    if (Token) {
      props.navigation.replace('Tabs');
    } else {
      props.navigation.replace('login');
    }
  }

  useEffect(() => {
    if (authLoaded && animationLoaded) {
      authentication();
    }
  }, [authLoaded, animationLoaded, props.navigation]);

  return (
    <View style={styles.root}>
      <Image
        source={loginicon}
        resizeMode="contain"
        style={{
          height: verticalScale(150),
          width: horizontalScale(130)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0127'
  },
});

export default Landing;