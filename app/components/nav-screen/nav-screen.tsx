import * as React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { color, spacing, typography } from "../../theme"
import { Screen } from "../screen/screen"
import { Text } from "../text/text"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"

import { ListItem } from "../list-item/list-item"

import data from "../../store/store.json"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[0],
}

export const NavScreen = ({ navigation }) => {
  const { characterStore } = useStores()
  const { characters } = characterStore

  React.useEffect(() => {
    async function fetchData() {
      await characterStore.getCharacters()
    }

    fetchData()
  }, [])

  return (
    <View testID="DemoListScreen" style={FULL}>
      <Screen preset="fixed" backgroundColor={color.palette.offWhite}>
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={data.market}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ListItem {...item} />}
        />
      </Screen>
    </View>
  )
}
