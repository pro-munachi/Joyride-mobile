import React from 'react'
import { Easing, Animated, Dimensions } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Block } from 'galio-framework'

// screens
import Home from '../screens/Home'
import Onboarding from '../screens/Onboarding'
import Pro from '../screens/Pro'
import Profile from '../screens/Profile'
import Register from '../screens/Register'
import Elements from '../screens/Elements'
import Articles from '../screens/Articles'
import CreateOrder from '../screens/CreateOrder'
import SignUp from '../screens/Signup'
// drawer
import CustomDrawerContent from './Menu'

// header for screens
import { Icon, Header } from '../components'
import { argonTheme, tabs } from '../constants'
import ChangePassword from '../screens/ChangePassword'
import EditProfile from '../screens/EditProfile'

const { width } = Dimensions.get('screen')

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

function ElementsStack(props) {
  return (
    <Stack.Navigator mode='card' headerMode='screen'>
      <Stack.Screen
        name='Elements'
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title='Elements' navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Stack.Screen
        name='Pro'
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=''
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode='card' headerMode='screen'>
      <Stack.Screen
        name='Articles'
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title='Articles' navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Stack.Screen
        name='Pro'
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=''
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}

function CreateStack(props) {
  return (
    <Stack.Navigator initialRouteName='Order' mode='card' headerMode='screen'>
      <Stack.Screen
        name='Order'
        component={CreateOrder}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title='Order'
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}

function PasswordStack(props) {
  return (
    <Stack.Navigator initialRouteName='Order' mode='card' headerMode='screen'>
      <Stack.Screen
        name='Order'
        component={ChangePassword}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title='Order'
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}

function EditStack(props) {
  return (
    <Stack.Navigator initialRouteName='Order' mode='card' headerMode='screen'>
      <Stack.Screen
        name='Order'
        component={EditProfile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title='Order'
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName='Profile' mode='card' headerMode='screen'>
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title='Profile'
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name='Pro'
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=''
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode='card' headerMode='screen'>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header title='Home' navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#F8F9FE' },
        }}
      />
      <Stack.Screen
        name='Pro'
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=''
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode='card' headerMode='none'>
      <Stack.Screen
        name='Onboarding'
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name='App' component={AppStack} />
    </Stack.Navigator>
  )
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: 'white',
        inactiveTintColor: '#000',
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName='Home'
    >
      <Drawer.Screen name='Dashboard' component={HomeStack} />
      <Drawer.Screen name='Profile' component={ProfileStack} />
      <Drawer.Screen name='Login' component={Register} />
      <Drawer.Screen name='Signup' component={SignUp} />
      <Drawer.Screen name='Elements' component={ElementsStack} />
      <Drawer.Screen name='Articles' component={ArticlesStack} />
      <Drawer.Screen name='Order' component={CreateStack} />
      <Drawer.Screen name='Password' component={PasswordStack} />
      <Drawer.Screen name='Edit' component={EditStack} />
    </Drawer.Navigator>
  )
}
