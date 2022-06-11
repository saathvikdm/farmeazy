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
import { useNavigation } from "@react-navigation/native"

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
  fontSize: 16,
}

export const ProfileEditScreen = ({ navigation }) => {
  const [email, setemail] = useState<string>("")
  const [firstname, setfirstname] = useState<string>("")
  const [lastname, setlastname] = useState<string>("")
  const [phone, setphone] = useState<string>("")
  const [address, setaddress] = useState("")
  const [city, setcity] = useState("")
  const [userID, setUserID] = React.useState("")
  const [token, settoken] = React.useState("")
  const [loading, setloading] = React.useState(true)

  const goBack = () => navigation.goBack()

  React.useEffect(() => {
    ;(async () => {
      const userID = await AsyncStorage.getItem("userID")
      const token = await AsyncStorage.getItem("token")
      settoken(token)
      const config = {
        headers: {
          Authorization: token,
        },
      }
      try {
        const res = await axios.get(`users/${userID}`, config)
        setUserID(userID)
        setemail(res.data.user[0].email)
        setfirstname(res.data.user[0].firstname)
        setlastname(res.data.user[0].lastname)
        setphone(res.data.user[0].phone)
        setcity(res.data.user[0].city)
        setaddress(res.data.user[0].address)
        setloading(false)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  const saveDetails = async () => {
    const data = {
      email,
      firstname,
      lastname,
      phone,
      address,
      city,
    }

    try {
      const config = {
        headers: {
          Authorization: token,
        },
      }
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
          {loading ? (
            <Text>loading...</Text>
          ) : (
            <ScrollView>
              <Header
                headerText="Edit Profile Details"
                leftIcon="back"
                onLeftPress={goBack}
                style={HEADER}
                titleStyle={HEADER_TITLE}
              />
              <TextField
                // labelTx="signUpScreen.nameField"
                label="Firstname"
                // placeholderTx="signUpScreen.namePlaceHolder"
                placeholder="Enter firstname"
                onChangeText={(text) => setfirstname(text)}
                value={firstname}
              />
              <TextField
                label="Lastname"
                // placeholderTx="signUpScreen.namePlaceHolder"
                placeholder="Enter lastname"
                onChangeText={(text) => setlastname(text)}
                value={lastname}
              />
              <TextField
                labelTx="signUpScreen.emailField"
                placeholderTx="signUpScreen.emailPlaceHolder"
                onChangeText={(text) => setemail(text)}
                value={email}
              />
              <TextField
                label="Phone Number"
                placeholder="Enter phone number"
                onChangeText={(text) => setphone(text)}
                value={phone}
              />
              <TextField
                label="Address"
                placeholder="Enter address"
                onChangeText={(text) => setaddress(text)}
                value={address}
              />
              <TextField
                label="City"
                placeholder="Enter city"
                onChangeText={(text) => setcity(text)}
                value={city}
              />
              <Button
                style={BUTTON}
                textStyle={[BUTTON_TEXT]}
                text="Update Details"
                onPress={saveDetails}
              />
            </ScrollView>
          )}
        </View>
      </Screen>
    </View>
  )
}
