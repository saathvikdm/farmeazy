import * as React from "react"
import { Image, ImageStyle, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"

import connectionUrl from "../../connection.js"

import { AntDesign, Entypo } from "@expo/vector-icons"

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
  backgroundColor: color.palette.white,
  marginVertical: 2,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
  color: color.palette.black,
}

const LIST_ITEM: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const LIST_ITEM_DETAILS: ViewStyle = {
  flex: 0.7,
  marginLeft: 10,
}

const LIST_SELLER: ViewStyle = {
  flexDirection: "row",
  padding: 5,
  alignItems: "center",
  marginLeft: spacing[1],
}

const LIST_TEXT_SELLER: TextStyle = {
  marginLeft: 2,
  fontSize: 10,
}

const LIST_ITEM_NAME: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
}

const LIST_MIN_QTY: TextStyle = {
  color: color.palette.black,
  fontWeight: "bold",
}

const LIST_PRICE: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  // color: color.palette.deepPurple,
  marginLeft: 0,
  textAlign: "center",
}

const LIST_PRICE_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.primaryGreenT,
  padding: 10,
  borderRadius: 10,
  flex: 0.25,
  justifyContent: "center",
  alignItems: "center",
}

const LIST_SUB_TEXT: TextStyle = {
  backgroundColor: color.palette.primaryGreenT,
  paddingHorizontal: 5,
  paddingVertical: 2,
  fontSize: 10,
  borderRadius: 10,
  marginVertical: 5,
  alignSelf: "flex-start",
}

export const ProductListItem = (props) => {
  const imgUrl = connectionUrl + props.image.split("8080")[1]

  return (
    <Pressable onPress={props.onPress}>
      <View style={LIST_CONTAINER}>
        <Image source={{ uri: imgUrl }} style={IMAGE} />
        <View style={LIST_ITEM}>
          <View style={LIST_ITEM_DETAILS}>
            <Text style={[LIST_TEXT, LIST_SUB_TEXT]}>
              MOQ: <Text style={LIST_MIN_QTY}>{props.min_qty}</Text> KG
            </Text>
            <Text style={[LIST_TEXT, LIST_ITEM_NAME]}>{props.name}</Text>
            <View style={LIST_SELLER}>
              <AntDesign name="user" size={12} color="black" />
              <Text style={[LIST_TEXT, LIST_TEXT_SELLER]}>
                {props.User.firstname} {props.User.lastname}
              </Text>
              <View style={LIST_SELLER}>
                <Entypo name="location-pin" size={12} color="black" />
                <Text style={[LIST_TEXT, LIST_TEXT_SELLER]}>{props.User.city}</Text>
              </View>
            </View>
          </View>
          <View style={LIST_PRICE_CONTAINER}>
            <Text style={[LIST_TEXT, LIST_PRICE]}>₹{props.price}/KG</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}
