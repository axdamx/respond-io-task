/* eslint-disable react-native/no-inline-styles */
// @ts-nocheck to disable type checking per file
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import useAnimeDetailsById from '../hooks/useGetAnimeById';
import useFavoriteStore from '../store/favouriteStore';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DetailsLoadingPlaceholder from '../views/component/DetailsLoadingPlaceholder';

const DetailsScreen = () => {
  const route = useRoute();
  const id = route.params?.anime.mal_id;
  const {data, isLoading, isError, refetch} = useAnimeDetailsById(id);
  const {favorites, toggleFavorite} = useFavoriteStore();

  if (isError) {
    return (
      <View>
        <Text>{'Error!'}</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  if (isLoading) {
    return <DetailsLoadingPlaceholder />;
  }

  const handleFavoritePress = id => {
    toggleFavorite(id);
  };

  const renderContent = () => {
    if (data) {
      const anime = data.data;
      console.log('🚀 ~ renderContent ~ anime:', anime);
      const isFavourite = favorites.some(
        favItem => favItem.mal_id === anime.mal_id,
      );

      return (
        <ScrollView style={{}}>
          <Image
            style={{height: 450, width: '100%'}}
            source={{uri: anime.images?.jpg.large_image_url}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text
              style={{fontWeight: 'bold', fontSize: 24, marginVertical: 12}}>
              {anime.title}
            </Text>
            <IonIcon
              name={isFavourite ? 'heart' : 'heart-outline'}
              size={24}
              color={'red'}
              style={{marginLeft: 10, alignSelf: 'center'}}
              onPress={() => handleFavoritePress(anime)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              paddingHorizontal: 10,
            }}>
            {anime.genres.map(x => {
              return (
                <View style={styles.genreContainer}>
                  <Text style={{color: 'gray'}}>{x.name ?? '0'}</Text>
                </View>
              );
            })}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
            }}>
            <View style={styles.statContainer}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>{'Score'}</Text>
              <Text>{anime.score ?? '0'}</Text>
            </View>
            <View style={styles.statContainer}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>
                {'Episodes'}
              </Text>
              <Text>{anime.episodes ?? '0'}</Text>
            </View>

            <View style={styles.statContainer}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>{'Year'}</Text>
              <Text>{anime.year ?? '0'}</Text>
            </View>
            <View style={styles.statContainer}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>{'Status'}</Text>
              <Text>{anime.status}</Text>
            </View>
          </View>

          <View style={{margin: 24}}>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>
              {anime.synopsis}
            </Text>
          </View>
        </ScrollView>
      );
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statContainer: {
    borderRadius: 15,
    backgroundColor: 'gray',
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  genreContainer: {
    padding: 2,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 10,
  },
});

export default DetailsScreen;
