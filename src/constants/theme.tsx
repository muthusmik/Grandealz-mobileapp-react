import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { RFValue } from "react-native-responsive-fontsize";

export const COLORS = {
    // base colors
    primary: "#0a0127", // purple
    secondary: "#cacfd9",   // Gray
    topBackground: "#0a0127", //background
    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    lightGray: "#eff2f5",
    gray: "#616161",
    back: "#f0e1e1",
    element: "#E70736",
    element2: "#C6006D",
    element3: "#FF006D",
    elementBase: "#FF0D0D",
    elementBase2: "#FF0000",
    textHeader: "#000000",
    pagebackground: "#f1f1f1",
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 50,
    h1: RFValue(26),
    h2: RFValue(20),
    h3: RFValue(14),
    h4: RFValue(12),
    body1: RFValue(26),
    body2: RFValue(20),
    body3: RFValue(16),
    body4: RFValue(12),
    body5: RFValue(10),

    // app dimensions
    width,
    height
};
export const FONTS = {
    largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h1, lineHeight: 36, color: COLORS.black, fontWeight: "700" },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    lexendregular: { fontFamily: "Lexend-Regular" },
    lexendsemibold: { fontFamily: "Lexend-SemiBold" }
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
