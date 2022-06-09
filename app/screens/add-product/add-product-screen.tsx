import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingHorizontal: spacing[4],
  marginVertical: spacing[4],
  flex: 1,
  justifyContent: "flex-start",
}

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}

const HEADER_TITLE: TextStyle = {
  color: color.palette.black,
  fontWeight: "bold",
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.primaryGreen,
  marginVertical: 10,
}

const BUTTON_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 16,
}

export const AddProductScreen = ({ route, navigation }) => {
  const { profile, marketData, saveData } = route.params

  const data = {
    id: marketData.length + 1,
    image: "https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg",
    name: "",
    location: profile.location,
    minq: "",
    phone: profile.ph,
    price: "",
    seller: profile.name,
  }

  const [productName, setProductName] = useState("")
  const [productMinq, setProductMinq] = useState("")
  const [productPrice, setProductPrice] = useState("")

  const goBack = () => {
    data.name = productName
    data.minq = productMinq
    data.price = productPrice

    console.log(data)

    saveData(data)

    navigation.goBack()
  }

  return (
    <Screen style={CONTAINER} preset="scroll">
      <Header
        headerText="Add Product"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <View>
        <TextField
          value={productName}
          labelTx="addProductScreen.productName"
          placeholderTx="addProductScreen.productNamePH"
          onChangeText={(text) => setProductName(text)}
        />
        <TextField
          value={productMinq}
          labelTx="addProductScreen.minq"
          placeholderTx="addProductScreen.minqPH"
          onChangeText={(text) => setProductMinq(text)}
          keyboardType="number-pad"
        />
        <TextField
          value={productPrice}
          labelTx="addProductScreen.price"
          placeholderTx="addProductScreen.pricePH"
          onChangeText={(text) => setProductPrice(text)}
          keyboardType="number-pad"
        />
      </View>
      <View>
        <Button
          style={BUTTON}
          textStyle={[BUTTON_TEXT]}
          text="Add Product to Market"
          onPress={goBack}
        />
      </View>
    </Screen>
  )
}
