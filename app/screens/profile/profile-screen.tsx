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
  borderRadius: 100,
  height: 100,
  width: 100,
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
  const [loading, setloading] = React.useState(true)
  const [updateImage, setUpdateImage] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const userID = await AsyncStorage.getItem("userID")
      const token = await AsyncStorage.getItem("token")
      fetchData(userID, token)
      const willFocusSubscription = navigation.addListener("focus", () => {
        fetchData(userID, token)
      })
      return willFocusSubscription
    })()
  }, [updateImage])

  const fetchData = async (userID, token) => {
    const config = {
      headers: {
        Authorization: token,
      },
    }
    try {
      const res = await axios.get(`users/${userID}`, config)
      setUser(res.data.user[0])
      setloading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("userID")
    navigation.navigate("signin")
  }

  return (
    <View>
      {loading ? <Text>loading...</Text> : <Profile user={user} setUpdateImage={setUpdateImage} />}
      {/* {user && <Profile user={user} />} */}
      <View>
        <Text style={PROFILE_MENU_OPTION} onPress={() => navigation.navigate("profileEdit")}>
          <AntDesign name="user" size={16} color="black" />
          &nbsp;Edit Profile Details
        </Text>
        <Text
          style={PROFILE_MENU_OPTION}
          onPress={() => navigation.navigate("profileDisplayUpdate", { user: user })}
        >
          <AntDesign name="picture" size={16} color="black" />
          &nbsp;Edit Profile Display Picture
        </Text>
        <Text
          style={PROFILE_MENU_OPTION}
          onPress={() => navigation.navigate("profilePasswordEdit")}
        >
          <MaterialCommunityIcons name="form-textbox-password" size={16} color="black" />
          &nbsp;Change Password
        </Text>
        <Text style={PROFILE_MENU_OPTION} onPress={() => navigation.navigate("profileSupport")}>
          <MaterialIcons name="support-agent" size={16} color="black" />
          &nbsp;Contact Support
        </Text>
        {/* <Text style={PROFILE_MENU_OPTION}>
          <AntDesign name="codesquareo" size={16} color="black" /> Credits
        </Text> */}
        <Text style={PROFILE_MENU_OPTION} onPress={handleLogout}>
          <AntDesign name="logout" size={16} color="black" />
          &nbsp;Logout
        </Text>
      </View>
      <Text style={PROFILE_FOOTER}>FarmEazy Ver 0.0.1</Text>
    </View>
  )
}
