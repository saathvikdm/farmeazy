import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ScreenProps } from "../screen/screen.props"
import { Screen } from "../screen/screen"
import { WelcomeScreen } from "../../screens"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface NavScreenProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const NavScreen = (props: ScreenProps) => {
  const Tab = createBottomTabNavigator()

  return (
    <Screen {...props}>
      {props.children}
      <Tab.Navigator>{/* <Tab.Screen name="Home" component={} /> */}</Tab.Navigator>
    </Screen>
  )
}
