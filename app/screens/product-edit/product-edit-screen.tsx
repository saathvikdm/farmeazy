import React, { useState, useEffect } from "react"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text, TextField } from "../../components"
import { color, spacing, typography } from "../../theme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import * as ImagePicker from "expo-image-picker"
import { AntDesign } from "@expo/vector-icons"
import { ScrollView } from "react-native-gesture-handler"

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

const TEXT_UPLOADED: TextStyle = {
  color: "green",
  fontFamily: typography.primary,
}

const FULL: ViewStyle = { flex: 1 }

const JUSTIFY: ViewStyle = { justifyContent: "center", alignItems: "center" }

const BOLD: TextStyle = { fontWeight: "bold" }

const BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.primaryGreen,
  marginVertical: 10,
}

const UPLOAD_BUTTON: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.white,
  borderColor: color.palette.blackT,
  borderWidth: 0.8,
}

const BUTTON_TEXT: TextStyle = {
  ...TEXT,
  color: color.palette.white,
  fontWeight: "bold",
  fontSize: 16,
}

export const ProductEditScreen = ({ navigation, route }) => {
  const { product: productProp } = route.params

  const { id, price, name, min_qty, avl_qty, desc, image } = productProp

  const [product, setProduct] = useState({
    id,
    price,
    name,
    min_qty,
    avl_qty,
    desc,
    image,
  })
  const [imageselect, setimageselect] = useState(null)

  const goBack = () => navigation.goBack()

  useEffect(() => {
    ;(async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!")
      }
    })()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    setimageselect(result)
    if (!result.cancelled) {
      setimageselect(result.uri)
    }
  }

  const handleUpdateProduct = async () => {
    const userID = await AsyncStorage.getItem("userID")
    const token = await AsyncStorage.getItem("token")

    try {
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }

      const formData = new FormData()
      for (const key in product) {
        formData.append(key, product[key])
      }

      if (imageselect !== null) {
        formData.append("image", { uri: imageselect, type: "image/jpg", name: "productImage" })
      }

      const res = await axios.put(`product/${id}`, formData, config)
      if (res.status === 200) {
        console.log("Product Details Successfully updated!")
        navigation.goBack()
      } else {
        console.log("Error")
      }
    } catch (err) {
      console.log(err)
      alert("Error Occured: Try again later!")
    }
  }

  return (
    <Screen style={CONTAINER} preset="scroll">
      <Header
        headerText="Update Product Details"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <View style={FULL}>
        <ScrollView>
          <TextField
            value={product.name}
            label="Product Name"
            placeholder="Enter Product Name"
            onChangeText={(text) => setProduct({ ...product, name: text })}
          />
          <TextField
            value={product.desc}
            label="Product Description"
            placeholder="Enter Product Description"
            onChangeText={(text) => setProduct({ ...product, desc: text })}
          />
          <TextField
            value={product.price.toString()}
            label="Product Price"
            placeholder="Enter Product Price"
            onChangeText={(text) => setProduct({ ...product, price: text })}
            keyboardType="number-pad"
          />
          <TextField
            value={product.min_qty.toString()}
            label="Min Purchase Quantity (in KG)"
            placeholder="Enter Min Purchase Quantity"
            onChangeText={(text) => setProduct({ ...product, min_qty: text })}
            keyboardType="number-pad"
          />
          <TextField
            value={product.avl_qty.toString()}
            label="Total Available Quantity (in KG)"
            placeholder="Enter Total Available Quantity"
            onChangeText={(text) => setProduct({ ...product, avl_qty: text })}
            keyboardType="number-pad"
          />
          <Button style={UPLOAD_BUTTON} onPress={pickImage}>
            {imageselect ? (
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
          <View style={JUSTIFY}>
            {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
          </View>
        </ScrollView>
      </View>
      <View>
        <Button
          style={BUTTON}
          textStyle={[BUTTON_TEXT]}
          text="Update Product Details"
          onPress={handleUpdateProduct}
        />
      </View>
    </Screen>
  )
}
