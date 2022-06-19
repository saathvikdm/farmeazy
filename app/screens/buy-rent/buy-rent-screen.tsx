import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import {
  FloatingButton,
  ListItem,
  OtherListItem,
  OtherProductModal,
  Screen,
  Text,
  TextField,
} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

import data from "../../store/store.json"
import { FlatList } from "react-native-gesture-handler"

import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import connectionUrl from "../../connection.js"
import { Entypo, FontAwesome } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"

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

export const BuyRentScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [products, setProducts] = useState()
  const [userID, setUserID] = React.useState("")
  const [loading, setloading] = React.useState(true)
  const [user, setUser] = React.useState()

  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState()
  const [filteredProducts, setFilteredProducts] = useState()

  React.useEffect(() => {
    ;(async () => {
      const userID = await AsyncStorage.getItem("userID")
      setUserID(userID)
    })()
  }, [])

  useEffect(() => {
    fetchData()
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData()
    })
    return willFocusSubscription
  }, [userID])

  const fetchData = () => {
    axios
      .get(connectionUrl + "api/product")
      .then((res) => {
        const filteredResult = res.data.product.filter((i) => i.type !== "Farm")
        setProducts(filteredResult)
        setFilteredProducts(filteredResult)
        setloading(false)
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

  useEffect(() => {
    if (filter == 0 || filter == null) {
      fetchData()
    }
    if (filteredProducts && filteredProducts.length > 0) {
      const prodArr = Array.from(filteredProducts)
      const filteredProductsArr = prodArr.filter((item) => item.type == filter)
      setProducts(filteredProductsArr)
    }
  }, [filter])

  return (
    <View testID="DemoListScreen" style={FULL}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Screen preset="fixed" backgroundColor={color.palette.offWhite}>
          {products && (
            <OtherProductModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              modalData={modalData}
            />
          )}
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
          <View style={{ backgroundColor: color.palette.white }}>
            <Picker
              selectedValue={filter}
              onValueChange={(itemValue, itemIndex) => setFilter(itemValue.toString())}
            >
              <Picker.Item label="All Products" value={0} />
              <Picker.Item label="Consumable" value="Consumable" />
              <Picker.Item label="Rent" value="Rent" />
            </Picker>
          </View>
          <FlatList
            contentContainerStyle={FLAT_LIST}
            data={products}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <OtherListItem
                {...item}
                onPress={() => {
                  setModalVisible(true)
                  setModalData(item)
                }}
              />
            )}
          />
          {user && user.UserType.name !== "User" && (
            <FloatingButton onPress={() => navigation.navigate("addBuyRentProduct")} />
          )}
        </Screen>
      )}
    </View>
  )
}
