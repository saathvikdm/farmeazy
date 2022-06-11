import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, ItemPicker, Screen, Text, TextField } from "../../components"
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
  color: color.palette.black,
  fontFamily: typography.primary,
  textAlign: "center",
  fontSize: 24,
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

const JUSTIFY: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const ProfileSupportScreen = ({ navigation }) => {
  const goBack = () => navigation.goBack()
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={FULL}>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.white}>
          <View style={FULL}>
            <Header
              headerText="Contact Support"
              leftIcon="back"
              onLeftPress={goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />
            <View style={[FULL, JUSTIFY]}>
              <Text style={TEXT}>Here you will be able to contact FarmEazy Support Team Soon!</Text>
            </View>
          </View>
        </Screen>
      </View>
    </Screen>
  )
}
