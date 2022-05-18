import * as React from "react"
import { GestureResponderEvent, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { Button } from "../button/button"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const FLOATING_BUTTON: ViewStyle = {
  position: "absolute",
  bottom: 15,
  right: 15,
  width: 60,
  height: 60,
  borderRadius: 50,
  backgroundColor: color.palette.primaryGreen,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const FLOATING_TEXT: TextStyle = {
  fontSize: 25,
}

export interface FloatingButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress?: any
}

/**
 * Describe your component here
 */
export const FloatingButton = (props: FloatingButtonProps) => {
  return (
    <Button
      testID="next-screen-button"
      text="+"
      onPress={props.onPress}
      style={FLOATING_BUTTON}
      textStyle={FLOATING_TEXT}
    />
  )
}
