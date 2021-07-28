import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { StyleSheet, View } from 'react-native';
import { Title, Text, IconButton} from 'react-native-paper';
import { HomeStackParamList } from '../data/type';
import { StackScreenProps } from '@react-navigation/stack';

type ViewCookieProps = StackScreenProps<HomeStackParamList, 'ViewCookie'>

export default function ViewCookie({ route, navigation}: ViewCookieProps) {
  const [ fortune, setFortune ] = useState({text:"", date: ""})
  const fortuneIndex = route.params.fortuneId
  useEffect(() => {
    let mounted=true
    const currFortune = {
      text: route.params.fortuneText,
      date: route.params.fortuneDate
    }
    if(mounted) {
      setFortune(currFortune)
    }
    return() => {mounted=false}
  }, [])

  const card_colors = ['#0AB5FF', '#9146FF', '#20C09F', '#0165FE', '#5A36FD', '#01C1CD']
  const date_colors = ['#3BC3FF', '#A76BFF', '#4CCCB2', '#3384FF', '#7B5CF5', '#33CDD7']

  return (
    <View style={{...styles.viewCookieContainer, backgroundColor: `${card_colors[fortuneIndex % 6]}`}}>
      <View style={styles.headerContainer}>
        <IconButton
          icon="close-circle"
          size={34}
          color='#fff'
          onPress={ () => {navigation.navigate('Home')} }
        />
      </View>
      <View style={styles.fortuneTextContainer}>
        <Title style={styles.fortuneText}>
          {fortune.text}
        </Title>
      </View>
      <View style={styles.fortuneDateContainer}>
        <Text style={{...styles.dateText, backgroundColor: `${date_colors[fortuneIndex % 6]}`}}>
          {moment(fortune.date).format('MMMM Do, YYYY')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewCookieContainer: {
    flex: 1,
    paddingVertical: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerContainer: {
    margin: 5,
    alignSelf: 'flex-end'
  },
  fortuneTextContainer: {
    
  },
  fortuneText: {
    textAlign: 'center',
    color: '#fff'
  },
  fortuneDateContainer: {
    marginBottom: 20
  },
  dateText: {
    color: '#fff',
    borderRadius: 7,
    padding: 5,
    alignItems: 'center'
  }
});