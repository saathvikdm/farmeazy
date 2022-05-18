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
import { AntDesign } from "@expo/vector-icons"

const CENTERED_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 30,
}

const MODAL_VIEW: ViewStyle = {
  margin: 20,
  backgroundColor: color.palette.primaryGreen,
  borderRadius: 5,
  // alignItems: "center",
  // padding: 35,
  // shadowColor: "#000",
  // shadowOffset: {
  //   width: 0,
  //   height: 0,
  // },
  // shadowOpacity: 0.25,
  // shadowRadius: 4,
  // elevation: 1,
  padding: 10,
  width: "90%",
  height: "90%",
}

const TEXT: TextStyle = {
  fontSize: 20,
  color: color.palette.white,
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
  borderWidth: 0.8,
}

const BUTTON_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 16,
}

const DETAILS_CONTAINER: ViewStyle = {
  marginTop: 10,
}

export interface ProductModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  modalVisible?: any
  setModalVisible?: any
  modalData?: any
}

export const ProductModal = ({
  modalVisible = false,
  setModalVisible,
  modalData = null,
}: ProductModalProps) => {
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
            <Image source={{ uri: modalData.image }} style={IMAGE} />
            <View style={DETAILS_CONTAINER}>
              <Text style={TEXT}>{modalData.name}</Text>
              <Text style={TEXT}>Minimum Order Quantity: {modalData.minq}</Text>
              <AntDesign name="user" size={12} color="white" />
              <Text style={TEXT}>{modalData.seller || modalData.lister}</Text>
            </View>
          </View>
          <View>
            <Button
              text="Back to Market"
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
