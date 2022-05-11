import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, Screen, Switch, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingHorizontal: spacing[4],
  marginVertical: spacing[4],
  flex: 1,
  justifyContent: "space-between",
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const BLACK_TEXT: TextStyle = { color: color.palette.black }

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  ...BLACK_TEXT,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...BOLD,
  ...BLACK_TEXT,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}

const REMEMBER_TOGGLE: ViewStyle = {
  marginTop: 15,
  flexDirection: "row",
  justifyContent: "space-between",
}

const REMEMBER_TOGGLE_TEXT: TextStyle = {
  ...BLACK_TEXT,
  opacity: 0.5,
}

const BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.primaryGreen,
  marginVertical: 10,
}

const BUTTON_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 16,
}

export const SigninScreen: FC<StackScreenProps<NavigatorParamList, "signin">> = observer(
  ({ navigation }) => {
    const [toggle, setToggle] = useState(false)

    const onTogglePress = () => {
      setToggle(!toggle)
      return toggle
    }

    const goBack = () => navigation.goBack()
    const nextScreen = () => navigation.navigate("demo")

    return (
      <View testID="SignInScreen" style={FULL}>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.white}>
          <View>
            <Header
              headerTx="signInScreen.navHeader"
              leftIcon="back"
              onLeftPress={goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />
            <Text style={TITLE} preset="header" tx="signInScreen.loginWelcome" />
            <TextField
              labelTx="signInScreen.emailField"
              placeholderTx="signInScreen.emailPlaceHolder"
            />
            <TextField
              labelTx="signInScreen.passwordField"
              placeholderTx="signInScreen.passwordPlaceholder"
            />
            <View style={REMEMBER_TOGGLE}>
              <Text style={REMEMBER_TOGGLE_TEXT} tx="signInScreen.rememberMe" />
              <Switch value={toggle} onToggle={onTogglePress} />
            </View>
          </View>
          <View>
            <Button
              style={BUTTON}
              textStyle={[BUTTON_TEXT]}
              tx="signInScreen.signinBtn"
              onPress={nextScreen}
            />
          </View>
        </Screen>
      </View>
    )
  },
)
