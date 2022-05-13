import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ListItem, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

import data from "../../store/store.json"
import { FlatList } from "react-native-gesture-handler"

const FULL: ViewStyle = {
  flex: 1,
}

const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[0],
}

export const ListingScreen = () => {
  return (
    <View testID="DemoListScreen" style={FULL}>
      <Screen preset="fixed" backgroundColor={color.palette.offWhite}>
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={data.listings}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ListItem {...item} />}
        />
      </Screen>
    </View>
  )
}
