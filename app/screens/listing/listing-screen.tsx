import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ListItem, ProductListItem, ProductModal, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

import data from "../../store/store.json"
import { FlatList } from "react-native-gesture-handler"

import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import connectionUrl from "../../connection.js"

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

export const ListingScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [products, setProducts] = useState()
  const [userID, setUserID] = React.useState("")
  const [loading, setloading] = React.useState(true)

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
        const filteredResult = res.data.product.filter((i) => i.UserId.toString() === userID)
        setProducts(filteredResult)
        setloading(false)
      })
      .catch((err) => console.log(err))
  }

  return (
    <View testID="DemoListScreen" style={FULL}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Screen preset="fixed" backgroundColor={color.palette.offWhite}>
          {products && (
            <ProductModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              modalData={modalData}
            />
          )}
          {products && products.length === 0 ? (
            <Text style={TEXT}>You dont have any listings...</Text>
          ) : (
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
          )}
        </Screen>
      )}
    </View>
  )
}
