import * as React from "react"
import { Image, ImageStyle, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"

import connectionUrl from "../../connection.js"

import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons"

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
  backgroundColor: color.palette.white,
  marginVertical: 2,
}

const TEXT_WHITE: TextStyle = {
  color: color.palette.white,
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
  // marginLeft: 10,
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
  fontSize: 14,
  fontWeight: "bold",
}

const LIST_ITEM_ID: TextStyle = {
  fontSize: 28,
  fontWeight: "bold",
}

const LIST_MIN_QTY: TextStyle = {
  color: color.palette.black,
  fontWeight: "bold",
}

const LIST_PRICE: TextStyle = {
  ...TEXT_WHITE,
  fontSize: 10,
  fontWeight: "200",
  // color: color.palette.deepPurple,
  marginLeft: 0,
  textAlign: "center",
}

const LIST_PRICE_TOTAL: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  // color: color.palette.deepPurple,
  marginLeft: 0,
  textAlign: "center",
}

const LIST_MUTED: TextStyle = {
  ...TEXT_WHITE,
  marginLeft: 0,
  fontSize: 8,
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
  ...TEXT_WHITE,
}

const DELETE_BUTTON: ViewStyle = {
  marginHorizontal: spacing[4],
}

export const OrderListItem = (props) => {
  return (
    <Pressable onPress={() => console.log("pressed item")}>
      <View style={LIST_CONTAINER}>
        <Pressable onPress={() => console.log("pressed thrash")}>
          <View style={DELETE_BUTTON}>
            <FontAwesome name="trash-o" size={32} color="black" />
          </View>
        </Pressable>
        <View style={LIST_ITEM}>
          <View style={LIST_ITEM_DETAILS}>
            <Text style={[LIST_TEXT, LIST_SUB_TEXT]}>
              Order Quantity: <Text style={[LIST_MIN_QTY, TEXT_WHITE]}>{props.qty}</Text> KG
            </Text>
            <Text style={LIST_TEXT}>
              Seller:{" "}
              <Text style={[LIST_TEXT, LIST_ITEM_NAME]}>
                {props.User.firstname} {props.User.lastname}
              </Text>
            </Text>
            <Text style={LIST_TEXT}>
              Buyer:{" "}
              <Text style={[LIST_TEXT, LIST_ITEM_NAME]}>
                {props.Product.User.sellerfname} {props.Product.User.sellerlname}
              </Text>
            </Text>
          </View>
          <View style={LIST_PRICE_CONTAINER}>
            <Text style={[LIST_TEXT, LIST_PRICE, LIST_PRICE_TOTAL]}>
              ₹{props.price * props.qty}
            </Text>
            <Text style={[LIST_TEXT, LIST_MUTED]}>----</Text>
            <Text style={[LIST_TEXT, LIST_PRICE]}>₹{props.price}/KG</Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}
