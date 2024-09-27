import React, { type PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './src/screens/landing';
import ForgetPassword from './src/screens/forgetPassword';
import DataPage from './src/screens/Home/dataPage';
import Tabs from './src/screens/navigationTabs/tab';
import Signup from './src/screens/signup';
import Login from './src/screens/login';
import ChangeMobileNumber from './src/screens/changeMobileNumber';
import User from './src/screens/User/user';
import WishList from './src/screens/wishList';
import OtpPage from './src/screens/otpPage';
import PriceDetails from './src/screens/PriceDetails';
import Delivery from './src/screens/Cart/delivery';
import Address from './src/screens/Cart/address';
import AddAddress from './src/screens/Cart/addAddress';
import PaymentGate from './src/screens/Cart/payPage';
import AddNewPayee from './src/screens/Cart/addNewPayee';
import PrivacyPolicy from './src/screens/privacyPolicy';
import UserAgreement from './src/screens/userAgreement';
import Faq from './src/screens/faq';
import PaymentOptions from './src/screens/Payments/paymentOptions';
import ChangePassword from './src/screens/changePassword';
import MyOrders from './src/screens/Myorders/myOrders';
import OrderDetails from './src/screens/Myorders/orderDetails';
import Coins from './src/screens/Coins';
import PersonalDetails from './src/component/personalDetails';
import OurProducts from './src/screens/ourProduct';
import DetailedProduct from './src/screens/detailedProduct';
import HowItWorks from './src/screens/howitworks';
import Coupons from './src/screens/Tickets/coupon';

import PlayNow from './src/screens/Myorders/playNow';
import Playnowquiz from './src/screens/Myorders/playnowquiz';
import Playnowquizsubmit from './src/screens/Myorders/playnowquizsubmit';
import NetworkError from './src/screens/networkErrorPage';
import EditAddress from './src/screens/Cart/editAddress';
import OrderConfirmed from './src/component/orderConfirmed';


const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="landing">
        <Stack.Screen name="landing" component={Landing} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="DataPage" component={DataPage} />
        <Stack.Screen name="OtpPage" component={OtpPage} />
        <Stack.Screen name="ChangeMobileNumber" component={ChangeMobileNumber} />
        <Stack.Screen name="WishList" component={WishList} />
        <Stack.Screen name="PriceDetails" component={PriceDetails} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Delivery" component={Delivery} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="PayPage" component={PaymentGate} />
        <Stack.Screen name="AddNewPayee" component={AddNewPayee} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="UserAgreement" component={UserAgreement} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="PaymentOptions" component={PaymentOptions} />
        <Stack.Screen name="Coins" component={Coins} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="OurProducts" component={OurProducts} />
        <Stack.Screen name="DetailedProduct" component={DetailedProduct} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="HowItWorks" component={HowItWorks} />
        <Stack.Screen name="Coupons" component={Coupons} />
        <Stack.Screen name="PlayNow" component={PlayNow} />
        <Stack.Screen name="playnowquiz" component={Playnowquiz} />
        <Stack.Screen name="Playnowquizsubmit" component={Playnowquizsubmit} />
        <Stack.Screen name="EditAddress" component={EditAddress} />
        <Stack.Screen name="NetworkError" component={NetworkError} />
        <Stack.Screen name="OrderConfirmed" component={OrderConfirmed} />

        < Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
