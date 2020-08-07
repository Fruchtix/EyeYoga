

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React, { Component } from 'react'

import TabNavIcon from '../../presentation/TabNavIcon'

import HomeScreen from '../../screens/userMode/HomeScreen'
import ExploreScreen from '../../screens/userMode/ExploreScreen'
import ProfileScreen from '../../screens/userMode/ProfileScreen'

import CourseScreen from '../../screens/userMode/CourseScreen'

import Settings from '../../screens/settings/Settings'
import SettingsProfile from '../../screens/settings/SettingsProfile'
import SettingsDatenschutz from '../../screens/settings/SettingsDatenschutz'
import SettingsGeschaeftsbedingungen from '../../screens/settings/SettingsGeschaeftsbedingungen'
import SettingsSupport from '../../screens/settings/SettingsSupport'

import AllCourses from '../../presentation/AllCourses'

import ChangeUserData from '../../container/ChangeUserData'
import LawWebsite from '../../presentation/LawWebsite'

const MainContainer = createBottomTabNavigator({
  Home: HomeScreen,
  Erkunde: ExploreScreen,
  Profile: ProfileScreen
}, {
  initialRouteName: "Home",
  headerMode: 'none',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      let desc
      if (routeName === 'Home') {
        iconName = `home`;
        desc="Home"
      } else if (routeName === 'Erkunde') {
        iconName = `search`;
        desc="Erkunden"
      } else if (routeName === 'Profile') {
        iconName = `user`;
        desc="Profile"
      }

      // You can return any component that you like here!
      return <TabNavIcon iconName={iconName} tintColor={tintColor} desc={desc} />
    },
  }),
  tabBarOptions: {
    style: {
      height: 60,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    showLabel: false,
    labelStyle: {

    },
    tabStyle: {

    },
    activeTintColor: '#333',
    inactiveTintColor: "#5A6174",
  },
})

const SettingsContainer = createStackNavigator({
  Settings,
  SettingsProfile,
  SettingsDatenschutz,
  SettingsGeschaeftsbedingungen,
  SettingsSupport

}, {
  initialRouteName: "Settings",
  headerMode: 'none',
  // mode: "modal"
})


const DefaultStack = createStackNavigator({
  AllCourses,
  MainContainer
}, {
  initialRouteName: "MainContainer",
  headerMode: 'none',
  // mode: "modal"
})

const AllContainer = createStackNavigator({
    DefaultStack,
    CourseScreen,
    SettingsContainer,
    ChangeUserData,
    LawWebsite
  }, {
    initialRouteName: "DefaultStack",
    headerMode: 'none',
    // mode: "modal"
  })

const MainNavigator = createAppContainer(AllContainer)

export default MainNavigator