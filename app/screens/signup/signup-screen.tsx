import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, ItemPicker, Screen, Switch, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { Picker } from "@react-native-picker/picker"

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

export const SignupScreen: FC<StackScreenProps<NavigatorParamList, "signup">> = observer(
  ({ navigation }) => {
    const [toggle, setToggle] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState()

    const onTogglePress = () => {
      setToggle(!toggle)
      return toggle
    }

    const goBack = () => navigation.goBack()
    const nextScreen = () => navigation.navigate("demo")

    return (
      <View testID="SignUpScreen" style={FULL}>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.white}>
          <View>
            <Header
              headerTx="signUpScreen.navHeader"
              leftIcon="back"
              onLeftPress={goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />
            <Text style={TITLE} preset="header" tx="signUpScreen.signUpTitle" />
            <TextField
              labelTx="signUpScreen.nameField"
              placeholderTx="signUpScreen.namePlaceHolder"
            />
            <TextField
              labelTx="signUpScreen.emailField"
              placeholderTx="signUpScreen.emailPlaceHolder"
            />
            <TextField
              labelTx="signUpScreen.passwordField"
              placeholderTx="signUpScreen.passwordPlaceholder"
            />
            <TextField
              labelTx="signUpScreen.passwordRepeatField"
              placeholderTx="signUpScreen.passwordRepeatPlaceholder"
            />
            <ItemPicker labelTx="signUpScreen.accountType" />
          </View>
          <View>
            <Button
              style={BUTTON}
              textStyle={[BUTTON_TEXT]}
              tx="signUpScreen.signUpBtn"
              onPress={nextScreen}
            />
          </View>
        </Screen>
      </View>
    )
  },
)
