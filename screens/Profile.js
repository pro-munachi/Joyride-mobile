import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from 'react-native'
import { Block, Text, theme } from 'galio-framework'
import { DataTable } from 'react-native-paper'
import axios from 'axios'

import { Button } from '../components'
import { Images, argonTheme } from '../constants'
import { HeaderHeight } from '../constants/utils'

const { width, height } = Dimensions.get('screen')

const thumbMeasure = (width - 48 - 32) / 3

const Profile = (props) => {
  const [user, setUser] = useState([])
  const [order, setOrder] = useState([])
  const [token, setToken] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        setToken(await JSON.stringify(AsyncStorage.getItem('token')))
        setId(await JSON.stringify(AsyncStorage.getItem('id')))
      } catch (e) {
        // error reading value
      }
    }

    getData()

    console.log(token)

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }

    axios
      .get(`https://joyrideapp.herokuapp.com/users/613f50e72323b40016c93654`, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.hasError === 'false') {
          console.log('error')
        } else {
          setUser(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get(
        `https://joyrideapp.herokuapp.com/orders/user/613f50e72323b40016c93654`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.hasError === false) {
          setOrder(res.data.slice)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
              <Block middle style={styles.avatarContainer}>
                <Image
                  source={{ uri: user.profilePic }}
                  style={styles.avatar}
                />
              </Block>
              <Block style={styles.info}>
                <Block
                  middle
                  row
                  space='evenly'
                  style={{ marginTop: 20, paddingBottom: 24 }}
                >
                  <Button small style={{ backgroundColor: '#05386b' }}>
                    Create Order
                  </Button>
                  <Button
                    small
                    style={{ backgroundColor: '#05386b' }}
                    onPress={() => props.navigation.navigate('Dashboard')}
                  >
                    Dashboard
                  </Button>
                </Block>
                <Block row space='between'>
                  <Block middle>
                    <Text
                      bold
                      size={18}
                      color='#525F7F'
                      style={{ marginBottom: 4 }}
                    >
                      2K
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      Orders
                    </Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color='#525F7F'
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      10
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      Photos
                    </Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color='#525F7F'
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      89
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>
                      Comments
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block flex>
                <Block middle style={styles.nameInfo}>
                  <Text bold size={28} color='#05386b'>
                    {user.displayName}
                  </Text>
                  <Text size={16} color='#05386b' style={{ marginTop: 10 }}>
                    {user.email}{' '}
                  </Text>
                  <Text size={16} color='#05386b' style={{ marginTop: 10 }}>
                    {user.phoneNumber}
                  </Text>
                </Block>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block middle>
                  <Text
                    size={25}
                    color='#05386b'
                    style={{ textAlign: 'center' }}
                  >
                    My latest orders
                  </Text>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Name</DataTable.Title>
                      <DataTable.Title numeric>From</DataTable.Title>
                      <DataTable.Title numeric>To</DataTable.Title>
                      <DataTable.Title numeric>Delivered</DataTable.Title>
                      <DataTable.Title numeric>Dispatched</DataTable.Title>
                      <DataTable.Title numeric>Total</DataTable.Title>
                    </DataTable.Header>

                    {order.map((row) => (
                      <DataTable.Row key={row._id}>
                        <DataTable.Cell>{row.userName}</DataTable.Cell>
                        <DataTable.Cell>{row.addressFrom}</DataTable.Cell>
                        <DataTable.Cell>{row.addressTo}</DataTable.Cell>
                        <DataTable.Cell>
                          {' '}
                          {row.isDelivered ? 'Yes' : 'No'}
                        </DataTable.Cell>
                        <DataTable.Cell>
                          {' '}
                          {row.dispatchOrder ? 'True' : 'False'}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          {' '}
                          &#8358;
                          {
                            row.totalPrice
                            // .toFixed(2)
                            // .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                          }
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                  <Block flex middle>
                    <Button
                      color='transparent'
                      textStyle={{
                        color: '#233DD2',
                        fontWeight: '500',
                        fontSize: 16,
                      }}
                    >
                      View more orders
                    </Button>
                  </Block>
                </Block>
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
    // position: "relative",
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
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
})

export default Profile
