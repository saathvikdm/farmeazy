import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Ionicons, MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons"
import { MarketScreen } from "../market/market-screen"
import { ListingScreen } from "../listing/listing-screen"
import { BuyRentScreen } from "../buy-rent/buy-rent-screen"
import { ProfileScreen } from "../profile/profile-screen"
import { OrdersViewScreen } from "../orders-view/orders-view-screen"

export const FarmerAppScreen = ({ navigation, route }) => {
  const { user } = route.params

  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Market") {
            return (
              <MaterialCommunityIcons
                name="warehouse"
                size={24}
                color={focused ? "#04C5B9" : "#04c5b9a6"}
              />
            )
          } else if (route.name === "Buy/Rent") {
            return <Entypo name="tools" size={24} color={focused ? "#04C5B9" : "#04c5b9a6"} />
          } else if (user.UserTypeId !== 2 && route.name === "My Listings") {
            return (
              <Ionicons name="ios-list" size={size} color={focused ? "#04C5B9" : "#04c5b9a6"} />
            )
          } else if (route.name === "My Orders") {
            return (
              <Ionicons name="ios-list" size={size} color={focused ? "#04C5B9" : "#04c5b9a6"} />
            )
          } else if (route.name === "Profile") {
            return <AntDesign name="user" size={24} color={focused ? "#04C5B9" : "#04c5b9a6"} />
          }
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "black",
      })}
    >
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Buy/Rent" component={BuyRentScreen} />
      {user.UserTypeId !== 2 && <Tab.Screen name="My Listings" component={ListingScreen} />}
      <Tab.Screen name="My Orders" component={OrdersViewScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
