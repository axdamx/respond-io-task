import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

const DetailsScreen = () => {
  const route = useRoute();
  const id = route.params?.id;
  return (
    <View>
      <Text>{'Details Screen'}</Text>
      <Text>{id}</Text>
    </View>
  );
};

export default DetailsScreen;
