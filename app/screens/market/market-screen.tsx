import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Modal, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { FloatingButton, ListItem, ProductModal, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

import data from "../../store/store.json"
import { FlatList } from "react-native-gesture-handler"
import { FloatingAction } from "react-native-floating-action"

import axios from "axios"

const FULL: ViewStyle = {
  flex: 1,
}

const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[0],
}

export const MarketScreen = ({ navigation }) => {
  const [marketData, setMarketData] = useState(data.market)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState(null)

  const profile = data.profile

  const saveMarketData = (data) => {
    setMarketData([...marketData, data])
  }

  const nextScreen = () =>
    navigation.navigate("addProduct", {
      profile,
      marketData,
      saveData: (data) => saveMarketData(data),
    })

  // axios
  //   .get("http://192.168.29.110:8080/api/product")
  //   .then((res) => console.log(res.data))
  //   .catch((err) => console.log(err))

  return (
    <View style={FULL}>
      <Screen preset="fixed" backgroundColor={color.palette.offWhite}>
        <ProductModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalData={modalData}
        />
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={marketData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ListItem
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
