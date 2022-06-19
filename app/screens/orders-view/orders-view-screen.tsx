import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import {
  ListItem,
  OrderListItem,
  ProductListItem,
  ProductModal,
  Screen,
  Text,
} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

import data from "../../store/store.json"
import { FlatList } from "react-native-gesture-handler"

import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import connectionUrl from "../../connection.js"
import { Picker } from "@react-native-picker/picker"

const FULL: ViewStyle = {
  flex: 1,
}

const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[0],
}

const TEXT: TextStyle = {
  marginTop: spacing[4],
  textAlign: "center",
  color: color.palette.black,
}

export const OrdersViewScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [orders, setorders] = useState()
  const [userID, setUserID] = React.useState("")
  const [loading, setloading] = React.useState(true)

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

  const fetchData = async () => {
    const userID = await AsyncStorage.getItem("userID")
    const token = await AsyncStorage.getItem("token")
    const config = {
      headers: {
        Authorization: token,
      },
    }
    axios
      .get("order", config)
      .then((res) => {
        const filteredResult = res.data.order.filter(
          (i) => i.UserId.toString() === userID || i.Product.UserId.toString() === userID,
        )
        setorders(filteredResult)
        setFilteredProducts(filteredResult)
        setloading(false)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (filter === 1) {
      fetchData()
    }
    if (filteredProducts && filteredProducts.length > 0) {
      const prodArr = Array.from(filteredProducts)
      const filteredProductsArr = prodArr.filter((item) => item.fullfilled === filter)
      setorders(filteredProductsArr)
    }
  }, [filter])

  return (
    <View testID="DemoListScreen" style={FULL}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Screen preset="fixed" backgroundColor={color.palette.offWhite}>
          {/* {orders && (
            <ProductModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              modalData={modalData}
            />
          )} */}
          <View style={{ backgroundColor: color.palette.white }}>
            <Picker
              selectedValue={filter}
              onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
            >
              <Picker.Item label="All Orders" value={1} />
              <Picker.Item label="In-Progress" value={false} />
              <Picker.Item label="Fullfilled" value={true} />
            </Picker>
          </View>
          {orders && orders.length === 0 ? (
            <Text style={TEXT}>You dont have any orders...</Text>
          ) : (
            // <Text style={TEXT}>You have listings...</Text>
            <>
              <FlatList
                contentContainerStyle={FLAT_LIST}
                data={orders}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <OrderListItem
                    {...item}
                    onPress={() => {
                      setModalVisible(true)
                      setModalData(item)
                    }}
                    userID={userID}
                  />
                )}
              />
            </>
          )}
        </Screen>
      )}
    </View>
  )
}
