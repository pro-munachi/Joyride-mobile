import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, ScrollView, View, Text } from 'react-native'
import axios from 'axios'
import { Block, theme } from 'galio-framework'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Icon } from '../components'
const { width } = Dimensions.get('screen')

const Home = () => {
  const [price, setPrice] = useState([])
  const [month, setMonth] = useState([])
  const [year, setYear] = useState([])
  const [total, setTotal] = useState([])
  const [today, setToday] = useState([])
  const [length, setLength] = useState([])
  const [period, setPeriod] = useState('month')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const getData = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        }

        axios
          .get('http://joyrideapp.herokuapp.com/dashboard/today/price', {
            headers: headers,
          })
          .then((res) => {
            if (res.data.hasError === false) {
              setPrice(res.data.test)
              setLoading(false)
            }
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
          })

        axios
          .get('http://joyrideapp.herokuapp.com/dashboard/totalprice', {
            headers: headers,
          })
          .then((res) => {
            if (res.data.hasError === false) {
              setMonth(res.data.totalMonth)
              setYear(res.data.totalYear)
              setTotal(res.data.total)
              setLoading(false)
            }
          })
          .catch((err) => {
            setLoading(false)
          })

        axios
          .get('http://joyrideapp.herokuapp.com/dashboard/today', {
            headers: headers,
          })
          .then((res) => {
            if (res.data.hasError === false) {
              setToday(res.data.long)
            }
          })
          .catch((err) => {
            console.log(err)
          })

        axios
          .get('http://joyrideapp.herokuapp.com/dashboard/totalprice', {
            headers: headers,
          })
          .then((res) => {
            if (res.data.hasError === false) {
              setLength(res.data.totalLength)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (e) {
        // error reading value
      }
    }

    getData()
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.articles}
    >
      {/* <Block flex center style={styles.home}>
        <Block flex>
          <Card item={articles[0]} horizontal />
          <Block flex row>
            <Card
              item={articles[1]}
              style={{ marginRight: theme.SIZES.BASE }}
            />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block>
      </Block> */}
      <View style={styles.first}>
        <View style={{ marginLeft: 20 }}>
          <Icon name='shop' family='ArgonExtra' size={24} color={'gray'} />
        </View>
        <Text style={styles.text}>
          &#8358;{price && price.toLocaleString('en-US')}
          {}
          .00
        </Text>
        <Text style={styles.text1}>Expenditure(TODAY)</Text>
      </View>
      <View style={styles.second}>
        <View style={styles.secondTop}>
          <Icon name='shop' family='ArgonExtra' size={24} color={'white'} />
          <View style={styles.secondTopText}>
            <Text
              style={period === 'month' ? styles.peri : styles.peris}
              onPress={() => setPeriod('month')}
            >
              Month
            </Text>
            <Text
              style={period === 'year' ? styles.peri : styles.peris}
              onPress={() => setPeriod('year')}
            >
              Year
            </Text>
            <Text
              style={period === 'total' ? styles.peri : styles.peris}
              onPress={() => setPeriod('total')}
            >
              Total
            </Text>
          </View>
        </View>

        {period === 'month' && (
          <Text style={styles.text}>
            &#8358;{month && month.toLocaleString('en-US')}.00
          </Text>
        )}
        {period === 'year' && (
          <Text style={styles.text}>
            &#8358;{year && year.toLocaleString('en-US')}.00
          </Text>
        )}
        {period === 'total' && (
          <Text style={styles.text}>
            &#8358;{total && total.toLocaleString('en-US')}.00
          </Text>
        )}
        <Text style={styles.text1}>Expenditure</Text>
      </View>

      <View style={styles.third}>
        <View style={styles.thirdLeft}>
          <Icon name='shop' family='ArgonExtra' size={24} color={'white'} />
        </View>
        <View style={styles.thirdRight}>
          <Text style={styles.thirdRight1}>{today}</Text>
          <Text style={styles.thirdRight2}>No of orders made today</Text>
        </View>
      </View>
      <View style={styles.fourth}>
        <View style={styles.fourthLeft}>
          <Icon name='shop' family='ArgonExtra' size={24} color={'black'} />
        </View>
        <View style={styles.fourthRight}>
          <Text style={styles.fourthRight1}>{length}</Text>
          <Text style={styles.fourthRight2}>Total no of orders made</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },

  first: {
    width: '90%',
    margin: 'auto',
    height: 200,
    backgroundColor: 'rgb(123, 31, 162)',
    marginLeft: 34,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  text: {
    fontSize: 50,
    color: 'white',
    marginLeft: 20,
  },
  text1: {
    fontSize: 25,
    color: 'white',
    marginLeft: 20,
  },

  second: {
    width: '90%',
    margin: 'auto',
    height: 230,
    backgroundColor: 'rgb(21, 101, 192)',
    marginLeft: 34,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  secondTop: {
    width: '80%',
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  secondTopText: {
    display: 'flex',
    flexDirection: 'row',
  },

  peri: {
    marginLeft: 5,
    marginRight: 5,
    color: 'white',
    fontSize: 20,
    backgroundColor: 'rgb(25, 118, 210)',
    padding: 5,
  },

  peris: {
    marginLeft: 5,
    marginRight: 5,
    color: 'white',
    fontSize: 20,
    padding: 5,
  },

  third: {
    width: '90%',
    height: 150,
    backgroundColor: 'rgb(21, 101, 192)',
    marginLeft: 34,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  thirdLeft: {
    marginLeft: 20,
  },

  thirdRight: {
    marginLeft: 10,
  },

  thirdRight1: {
    fontSize: 50,
    color: 'white',
  },
  thirdRight2: {
    color: 'white',
    fontSize: 20,
    opacity: 0.5,
  },
  fourth: {
    width: '90%',
    height: 150,
    backgroundColor: '#ffa500',
    marginLeft: 34,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  fourthLeft: {
    marginLeft: 20,
  },

  fourthRight: {
    marginLeft: 10,
  },

  fourthRight1: {
    fontSize: 50,
  },

  fourthRight2: {
    fontSize: 20,
    opacity: 0.5,
  },
})

export default Home
