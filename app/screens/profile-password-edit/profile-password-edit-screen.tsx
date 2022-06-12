import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, ItemPicker, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

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

export const ProfilePasswordEditScreen = ({ navigation }) => {
  const [userID, setUserID] = useState("")
  const [token, settoken] = useState("")
  const [loading, setloading] = useState(true)
  const [password, setPassword] = useState("")
  const [oldpassword, setoldPassword] = useState("")

  const goBack = () => navigation.goBack()

  React.useEffect(() => {
    ;(async () => {
      const userID = await AsyncStorage.getItem("userID")
      const token = await AsyncStorage.getItem("token")
      settoken(token)
      setUserID(userID)
    })()
  }, [])

  const saveDetails = async () => {
    const data = {
      password,
    }
    const config = {
      headers: {
        Authorization: token,
      },
    }
    try {
      const res = await axios.put(`users/${userID}`, data, config)
      console.log("Successfully updated!")
      if (res.status === 200) navigation.goBack()
    } catch (err) {
      console.log(err)
      alert("Error Occured: Try again later!")
    }
  }

  return (
    <View style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.white}>
        <View style={FULL}>
          <ScrollView>
            <Header
              headerText="Change Password"
              leftIcon="back"
              onLeftPress={goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />
            <TextField
              // labelTx="signUpScreen.nameField"
              label="Current Password"
              // placeholderTx="signUpScreen.namePlaceHolder"
              placeholder="Enter current password"
              onChangeText={(text) => setoldPassword(text)}
              value={oldpassword}
            />
            <TextField
              label="New Password"
              // placeholderTx="signUpScreen.namePlaceHolder"
              placeholder="Enter new password"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <Button
              style={BUTTON}
              textStyle={[BUTTON_TEXT]}
              text="Update Password"
              onPress={saveDetails}
            />
          </ScrollView>
        </View>
      </Screen>
    </View>
  )
}
