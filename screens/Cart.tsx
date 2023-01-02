import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function Cart({ navigation }: RootTabScreenProps<'Cart'>) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={{ height: 42 }}>
      </View>
        <FlatList
        style={{
          width:'100%',
          padding: 10,
      }}
          data={[
            'one',
            'two',
            'three'
          ]}
          renderItem={(item) => (
            <View style={{...styles.listItem,backgroundColor:Colors[colorScheme].shade}}>
              <Text style={{color:Colors[colorScheme].text}}>{item.item}</Text>
            </View>
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    height: 50,
    borderRadius: 10,
  },
  card: {
    width: 300,
  },
  container: {
    paddingTop: 150,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -150,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
