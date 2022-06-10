import * as React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons"
import connectionUrl from "../../connection.js"
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
export const Profile = ({ user }) => {
  // console.log(user)
  const imgUrl = connectionUrl + user.user_image.split("8080")[1]

  return (
    <View style={PROFILE_CONTAINER}>
      <Image source={{ uri: imgUrl }} style={IMAGE} />
      <View style={PROFILE_ITEM}>
        <Text style={[PROFILE_TEXT, PROFILE_TEXT_NAME]}>
          {user.firstname} {user.lastname}
        </Text>
        <Text style={PROFILE_TEXT}>
          <FontAwesome name="phone" size={16} color="black" /> {` `}
          +91 {user.phone}
        </Text>
        <Text style={PROFILE_TEXT}>
          <Entypo name="location-pin" size={16} color="black" /> {user.city}
        </Text>
      </View>
    </View>
  )
}
