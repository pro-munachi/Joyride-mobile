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
import { Chip } from 'react-native-paper'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button, Input, Icon } from '../components'
import { Images, argonTheme } from '../constants'
import { HeaderHeight } from '../constants/utils'

const { width, height } = Dimensions.get('screen')

const thumbMeasure = (width - 48 - 32) / 3

const CreateOrder = (props) => {
  const [addressFrom, setAddressFrom] = useState('')
  const [addressTo, setAddressTo] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [add, setAdd] = useState(false)
  const [allItems, setAllItems] = useState([])

  const onclick = () => {
    const getData = async () => {
      try {
        let item = {
          name: name,
        }
        let items = JSON.parse(await AsyncStorage.getItem('order'))

        if (items) {
          items.push(item)
          await AsyncStorage.setItem('order', JSON.stringify(items))
          setAdd(!add)
        } else {
          await AsyncStorage.setItem('order', JSON.stringify([item]))
          setAdd(!add)
        }
        setName('')
        setAllItems(JSON.parse(await AsyncStorage.getItem('order')))
      } catch (e) {
        console.log(e)
      }
    }

    getData()
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setAllItems(JSON.parse(await AsyncStorage.getItem('order')))
      } catch (e) {
        console.log(e)
      }
    }

    getData()
  }, [])

  const deleteItem = (name) => {
    const getData = async () => {
      try {
        let items = JSON.parse(await AsyncStorage.getItem('order'))
        var item = items.filter(function (el) {
          return el.name !== name
        })

        await AsyncStorage.setItem('order', JSON.stringify(item))
        setAdd(!add)
      } catch (e) {
        console.log(e)
      }
    }

    getData()
  }

  const handleSubmit = () => {
    const getData = async () => {
      try {
        const data = {
          addressFrom: addressFrom,
          addressTo: addressTo,
          paymentMethod: paymentMethod,
          orderItems: allItems,
        }

        const headers = {
          'Content-Type': 'application/json',
          authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        }
        setLoading(true)
        console.log('header')
        console.log(data)
        axios
          .post('http://joyrideapp.herokuapp.com/orders/orderProduct', data, {
            headers: headers,
          })
          .then((res) => {
            console.log('then')

            if (res.data.hasError === false) {
              console.log('work')

              setLoading(false)
              setPrice('')
              setName('')
              setAddressFrom('')
              setAddressTo('')
              setPaymentMethod('')
              toast.success('Your order has been created successfully')
              history.push('/dashboard')
            } else {
            }
          })
          .catch((err) => {
            setLoading(false)
          })
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
              <Block middle style={{ marginTop: 15, marginBottom: 15 }}>
                <Text color={'#05386b'} size={35}>
                  Create Orders
                </Text>
              </Block>

              <Block width={width * 0.8} style={{ marginBottom: 15 }} middle>
                <Input
                  borderless
                  placeholder='Address From'
                  value={addressFrom}
                  onChangeText={(addressFrom) => setAddressFrom(addressFrom)}
                  //   iconContent={
                  //     <Icon
                  //       size={16}
                  //       color={argonTheme.COLORS.ICON}
                  //       name='ic_mail_24px'
                  //       family='ArgonExtra'
                  //       style={styles.inputIcons}
                  //     />
                  //   }
                />
              </Block>
              <Block width={width * 0.8} style={{ marginBottom: 15 }} middle>
                <Input
                  borderless
                  placeholder='Address To'
                  value={addressTo}
                  onChangeText={(addressTo) => setAddressTo(addressTo)}
                  //   iconContent={
                  //     <Icon
                  //       size={16}
                  //       color={argonTheme.COLORS.ICON}
                  //       name='ic_mail_24px'
                  //       family='ArgonExtra'
                  //       style={styles.inputIcons}
                  //     />
                  //   }
                />
              </Block>
              <Block width={width * 0.8} style={{ marginBottom: 15 }} middle>
                <Input
                  borderless
                  placeholder='Payment Method'
                  value={paymentMethod}
                  onChangeText={(paymentMethod) =>
                    setPaymentMethod(paymentMethod)
                  }
                  //   iconContent={
                  //     <Icon
                  //       size={16}
                  //       color={argonTheme.COLORS.ICON}
                  //       name='ic_mail_24px'
                  //       family='ArgonExtra'
                  //       style={styles.inputIcons}
                  //     />
                  //   }
                />
              </Block>
              <Block width={width * 1.0} style={{ marginBottom: 15 }} row>
                <Input
                  borderless
                  placeholder='Item Description'
                  value={name}
                  onChangeText={(name) => setName(name)}
                  //   iconContent={
                  //     <Icon
                  //       size={16}
                  //       color={argonTheme.COLORS.ICON}
                  //       name='ic_mail_24px'
                  //       family='ArgonExtra'
                  //       style={styles.inputIcons}
                  //     />
                  //   }
                />
                <Button
                  small
                  center
                  color='default'
                  style={styles.optionsButton}
                  onPress={onclick}
                >
                  Add Item
                </Button>
              </Block>

              <Block width={width * 0.8} style={styles.chip}>
                {allItems.map((item) => (
                  <Chip
                    icon='delete'
                    onPress={() => deleteItem(item.name)}
                    key={item.name}
                    style={styles.chipping}
                  >
                    {item.name}
                  </Chip>
                ))}
              </Block>

              <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                <Button
                  center
                  color='default'
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Create Order</Text>
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

export default CreateOrder
