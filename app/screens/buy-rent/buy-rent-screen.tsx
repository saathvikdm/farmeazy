import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ListItem, OtherListItem, OtherProductModal, Screen, Text } from "../../components"
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
export const BuyRentScreen = ({ navigation }) => {
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
    axios
      .get(connectionUrl + "api/product")
      .then((res) => {
        const filteredResult = res.data.product.filter((i) => i.type !== "Farm")
        setProducts(filteredResult)
        setloading(false)
      })
      .catch((err) => console.log(err))
  }, [userID])

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
        </Screen>
      )}
    </View>
  )
}
