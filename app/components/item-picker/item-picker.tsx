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

export interface ItemPickerProps {
  placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
}

/**
 * Describe your component here
 */
export function ItemPicker(props: ItemPickerProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]

  const [state, setState] = React.useState("Select account type")

  return (
    <View style={containerStyles}>
      <Text preset="fieldLabel" tx={labelTx} text={label} />
      <Picker
        {...rest}
        ref={forwardedRef}
        selectedValue={state}
        onValueChange={(itemValue, itemIndex) => setState(itemValue)}
      >
        <Picker.Item
          style={{ color: color.palette.blackT }}
          label="Select an account type"
          value={null}
          enabled={false}
        />
        <Picker.Item label="Farmer" value="farmer" />
        <Picker.Item label="Renter/Seller" value="renterSeller" />
        <Picker.Item label="Buyer" value="buyer" />
      </Picker>
    </View>
  )
}
