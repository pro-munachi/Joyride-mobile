import React from 'react'
import { useState, useEffect } from 'react'
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native'
import { Block, Text } from 'galio-framework'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button, Icon, Input } from '../components'
import { Images, argonTheme } from '../constants'
import axios from 'axios'

const { width, height } = Dimensions.get('screen')

const Register = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    const data = {
      email,
      password,
    }
    axios
      .post('https://joyrideapp.herokuapp.com/users/login', data)
      .then((res) => {
        if (res.data.hasError === false) {
          setEmail('')
          setPassword('')
          const storeData = async () => {
            try {
              await AsyncStorage.setItem('email', res.data.email)
              await AsyncStorage.setItem('number', res.data.phoneNumber)
              await AsyncStorage.setItem('id', res.data._id)
              await AsyncStorage.setItem('pic', res.data.profilePic)
              await AsyncStorage.setItem('name', res.data.displayName)
              await AsyncStorage.setItem('token', res.data.token)
            } catch (e) {
              // saving error
            }
          }

          props.navigation.navigate('Dashboard')
          storeData()
        } else {
          console.log('something went wrong')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.17} middle>
                <Text color='#05386b' size={25}>
                  Login{' '}
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior='padding'
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder='Email'
                      value={email}
                      onChangeText={(email) => setEmail(email)}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name='ic_mail_24px'
                          family='ArgonExtra'
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block width={width * 0.8}>
                    <Input
                      password
                      viewPass
                      borderless
                      placeholder='Password'
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name='padlock-unlocked'
                          family='ArgonExtra'
                          style={styles.inputIcons}
                        />
                      }
                      value={password}
                      onChangeText={(password) => setPassword(password)}
                    />
                    <Block row space='between'>
                      <Text size={12} color={argonTheme.COLORS.MUTED}>
                        password strength:
                      </Text>
                      <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                        strong
                      </Text>
                    </Block>
                  </Block>
                  <Block middle>
                    <Button
                      color='primary'
                      style={styles.createButton}
                      onPress={handleSubmit}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Login
                      </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  )
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: '#F4F5F7',
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#8898AA',
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    backgroundColor: '#05386b',
  },
})

export default Register
