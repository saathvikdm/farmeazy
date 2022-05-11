import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text, AutoImage as Image, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

const loginImage = require("./Frame.png")

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  marginVertical: spacing[4],
}

const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 343,
  height: 230,
}

const HEADER: ViewStyle = {
  marginTop: 20,
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: "#000",
  fontSize: 32,
  textAlign: "center",
}

const SUBTITLE: TextStyle = {
  ...TEXT,
  color: "#7C7C7C",
  fontSize: 16,
  fontWeight: "100",
  textAlign: "center",
}

const FOOTER: ViewStyle = {
  width: "85%",
}

const BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.primaryGreen,
  marginVertical: 10,
}

const BUTTON_OUTLINE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.white,
  borderColor: color.palette.blackT,
  borderWidth: 0.8,
}

const BUTTON_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 16,
}

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(
  ({ navigation }) => {
    const signInScreen = () => navigation.navigate("signin")
    const signUpScreen = () => navigation.navigate("signup")
    return (
      <Screen style={ROOT} preset="scroll">
        <View style={HEADER}>
          <Text preset="header" tx="loginScreen.title" style={TITLE} />
          <Text preset="header" tx="loginScreen.subTitle" style={SUBTITLE} />
        </View>
        <Image source={loginImage} style={BOWSER} />
        <View style={FOOTER}>
          <Button
            testID="next-screen-button"
            tx="loginScreen.signIn"
            style={BUTTON}
            textStyle={[BUTTON_TEXT]}
            onPress={signInScreen}
          />
          <Button
            testID="next-screen-button"
            tx="loginScreen.signUp"
            style={BUTTON_OUTLINE}
            textStyle={[BUTTON_TEXT, { color: color.palette.black }]}
            onPress={signUpScreen}
          />
        </View>
      </Screen>
    )
  },
)
