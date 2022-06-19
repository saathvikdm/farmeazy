import * as React from "react"
import {
  Alert,
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"

import connectionUrl from "../../connection.js"

import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
  backgroundColor: color.palette.white,
  marginVertical: 2,
}

const USER_ITEM: ViewStyle = {
  borderColor: color.palette.primaryGreen,
  borderWidth: 4,
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
  const navigation = useNavigation()

  const [userID, setUserID] = React.useState("")
  const [loading, setloading] = React.useState(true)
  const [user, setUser] = React.useState()

  React.useEffect(() => {
    ;(async () => {
      const userID = await AsyncStorage.getItem("userID")
      setUserID(userID)
    })()
  }, [])

  React.useEffect(() => {
    fetchData()
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData()
    })
    return willFocusSubscription
  }, [userID])

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const config = {
      headers: {
        Authorization: token,
      },
    }
    axios
      .get(connectionUrl + `api/users/${userID}`, config)
      .then((res) => {
        setUser(res.data.user[0])
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteOrder = async () => {
    const userID = await AsyncStorage.getItem("userID")
    const token = await AsyncStorage.getItem("token")

    Alert.alert("Delete Order", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const config = {
              headers: {
                Authorization: token,
              },
            }
            const res = await axios.delete(`order/${props.id}`, config)
            if (res.status === 200) {
              console.log("Order Deleted Successfully!")
              alert("Order Deleted Successfully!")
              navigation.goBack()
            } else {
              console.log("Error")
            }
          } catch (err) {
            console.log(err)
            alert("Error Occured: Try again later!")
          }
        },
      },
    ])
  }

  const handleOrderUpdate = async () => {
    const token = await AsyncStorage.getItem("token")
    Alert.alert(
      "Confirm Order Fullfillment",
      `${props.fullfilled ? "Reset Order Status?" : "Are you sure?"}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const config = {
                headers: {
                  Authorization: token,
                },
              }

              const data = {
                fullfilled: !props.fullfilled,
              }

              const res = await axios.put(`order/${props.id}`, data, config)
              if (res.status === 200) {
                console.log("Order Confirmed Successfully!")
                if (data.fullfilled) {
                  alert("Order Status: Fullfilled!")
                } else alert("Order Status: In-Progress!")
                navigation.goBack()
              } else {
                console.log("Error")
              }
            } catch (err) {
              console.log(err)
              alert("Error Occured: Try again later!")
            }
          },
        },
      ],
    )
  }

  return (
    <Pressable
      onPress={() => {
        if (user && props.Product.User.id === user.id) {
          handleOrderUpdate()
        }
      }}
    >
      <View
        style={
          user && props.Product.User.id === user.id ? [LIST_CONTAINER, USER_ITEM] : LIST_CONTAINER
        }
      >
        <Pressable onPress={() => handleDeleteOrder()}>
          <View style={DELETE_BUTTON}>
            <FontAwesome name="trash-o" size={32} color={color.palette.primaryGreenT} />
          </View>
        </Pressable>
        <View style={LIST_ITEM}>
          <View style={LIST_ITEM_DETAILS}>
            {/* <Text style={[LIST_TEXT, LIST_SUB_TEXT]}>
              Order Quantity: <Text style={[LIST_MIN_QTY, TEXT_WHITE]}>{props.qty}</Text> KG
            </Text> */}
            <Text style={LIST_TEXT}>
              Product Name: <Text style={[LIST_TEXT, LIST_ITEM_NAME]}>{props.Product.name}</Text>
            </Text>
            <Text style={LIST_TEXT}>
              Order Status:{" "}
              <Text style={[LIST_TEXT, LIST_ITEM_NAME]}>
                {props.fullfilled ? "Fullfilled" : "In-Progress"}
              </Text>
            </Text>
            {user && user.UserType.name === "User" ? (
              <Text style={LIST_TEXT}>
                Sold By:{" "}
                <Text style={[LIST_TEXT, LIST_ITEM_NAME]}>
                  {props.Product.User.sellerfname} {props.Product.User.sellerlname}
                </Text>
              </Text>
            ) : (
              <>
                <Text style={LIST_TEXT}>
                  Buyer:{" "}
                  <Text style={[LIST_TEXT, LIST_ITEM_NAME]}>
                    {props.User.firstname} {props.User.lastname}
                  </Text>
                </Text>
                <Text style={LIST_TEXT}>
                  Sold By:{" "}
                  <Text style={[LIST_TEXT, LIST_ITEM_NAME]}>
                    {props.Product.User.sellerfname} {props.Product.User.sellerlname}
                  </Text>
                </Text>
              </>
            )}
          </View>
          <View style={LIST_PRICE_CONTAINER}>
            <Text style={[LIST_TEXT, LIST_PRICE, LIST_PRICE_TOTAL]}>
              ₹{props.price * props.qty}
            </Text>
            <Text style={[LIST_TEXT, LIST_MUTED]}>----</Text>
            <Text style={[LIST_TEXT, LIST_PRICE]}>
              ₹{props.price}/{props.Product.type === "Rent" ? "Hr(s)" : "KG"}
            </Text>
            <Text style={[LIST_TEXT, LIST_PRICE]}>
              OQ: {props.qty}
              {props.Product.type === "Rent" ? "Hr(s)" : "KG"}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}
