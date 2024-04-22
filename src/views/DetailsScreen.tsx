/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, Image, ScrollView, Text, View} from 'react-native';
import useAnimeDetailsById from '../hooks/useGetAnimeById';

const DetailsScreen = () => {
  const route = useRoute();
  const id = route.params?.id;
  const {data, isLoading, isError, isFetching, refetch} =
    useAnimeDetailsById(id);
  //   console.log('🚀 ~ DetailsScreen ~ data:', data.data);

  if (isError) {
    return (
      <View>
        <Text>{'Error!'}</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text>{'Fetching....'}</Text>
      </View>
    );
  }

  const renderContent = () => {
    if (data) {
      const anime = data.data;

      return (
        <ScrollView style={{backgroundColor: 'pink', flex: 1}}>
          <Image
            style={{height: '50%', width: '100%'}}
            source={{uri: anime.images?.jpg.large_image_url}}
          />
          <Text>{anime.title}</Text>
          <View
            style={{
              backgroundColor: 'yellow',
              padding: 20,
              borderRadius: 20,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginHorizontal: 20,
            }}>
            <View style={{backgroundColor: 'gray', padding: 10}}>
              <Text>{'Score'}</Text>
              <Text>{anime.score}</Text>
            </View>
            <View style={{backgroundColor: 'gray', padding: 10}}>
              <Text>{'Score'}</Text>
              <Text>{anime.score}</Text>
            </View>

            <View style={{backgroundColor: 'gray', padding: 10}}>
              <Text>{'Score'}</Text>
              <Text>{anime.score}</Text>
            </View>
          </View>
          <Text>{anime.background}</Text>
        </ScrollView>
      );
    }
  };

  return <>{renderContent()}</>;
};

export default DetailsScreen;
