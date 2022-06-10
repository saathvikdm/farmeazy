import * as React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, Text, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"

import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons"

import { profile } from "../../store/store.json"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import connectionUrl from "../../connection.js"
import { Profile } from "../../components"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const PROFILE_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
  backgroundColor: color.palette.white,
  marginVertical: 2,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 80,
  width: 80,
}

const PROFILE_TEXT: TextStyle = {
  marginLeft: spacing[4],
  color: color.palette.black,
}

const PROFILE_ITEM: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
}

const PROFILE_TEXT_NAME: TextStyle = {
  fontWeight: "bold",
  fontSize: 21,
}

const PROFILE_MENU_OPTION: TextStyle = {
  backgroundColor: color.palette.white,
  padding: spacing[4],
  fontWeight: "bold",
  fontSize: 16,
  marginVertical: spacing[1],
}

const PROFILE_FOOTER: TextStyle = {
  color: color.palette.primaryGreenT,
  padding: spacing[4],
}

export const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = React.useState()
  const [userID, setUserID] = React.useState("")
  const [loading, setloading] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      const userID = await AsyncStorage.getItem("userID")
      setUserID(userID)
      // console.log(userID)
    })()
  }, [])

  React.useEffect(() => {
    axios
      .get(`users/${userID}`)
      .then((res) => {
        setUser(res.data.user[0])
        setloading(false)
      })
      .catch((err) => console.log(err))
  }, [userID])

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("userID")
    navigation.navigate("signin")
  }

  return (
    <View>
      {loading ? <Text>loading...</Text> : <Profile user={user} />}
      {/* {user && <Profile user={user} />} */}
      <View>
        <Text style={PROFILE_MENU_OPTION}>
          <AntDesign name="user" size={16} color="black" /> Edit Profile Details
        </Text>
        <Text style={PROFILE_MENU_OPTION}>
          <MaterialCommunityIcons name="email-edit-outline" size={16} color="black" /> Update Email
        </Text>
        <Text style={PROFILE_MENU_OPTION}>
          <MaterialIcons name="support-agent" size={16} color="black" /> Contact Support
        </Text>
        <Text style={PROFILE_MENU_OPTION}>
          <AntDesign name="codesquareo" size={16} color="black" /> Credits
        </Text>
        <Text style={PROFILE_MENU_OPTION} onPress={handleLogout}>
          <AntDesign name="logout" size={16} color="black" /> Logout
        </Text>
      </View>
      <Text style={PROFILE_FOOTER}>FarmEazy Ver 0.0.1</Text>
    </View>
  )
}
