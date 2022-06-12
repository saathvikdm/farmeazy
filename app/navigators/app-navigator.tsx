/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  WelcomeScreen,
  DemoScreen,
  DemoListScreen,
  SettingsScreen,
  LoginScreen,
  SigninScreen,
  SignupScreen,
  FarmerAppScreen,
  MarketScreen,
  ListingScreen,
  BuyRentScreen,
  ProfileScreen,
  AddProductScreen,
  ProfileEditScreen,
  ProfilePasswordEditScreen,
  ProfileSupportScreen,
  ProfileDisplayUpdateScreen,
  OrdersViewScreen,
  ProductEditScreen,
  AddBuyRentProductScreen,
} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  welcome: undefined
  login: undefined
  signin: undefined
  signup: undefined
  demo: undefined
  demoList: undefined
  settings: undefined
  farmerApp: undefined
  market: undefined
  listing: undefined
  buyRent: undefined
  profile: undefined
  addProduct: undefined
  ordersView: undefined
  profileEdit: undefined
  profilePasswordEdit: undefined
  profileSupport: undefined
  profileDisplayUpdate: undefined
  productEdit: undefined
  addBuyRentProduct: undefined
  // 🔥 Your screens go here
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signin" component={SigninScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="farmerApp" component={FarmerAppScreen} />
      <Stack.Screen name="market" component={MarketScreen} />
      <Stack.Screen name="listing" component={ListingScreen} />
      <Stack.Screen name="addProduct" component={AddProductScreen} />
      <Stack.Screen name="productEdit" component={ProductEditScreen} />
      <Stack.Screen name="buyRent" component={BuyRentScreen} />
      <Stack.Screen name="addBuyRentProduct" component={AddBuyRentProductScreen} />
      <Stack.Screen name="ordersView" component={OrdersViewScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="profileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="profileSupport" component={ProfileSupportScreen} />
      <Stack.Screen name="profilePasswordEdit" component={ProfilePasswordEditScreen} />
      <Stack.Screen name="profileDisplayUpdate" component={ProfileDisplayUpdateScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
