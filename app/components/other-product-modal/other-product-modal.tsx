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
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import { Header } from "../header/header"

const CENTERED_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 30,
}

const MODAL_VIEW: ViewStyle = {
  margin: 20,
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
  width: "90%",
  height: "100%",
}
const HEADER: TextStyle = {
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  marginTop: spacing[2],
}

const BOLD: TextStyle = { fontWeight: "bold" }

const BLACK_TEXT: TextStyle = { color: color.palette.black }

const HEADER_TITLE: TextStyle = {
  ...BOLD,
  ...BLACK_TEXT,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const TEXT: TextStyle = {
  fontSize: 20,
  color: color.palette.black,
  textAlign: "left",
}

const IMAGE: ImageStyle = {
  // borderRadius: 35,
  height: "30%",
  width: "100%",
}

const BUTTON_OUTLINE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.white,
  borderColor: color.palette.blackT,
  // borderWidth: 0.8,
}

const BUTTON_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 16,
}

const DETAILS_CONTAINER: ViewStyle = {
  // marginTop: spacing[4],
  padding: spacing[4],
  flex: 1,
  backgroundColor: color.palette.primaryGreenT,
}

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
}

const PRODUCT_NAME: TextStyle = {
  fontSize: 24,
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

const PRODUCT_MOQ: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
  opacity: 0.6,
}

const PRODUCT_SELLER: ViewStyle = {
  flexDirection: "row",
  // justifyContent: "center",
  alignItems: "center",
  marginTop: spacing[2],
  paddingRight: spacing[2],
}

const PRODUCT_DETAILS: ViewStyle = {
  paddingTop: spacing[4],
  flex: 1,
  // justifyContent: "flex-start",
  alignItems: "flex-start",
}

export const OtherProductModal = ({ modalVisible = false, setModalVisible, modalData = null }) => {
  let imgUrl
  if (modalData) imgUrl = "http://192.168.29.110:8080/" + modalData.image.split("8080")[1]
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
            />
            <Image source={{ uri: imgUrl }} style={IMAGE} />
            <View style={DETAILS_CONTAINER}>
              <Text style={[TEXT, PRODUCT_NAME]}>{modalData.name}</Text>
              <Text style={[TEXT, PRODUCT_MOQ]}>
                {modalData.type === "Rent"
                  ? `Min. rent duration: ${modalData.min_qty} Hr(s)`
                  : `Min. order quantity: ${modalData.min_qty} KG(s)`}
              </Text>
              <Text style={[TEXT, PRODUCT_MOQ]}>
                {modalData.type === "Rent"
                  ? `Avl. duration: ${modalData.avl_qty} Hr(s)`
                  : `Avl. order quantity: ${modalData.avl_qty} KG(s)`}
              </Text>
              <View style={PRODUCT_PRICE}>
                <Text style={[TEXT, PRODUCT_SUBHEADER]}>
                  Price: <Text style={TEXT_BOLD}>₹{modalData.price}/KG</Text>
                </Text>
                <Text style={[TEXT, PRODUCT_SUBHEADER]}>
                  {modalData.type === "Rent" ? `Min. Rental Price:` : `Min. Purchase Price:`}{" "}
                  <Text style={TEXT_BOLD}>
                    ₹{parseInt(modalData.price) * parseInt(modalData.min_qty)} /-
                  </Text>
                </Text>
              </View>
              <View style={PRODUCT_DETAILS}>
                <Text style={[PRODUCT_SUBHEADER, {}]}>Seller Details</Text>
                <View style={PRODUCT_SELLER}>
                  <AntDesign name="user" size={20} color="black" />
                  <Text style={[TEXT_BOLD, { paddingLeft: spacing[2] }]}>
                    {modalData.User.firstname} {modalData.User.lastname}
                  </Text>
                </View>
                <View style={PRODUCT_SELLER}>
                  <Entypo name="location-pin" size={20} color="black" />
                  <Text style={[TEXT, { paddingLeft: spacing[2] }]}>{modalData.User.address}</Text>
                </View>
                <View style={PRODUCT_SELLER}>
                  <AntDesign name="phone" size={20} color="black" />
                  <Text style={[TEXT, { paddingLeft: spacing[2] }]}>
                    +91 {modalData.User.phone}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              text="Contact Seller"
              style={BUTTON_OUTLINE}
              textStyle={[BUTTON_TEXT, { color: color.palette.black }]}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      )}
    </Modal>
  )
}
