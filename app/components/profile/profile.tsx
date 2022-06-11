import * as React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons"
import connectionUrl from "../../connection.js"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

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
  borderRadius: 50,
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

const PROFILE_EMPTY_IMAGE: ViewStyle = {
  borderRadius: 50,
  height: 80,
  width: 80,
  backgroundColor: color.palette.primaryGreen,
  justifyContent: "center",
  alignItems: "center",
}

const PROFILE_EMPTY_IMAGE_TEXT: TextStyle = {
  textAlign: "center",
  color: color.palette.white,
  fontWeight: "bold",
  fontSize: 50,
}

const PROFILE_TEXT_NAME: TextStyle = {
  fontWeight: "bold",
  fontSize: 21,
}
export const Profile = ({ user }) => {
  // console.log(user)
  const imgUrl = connectionUrl + user.user_image.split("8080")[1]

  const [image, setImage] = React.useState(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    setImage(result)
    if (!result.cancelled) {
      await updateDisplayPicture(result.uri)
    }
  }

  const updateDisplayPicture = async (imageUri) => {
    const userID = await AsyncStorage.getItem("userID")
    const token = await AsyncStorage.getItem("token")
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    }
    try {
      const formData = new FormData()
      formData.append("user_image", { uri: imageUri, type: "image/jpg", name: "userImage" })
      const res = await axios.put(`users/${userID}`, formData, config)
      if (res.status === 200) {
        console.log("Successfully updated!")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={PROFILE_CONTAINER}>
      <View onTouchStart={pickImage}>
        {user.user_image === "" || !user.user_image ? (
          <View style={PROFILE_EMPTY_IMAGE}>
            <Text style={PROFILE_EMPTY_IMAGE_TEXT}>{user.firstname.charAt(0)}</Text>
          </View>
        ) : (
          <Image source={{ uri: imgUrl }} style={IMAGE} />
        )}
      </View>
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
