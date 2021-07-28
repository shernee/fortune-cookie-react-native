import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { Title, Subheading, Text, FAB} from 'react-native-paper';
import { FortuneListShape, HomeStackParamList } from '../data/type';
import { StackScreenProps } from '@react-navigation/stack';

type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>

export default function Home({ navigation }: HomeProps) {
  
  const [ allFortunes, setAllFortunes ] = useState<Array<FortuneListShape>>([])
  const isFocused: boolean = useIsFocused()

  useEffect(() => {
    let mounted=true
    const fileUri = FileSystem.documentDirectory + 'fortunes.json'
    FileSystem.readAsStringAsync(fileUri).then(dataRes => {
      if (mounted) {
        setAllFortunes(JSON.parse(dataRes))
      }
    })
    
    return() => {mounted=false}
  }, [isFocused])

  const card_colors = ['#0AB5FF', '#9146FF', '#20C09F', '#0165FE', '#5A36FD', '#01C1CD']
  const date_colors = ['#3BC3FF', '#A76BFF', '#4CCCB2', '#3384FF', '#7B5CF5', '#33CDD7']

  return (
    <View style={styles.homeContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Title style={styles.headerText}>
            My Fortunes
          </Title>
        </View>
        <View style={styles.allCookiesList}>
          {
            /* 
            To create a grid with a mix of single column and double column rows (variable sized cards)

            loop over every fortune cookie 
                if idx mod 5 = 0
                  then render single column row
                  increment idx by 1
                else
                  render double column row
                  increment idx by 2 
            */
            allFortunes.map( (fortune, index) => (
            <Pressable 
              key={index}
              style={{...styles.cookieContainer, backgroundColor: `${card_colors[index % 6]}`}}
              onPress={() => {
                navigation.navigate('ViewCookie', {fortuneId: index, fortuneText: fortune.text, fortuneDate: fortune.date})
              }}
            >
              <Subheading style={styles.fortuneText}>
                {fortune.text}
              </Subheading>
              <Text style={{...styles.dateText, backgroundColor: `${date_colors[index % 6]}`}}>
                {moment(fortune.date).format('MMMM Do, YYYY')}
              </Text>
            </Pressable>
          ))
          }
        </View>
      </ScrollView>
      <FAB
          style={styles.addFortuneFab}
          icon="plus"
          color="#fff"
          onPress={() => {navigation.navigate('AddCookie')}}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50
  },
  headerContainer: {
    margin: 15,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "600"
  },
  allCookiesList: {
    margin: 15,
  },
  cookieContainer: {
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  fortuneText: {
    padding: 20,
    color: '#fff',
    fontSize: 18,
    fontWeight: "600"
  },
  dateText: {
    margin: 20,
    color: '#fff',
    borderRadius: 7,
    padding: 5,
    alignSelf:'flex-start'
  },
  addFortuneFab: {
    position: 'absolute',
    margin: 20,
    marginBottom: 30,
    right: 0,
    bottom: 0,
    backgroundColor: "black"
  },
});