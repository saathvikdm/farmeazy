import * as React from "react"
import {
  Alert,
  Image,
  ImageStyle,
  Modal,
  Pressable,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { Button } from "../button/button"
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons"
import { Header } from "../header/header"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

const CENTERED_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  // marginBottom: 30,
}

const MODAL_VIEW: ViewStyle = {
  // margin: 20,
  backgroundColor: color.palette.white,
  borderRadius: 5,
  // alignItems: "center",
  // padding: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 10,
  elevation: 2,
  width: "100%",
  height: "100%",
}

const TEXT: TextStyle = {
  fontSize: 14,
  color: color.palette.black,
  textAlign: "left",
}

const IMAGE: ImageStyle = {
  // borderRadius: 35,
  height: "30%",
  width: "100%",
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  backgroundColor: color.palette.lighterGrey,
}

const BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  marginHorizontal: spacing[4],
  marginVertical: spacing[2],
  backgroundColor: color.palette.primaryGreen,
  // borderWidth: 0.8,
}

const BUTTON_TEXT: TextStyle = {
  textAlign: "left",
  color: color.palette.white,
  fontSize: 16,
  fontWeight: "bold",
}

const DETAILS_CONTAINER: ViewStyle = {
  // marginTop: spacing[4],
  padding: spacing[4],
  flex: 1,
  backgroundColor: color.palette.white,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const BLACK_TEXT: TextStyle = { color: color.palette.black }

const HEADER: TextStyle = {
  paddingHorizontal: spacing[4],
  paddingTop: spacing[5],
  paddingBottom: spacing[5] - 1,
  // marginTop: spacing[2],
  backgroundColor: color.palette.primaryGreenT,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  color: color.palette.white,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  marginLeft: spacing[4],
}

const HEADER_ICON: ViewStyle = { tintColor: color.palette.white }

const MODAL_HEADER: ViewStyle = {
  // marginBottom: spacing[1],
  padding: spacing[3],
  backgroundColor: color.palette.primaryGreenT,
  borderBottomRightRadius: 20,
  borderBottomLeftRadius: 20,
}

const PRODUCT_PRICE: ViewStyle = {
  marginTop: spacing[4],
  borderBottomColor: color.palette.primaryGreen,
  borderBottomWidth: 2,
  paddingBottom: spacing[4],
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const PRODUCT_NAME: TextStyle = {
  fontSize: 21,
  fontWeight: "bold",
}

const PRODUCT_SUBHEADER: TextStyle = {
  ...TEXT,
  fontSize: 16,
  // fontWeight: "bold",
}

const TEXT_BOLD: TextStyle = {
  ...TEXT,
  fontWeight: "bold",
}

const COUNTER_TEXT: TextStyle = {
  ...TEXT_BOLD,
  fontSize: 32,
}

const PRODUCT_MOQ: TextStyle = {
  fontSize: 12,
  fontWeight: "500",
  opacity: 0.6,
}

const PRODUCT_SELLER: ViewStyle = {
  flexDirection: "row",
  // justifyContent: "center",
  alignItems: "center",
  marginTop: spacing[1],
  paddingRight: spacing[2],
}

const PRODUCT_DETAILS: ViewStyle = {
  paddingTop: spacing[4],
  flex: 1,
  // justifyContent: "flex-start",
  alignItems: "flex-start",
}

const PROFILE_IMAGE: ImageStyle = {
  borderRadius: 50,
  height: 18,
  width: 18,
}

export const OtherProductModal = ({ modalVisible = false, setModalVisible, modalData = null }) => {
  const navigation = useNavigation()

  let imgUrl

  const [userID, setUserID] = React.useState("")
  const [qty, setqty] = React.useState(0)

  if (modalData) {
    imgUrl = "http://192.168.29.110:8080/" + modalData.image.split("8080")[1]
  }

  React.useEffect(() => {
    ;(async () => {
      const userID = await AsyncStorage.getItem("userID")
      setUserID(userID)
    })()
  }, [])

  React.useEffect(() => {
    if (modalData) setqty(modalData.min_qty)
  }, [modalData])

  const handlePlaceOrder = async () => {
    const userID = await AsyncStorage.getItem("userID")
    const token = await AsyncStorage.getItem("token")

    try {
      const config = {
        headers: {
          Authorization: token,
        },
      }

      const order = {
        qty,
        UserId: userID,
        ProductId: modalData.id,
        price: modalData.price,
      }

      const res = await axios.post(`order/create`, order, config)
      if (res.status === 200) {
        console.log("Order Added to Marketplace")
        alert("Order Successfully Placed!")
        setModalVisible(false)
      } else {
        console.log("Error")
      }
    } catch (err) {
      console.log(err)
      alert("Error Occured: Try again later!")
    }
  }

  const handleDeleteOrder = async () => {
    const userID = await AsyncStorage.getItem("userID")
    const token = await AsyncStorage.getItem("token")

    Alert.alert("Delete Product", "Are you sure?", [
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
            const res = await axios.delete(`product/${modalData.id}`, config)
            if (res.status === 200) {
              console.log("Product Deleted Successfully!")
              alert("Product Deleted Successfully!")
              setModalVisible(!modalVisible)
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

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      {modalData && (
        <View style={CENTERED_VIEW}>
          <View style={MODAL_VIEW}>
            <Header
              headerText="Product Details"
              leftIcon="back"
              onLeftPress={() => setModalVisible(false)}
              style={HEADER}
              titleStyle={HEADER_TITLE}
              iconStyle={HEADER_ICON}
            />
            <Image source={{ uri: modalData.image }} style={IMAGE} />
            <View style={DETAILS_CONTAINER}>
              <Text style={[TEXT, PRODUCT_NAME]}>{modalData.name}</Text>
              <Text style={[TEXT, PRODUCT_MOQ]}>
                Min. order quantity: {modalData.min_qty}{" "}
                {modalData.type === "Rent" ? "Hr(s)" : "KG(s)"}
              </Text>
              <Text style={[TEXT, PRODUCT_MOQ]}>
                Avl. order quantity: {modalData.avl_qty}{" "}
                {modalData.type === "Rent" ? "Hr(s)" : "KG(s)"}
              </Text>
              {modalData.UserId.toString() !== userID ? (
                <View style={PRODUCT_PRICE}>
                  <Text style={[TEXT, PRODUCT_SUBHEADER]}>
                    <AntDesign
                      onPress={() => {
                        qty > modalData.min_qty && setqty(qty - 1)
                      }}
                      name="minussquare"
                      size={32}
                      color={
                        qty > modalData.min_qty
                          ? color.palette.primaryGreenT
                          : color.palette.primaryGreenDisabled
                      }
                    />
                    <Text style={COUNTER_TEXT}> {qty} </Text>
                    <AntDesign
                      onPress={() => setqty(qty + 1)}
                      name="plussquare"
                      size={32}
                      color={color.palette.primaryGreenT}
                    />
                  </Text>
                  <Text style={[TEXT, PRODUCT_SUBHEADER]}>
                    ₹<Text style={[TEXT_BOLD, { fontSize: 32 }]}>{modalData.price * qty}</Text>
                  </Text>
                </View>
              ) : (
                <View style={PRODUCT_PRICE}>
                  <Text style={[TEXT, PRODUCT_SUBHEADER]}>
                    <Text style={TEXT}>List Price: ₹</Text>
                    <Text style={[TEXT_BOLD, { fontSize: 32 }]}>{modalData.price * qty}</Text>
                  </Text>
                  <Pressable onPress={() => handleDeleteOrder()}>
                    <FontAwesome name="trash-o" size={32} color={color.palette.primaryGreenT} />
                  </Pressable>
                </View>
              )}
              <View style={PRODUCT_DETAILS}>
                <Text style={[TEXT, PRODUCT_MOQ]}>Product Description</Text>
                <View style={PRODUCT_SELLER}>
                  <Text style={TEXT}>{modalData.desc}</Text>
                </View>
                <Text style={[TEXT, PRODUCT_MOQ, { marginTop: spacing[4] }]}>Seller Details</Text>
                <View style={PRODUCT_SELLER}>
                  {/* <AntDesign name="user" size={14} color="black" /> */}
                  {modalData.User.user_image === "" || !modalData.User.user_image ? (
                    <AntDesign name="user" size={14} color="black" />
                  ) : (
                    <Image source={{ uri: modalData.User.user_image }} style={PROFILE_IMAGE} />
                  )}
                  <Text style={[TEXT_BOLD, { paddingLeft: spacing[2] }]}>
                    {modalData.User.firstname} {modalData.User.lastname}
                  </Text>
                </View>
                <View style={PRODUCT_SELLER}>
                  <Entypo name="location-pin" size={20} color="black" />
                  <Text style={[TEXT, { paddingLeft: spacing[2] }]}>{modalData.User.address}</Text>
                </View>
                <View style={PRODUCT_SELLER}>
                  <AntDesign
                    name="phone"
                    size={14}
                    color="black"
                    style={{ paddingLeft: spacing[1] }}
                  />
                  <Text style={[TEXT, { paddingLeft: spacing[2] }]}>
                    +91 {modalData.User.phone}
                  </Text>
                </View>
              </View>
            </View>
            {modalData.UserId.toString() === userID ? (
              <Button
                text="Update Product Details"
                style={BUTTON}
                textStyle={BUTTON_TEXT}
                onPress={() => {
                  setModalVisible(false)
                  navigation.navigate("productEdit", { product: modalData })
                }}
              />
            ) : (
              <Button
                text="Place Order"
                style={BUTTON}
                textStyle={BUTTON_TEXT}
                onPress={() => handlePlaceOrder()}
              />
            )}
          </View>
        </View>
      )}
    </Modal>
  )
}
