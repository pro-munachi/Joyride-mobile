import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native'
import { Block, Text, theme } from 'galio-framework'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button, Input, Icon } from '../components'
import { Images, argonTheme } from '../constants'
import { HeaderHeight } from '../constants/utils'

const { width, height } = Dimensions.get('screen')

const thumbMeasure = (width - 48 - 32) / 3

const ChangePassword = (props) => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    const getData = async () => {
      try {
        const data = {
          password: password,
          newPassword: newPassword,
        }

        const headers = {
          'Content-Type': 'application/json',
          authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        }
        if (newPassword === confirmPassword) {
          setLoading(true)

          axios
            .post('http://joyrideapp.herokuapp.com/users/change', data, {
              headers: headers,
            })
            .then((res) => {
              setLoading(false)
              if (res.data.hasError === false) {
                setPassword('')
                setNewPassword('')
                setConfirmPassword('')
                props.navigation.navigate('Dashboard')
              } else {
                console.log(res.data.hasError)
              }
            })
            .catch((err) => {
              setLoading(true)
            })
        } else {
          console.log('New password and Confirm password are not the same')
        }
      } catch (e) {
        console.log(e)
      }
    }

    getData()
  }

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: '25%' }}
          >
            <Block flex style={styles.profileCard}>
              <Block middle style={{ marginTop: 65, marginBottom: 15 }}>
                <Text color={'#05386b'} size={35}>
                  Change Password{' '}
                </Text>
              </Block>

              <Block width={width * 0.8} style={{ marginBottom: 15 }} middle>
                <Input
                  password
                  viewPass
                  borderless
                  placeholder='Old Password'
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
              </Block>

              <Block width={width * 0.8} style={{ marginBottom: 15 }} middle>
                <Input
                  password
                  viewPass
                  borderless
                  placeholder='New Password'
                  iconContent={
                    <Icon
                      size={16}
                      color={argonTheme.COLORS.ICON}
                      name='padlock-unlocked'
                      family='ArgonExtra'
                      style={styles.inputIcons}
                    />
                  }
                  value={newPassword}
                  onChangeText={(newPassword) => setNewPassword(newPassword)}
                />
              </Block>

              <Block width={width * 0.8} style={{ marginBottom: 15 }} middle>
                <Input
                  password
                  viewPass
                  borderless
                  placeholder='Confirm Password'
                  iconContent={
                    <Icon
                      size={16}
                      color={argonTheme.COLORS.ICON}
                      name='padlock-unlocked'
                      family='ArgonExtra'
                      style={styles.inputIcons}
                    />
                  }
                  value={confirmPassword}
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                />
              </Block>

              <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                <Button
                  center
                  color='default'
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Change Password</Text>
                </Button>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  )
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    // position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  optionsButton: {
    width: '23%',
    height: 45,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
    backgroundColor: '#05386b',
  },
  button: {
    marginLeft: 0,
    width: '100%',
    backgroundColor: '#05386b',
  },
  buttonText: {
    color: 'white',
  },
  chip: {
    marginBottom: 15,
    height: 'auto',
    borderWidth: 1,
    padding: 10,
    borderColor: '#05386b',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chipping: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
})

export default ChangePassword
