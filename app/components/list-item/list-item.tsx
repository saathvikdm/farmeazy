import * as React from "react"
import { Image, ImageStyle, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"

import { AntDesign, Entypo } from "@expo/vector-icons"

export interface ListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  name?: string
  image?: string
  status?: string

  minq?: string
  seller?: string
  price?: string

  lister?: string
  type?: string
  location?: string

  onPress?: any
}

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

export const ListItem = (props: ListItemProps) => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={LIST_CONTAINER}>
        <Image source={{ uri: props.image }} style={IMAGE} />
        <View style={LIST_ITEM}>
          <View style={LIST_ITEM_DETAILS}>
            <Text style={[LIST_TEXT, LIST_SUB_TEXT]}>
              {props.minq ? (
                <>
                  MOQ: <Text style={LIST_MIN_QTY}>{props.minq}</Text> KG
                </>
              ) : (
                <>
                  <Text style={LIST_MIN_QTY}>{props.type}</Text>
                </>
              )}
            </Text>
            <Text style={[LIST_TEXT, LIST_ITEM_NAME]}>{props.name}</Text>
            <View style={LIST_SELLER}>
              <AntDesign name="user" size={12} color="black" />
              <Text style={[LIST_TEXT, LIST_TEXT_SELLER]}>{props.seller || props.lister}</Text>
              {props.lister && (
                <View style={LIST_SELLER}>
                  <Entypo name="location-pin" size={12} color="black" />
                  <Text style={[LIST_TEXT, LIST_TEXT_SELLER]}>{props.location}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={LIST_PRICE_CONTAINER}>
            {!props.type ? (
              <Text style={[LIST_TEXT, LIST_PRICE]}>₹{props.price}/KG</Text>
            ) : (
              <Text style={[LIST_TEXT, LIST_PRICE]}>
                ₹{props.price}
                {props.type.includes("Rent") ? <>/Hr</> : <>/KG</>}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  )
}
