import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography, spacing } from "../../theme"
import { Text } from "../text/text"
import { TxKeyPath } from "../../i18n"
import { Picker } from "@react-native-picker/picker"

const CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

/**
 * Describe your component here
 */
export function ItemPicker(props) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    UserTypeId,
    setUserTypeID,
    ...rest
  } = props

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]

  return (
    <View style={containerStyles}>
      <Text preset="fieldLabel" tx={labelTx} text={label} />
      {UserTypeId && (
        <Picker
          {...rest}
          ref={forwardedRef}
          selectedValue={UserTypeId}
          onValueChange={(itemValue, itemIndex) => setUserTypeID(itemValue)}
        >
          <Picker.Item label="Farmer" value="1" />
          <Picker.Item label="Renter/Seller" value="3" />
          <Picker.Item label="Buyer" value="2" />
        </Picker>
      )}
    </View>
  )
}
