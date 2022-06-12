import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../navigators"
import { Button, Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

import connectionUrl from "../../connection.js"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { AntDesign } from "@expo/vector-icons"

const FULL: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingHorizontal: spacing[4],
  marginVertical: spacing[4],
  flex: 1,
  alignItems: "center",
}

const TEXT: TextStyle = {
  color: color.palette.black,
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
  marginTop: spacing[4],
  // marginVertical: 10,
}

const PROFILE_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
  backgroundColor: color.palette.white,
  marginVertical: 2,
}
const IMAGE: ImageStyle = {
  borderRadius: 125,
  height: 250,
  width: 250,
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
  borderRadius: 125,
  height: 250,
  width: 250,
  backgroundColor: color.palette.primaryGreen,
  justifyContent: "center",
  alignItems: "center",
}

const PROFILE_EMPTY_IMAGE_TEXT: TextStyle = {
  textAlign: "center",
  color: color.palette.white,
  fontWeight: "bold",
  fontSize: 150,
}

const PROFILE_TEXT_NAME: TextStyle = {
  fontWeight: "bold",
  fontSize: 21,
}

const BUTTON_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 16,
}

const TEXT_UPLOADED: TextStyle = {
  color: "green",
  fontFamily: typography.primary,
}

const UPLOAD_BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.white,
  borderColor: color.palette.blackT,
  borderWidth: 0.8,
  marginTop: spacing[4],
}

export const ProfileDisplayUpdateScreen = ({ navigation, route }) => {
  const { user } = route.params

  const [image, setImage] = React.useState(null)

  const imgUrl = connectionUrl + user.user_image.split("8080")[1]

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
        navigation.goBack()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={FULL}>
      <Screen style={CONTAINER} preset="scroll">
        <Header
          headerText="Edit Profile Display Picture"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        {user.user_image === "" || !user.user_image ? (
          <View style={PROFILE_EMPTY_IMAGE}>
            <Text style={PROFILE_EMPTY_IMAGE_TEXT}>{user.firstname.charAt(0)}</Text>
          </View>
        ) : (
          <Image source={{ uri: imgUrl }} style={IMAGE} />
        )}
        <Button style={UPLOAD_BUTTON} onPress={pickImage}>
          {image ? (
            <Text style={TEXT_UPLOADED}>
              Image Selected&nbsp;
              <AntDesign name="checkcircleo" size={24} color="green" />
            </Text>
          ) : (
            <Text style={TEXT}>
              Upload Image&nbsp;
              <AntDesign name="upload" size={24} color="black" />
            </Text>
          )}
        </Button>
      </Screen>
    </View>
  )
}
