import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Modal, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import {
  FloatingButton,
  ListItem,
  ProductListItem,
  ProductModal,
  Screen,
  Text,
  TextField,
} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

import data from "../../store/store.json"
import { FlatList } from "react-native-gesture-handler"
import { FloatingAction } from "react-native-floating-action"
import AsyncStorage from "@react-native-async-storage/async-storage"

import axios from "axios"

import connectionUrl from "../../connection.js"
import { Picker } from "@react-native-picker/picker"
import { Entypo, FontAwesome } from "@expo/vector-icons"

const FULL: ViewStyle = {
  flex: 1,
}

const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[0],
}

const SEARCH_INPUT: ViewStyle = {
  backgroundColor: color.palette.white,
  padding: spacing[2],
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-between",
}

export const MarketScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState(null)

  const [searchQuery, setSearchQuery] = useState("")

  const [products, setProducts] = useState()
  const [filteredProducts, setFilteredProducts] = useState()

  const [userID, setUserID] = React.useState("")
  const [loading, setloading] = React.useState(true)
  const [user, setUser] = React.useState()

  const nextScreen = () => navigation.navigate("addProduct")

  useEffect(() => {
    fetchData()
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData()
    })
    return willFocusSubscription
  }, [])

  const fetchData = () => {
    axios
      .get(connectionUrl + "api/product")
      .then((res) => {
        const filteredResult = res.data.product.filter((i) => i.type === "Farm")
        setProducts(filteredResult)
        setFilteredProducts(filteredResult)
      })
      .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    ;(async () => {
      const userID = await AsyncStorage.getItem("userID")
      const token = await AsyncStorage.getItem("token")
      const config = {
        headers: {
          Authorization: token,
        },
      }
      try {
        const res = await axios.get(`users/${userID}`, config)
        setUser(res.data.user[0])
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  useEffect(() => {
    if (searchQuery !== "" && searchQuery.length > 0) {
      if (filteredProducts && filteredProducts.length > 0) {
        const prodArr = Array.from(filteredProducts)
        const filteredProductsArr = prodArr.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        setProducts(filteredProductsArr)
      }
    } else {
      fetchData()
    }
  }, [searchQuery])

  return (
    <View style={FULL}>
      <Screen preset="fixed" backgroundColor={color.palette.offWhite}>
        {products && (
          <ProductModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            modalData={modalData}
          />
        )}
        {/* <Picker
        // selectedValue={product.type}
        // onValueChange={(itemValue, itemIndex) =>
        //   setProduct({ ...product, type: itemValue.toString() })
        // }
        >
          <Picker.Item label="Consumable" value="Consumable" />
          <Picker.Item label="Rent" value="Rent" />
        </Picker> */}
        <View style={SEARCH_INPUT}>
          <TextField
            style={{ paddingVertical: spacing[0] }}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            label={`Search Product`}
            placeholder={`Enter product search term`}
          />
          {searchQuery.length > 0 ? (
            <Entypo
              name="circle-with-cross"
              style={{ marginBottom: spacing[2] }}
              size={24}
              onPress={() => setSearchQuery("")}
              color={color.palette.lighterGrey}
            />
          ) : (
            <FontAwesome
              name="search"
              style={{ marginBottom: spacing[2] }}
              size={24}
              color={color.palette.lighterGrey}
            />
          )}
        </View>

        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductListItem
              {...item}
              onPress={() => {
                setModalVisible(true)
                setModalData(item)
              }}
            />
          )}
        />
        {user && user.UserType.name !== "User" && <FloatingButton onPress={nextScreen} />}
      </Screen>
    </View>
  )
}
