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

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface ProfileProps {
  name: string
  ph: string
  age: number
  sex: string
  location: string
  type: string
  image: string
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

export const ProfileScreen = () => {
  return (
    <View>
      <View style={PROFILE_CONTAINER}>
        <Image source={{ uri: profile.image }} style={IMAGE} />
        <View style={PROFILE_ITEM}>
          <Text style={[PROFILE_TEXT, PROFILE_TEXT_NAME]}>{profile.name}</Text>
          <Text style={PROFILE_TEXT}>
            <FontAwesome name="phone" size={16} color="black" /> {` `}Phone: {profile.ph}
          </Text>
          <Text style={PROFILE_TEXT}>
            <Ionicons name="time-outline" size={16} color="black" /> Age: {profile.age}
          </Text>
          <Text style={PROFILE_TEXT}>
            <AntDesign name="user" size={16} color="black" /> Sex: {profile.sex}
          </Text>
          <Text style={PROFILE_TEXT}>
            <Entypo name="location-pin" size={16} color="black" /> Location: {profile.location}
          </Text>
        </View>
      </View>
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
      </View>
      <Text style={PROFILE_FOOTER}>FarmEazy Ver 0.0.1</Text>
    </View>
  )
}
