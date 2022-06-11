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
} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

import data from "../../store/store.json"
import { FlatList } from "react-native-gesture-handler"
import { FloatingAction } from "react-native-floating-action"

import axios from "axios"

import connectionUrl from "../../connection.js"

const FULL: ViewStyle = {
  flex: 1,
}

const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[0],
}

export const MarketScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState(null)

  const [products, setProducts] = useState()

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
      })
      .catch((err) => console.log(err))
  }

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
        <FloatingButton onPress={nextScreen} />
      </Screen>
    </View>
  )
}
