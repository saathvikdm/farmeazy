import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, ItemPicker, Screen, Switch, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { Picker } from "@react-native-picker/picker"

import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import connectionUrl from "../../connection.js"
import { ScrollView } from "react-native-gesture-handler"

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
  // marginVertical: 10,
}

const BUTTON_TEXT: TextStyle = {
  ...TEXT,
  fontWeight: "bold",
  fontSize: 16,
}

export const SignupScreen: FC<StackScreenProps<NavigatorParamList, "signup">> = observer(
  ({ navigation }) => {
    const [email, setemail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [firstname, setfirstname] = useState<string>("")
    const [lastname, setlastname] = useState<string>("")
    const [phone, setphone] = useState<string>("")
    const [address, setaddress] = useState("")
    const [city, setcity] = useState("")
    const [UserTypeId, setUserTypeId] = useState(2)

    const goBack = () => navigation.goBack()

    const handleSignup = async () => {
      const data = {
        email,
        password,
        firstname,
        lastname,
        phone,
        address,
        city,
        UserTypeId,
      }

      try {
        console.log(data)
        const res = await axios.post("users/create", data)
        // await AsyncStorage.setItem("token", res.data.token)
        // await AsyncStorage.setItem("userID", res.data.user.id.toString())
        console.log("Successfully created an account!")
        if (res.data.user) navigation.navigate("signin")
      } catch (err) {
        console.log(err)
        alert("Missing fields.")
      }
    }

    return (
      <View testID="SignUpScreen" style={FULL}>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.white}>
          <View style={FULL}>
            <Header
              headerTx="signUpScreen.navHeader"
              leftIcon="back"
              onLeftPress={goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />
            <Text style={TITLE} preset="header" tx="signUpScreen.signUpTitle" />
            <ScrollView>
              <TextField
                // labelTx="signUpScreen.nameField"
                label="Firstname"
                // placeholderTx="signUpScreen.namePlaceHolder"
                placeholder="Enter firstname"
                onChangeText={(text) => setfirstname(text)}
              />
              <TextField
                label="Lastname"
                // placeholderTx="signUpScreen.namePlaceHolder"
                placeholder="Enter lastname"
                onChangeText={(text) => setlastname(text)}
              />
              <TextField
                labelTx="signUpScreen.emailField"
                placeholderTx="signUpScreen.emailPlaceHolder"
                onChangeText={(text) => setemail(text)}
              />
              <TextField
                labelTx="signUpScreen.passwordField"
                placeholderTx="signUpScreen.passwordPlaceholder"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              />
              <TextField
                label="Phone Number"
                placeholder="Enter phone number"
                onChangeText={(text) => setphone(text)}
              />
              <TextField
                label="Address"
                placeholder="Enter address"
                onChangeText={(text) => setaddress(text)}
              />
              <TextField
                label="City"
                placeholder="Enter city"
                onChangeText={(text) => setcity(text)}
              />
              <ItemPicker
                labelTx="signUpScreen.accountType"
                UserTypeId={UserTypeId}
                setUserTypeID={setUserTypeId}
              />

              <Button
                style={BUTTON}
                textStyle={[BUTTON_TEXT]}
                tx="signUpScreen.signUpBtn"
                onPress={handleSignup}
              />
            </ScrollView>
          </View>
        </Screen>
      </View>
    )
  },
)
