import React, { useState, useEffect } from 'react';
import moment from 'moment';
import * as FileSystem from 'expo-file-system'
import { StyleSheet, View, TextInput } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { FortuneListShape, HomeStackParamList } from '../data/type';
import { StackScreenProps } from '@react-navigation/stack';

type AddCookieProps = StackScreenProps<HomeStackParamList, 'AddCookie'>

export default function AddCookie({ navigation }: AddCookieProps) {
  const [allFortunes, setAllFortunes] = useState<Array<FortuneListShape>>([])
  const [fortuneText, setfortuneText] = useState("")

  useEffect(() => {
    let mounted = true
    const fileUri = FileSystem.documentDirectory + 'fortunes.json'
    FileSystem.readAsStringAsync(fileUri).then(dataRes => {
      if (mounted) {
        setAllFortunes(JSON.parse(dataRes))
      }
    })
    return () => { mounted = false }
  }, [allFortunes])

  const handleSubmit = () => {
    var newFortune = {
      text: fortuneText,
      date: moment().format()
    }
    setAllFortunes([...allFortunes, newFortune])
    allFortunes.unshift(newFortune)
    const fileUri = FileSystem.documentDirectory + 'fortunes.json'
    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(allFortunes)).then((res) => {
      navigation.navigate('Home')
    })
  }
  return (
    <View style={styles.addCookieContainer}>
      <View style={styles.headerContainer}>
        <IconButton
          icon="close-circle"
          size={34}
          color='black'
          onPress={() => { navigation.navigate('Home') }}
        />
      </View>
      <TextInput
        value={fortuneText}
        onChangeText={setfortuneText}
        placeholder="Start writing..."
        multiline={true}
        numberOfLines={8}
        style={styles.fortuneInputContainer}
      />
      <Button
        mode="contained"
        color="black"
        style={styles.fortuneSubmit}
        onPress={() => { handleSubmit() }}
      >
        Done
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  addCookieContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  headerContainer: {
    margin: 5,
    alignSelf: 'flex-end'
  },
  fortuneInputContainer: {
    fontSize: 24,
    fontWeight: "700",
    textAlignVertical: 'top'
  },
  fortuneSubmit: {
    borderRadius: 12,
    width: '20%',
    alignSelf: 'flex-end'
  }
});