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
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [add, setAdd] = useState(false)
  const [allItems, setAllItems] = useState([{ name: '', price: 0 }])

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
                  placeholder='Email'
                  //   value={email}
                  //   onChangeText={(email) => setEmail(email)}
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
                  placeholder='Email'
                  //   value={email}
                  //   onChangeText={(email) => setEmail(email)}
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
                  placeholder='Email'
                  //   value={email}
                  //   onChangeText={(email) => setEmail(email)}
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
                  placeholder='Email'
                  //   value={email}
                  //   onChangeText={(email) => setEmail(email)}
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
                >
                  Add Item
                </Button>
              </Block>
              <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                <Text>fgfgfg</Text>
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
  optionsButton: {
    width: '23%',
    height: 45,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
})

export default CreateOrder
