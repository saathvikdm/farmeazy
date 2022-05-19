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

export const FarmerAppScreen: FC<StackScreenProps<NavigatorParamList, "farmerApp">> = observer(
  function FarmerAppScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

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
            } else if (route.name === "My Listings") {
              return (
                <Ionicons name="ios-list" size={size} color={focused ? "#04C5B9" : "#04c5b9a6"} />
              )
            } else if (route.name === "Buy/Rent") {
              return <Entypo name="tools" size={24} color={focused ? "#04C5B9" : "#04c5b9a6"} />
            } else if (route.name === "Profile") {
              return <AntDesign name="user" size={24} color={focused ? "#04C5B9" : "#04c5b9a6"} />
            }
          },
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "black",
        })}
      >
        <Tab.Screen name="Market" component={MarketScreen} />
        <Tab.Screen name="My Listings" component={ListingScreen} />
        <Tab.Screen name="Buy/Rent" component={BuyRentScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    )
  },
)
