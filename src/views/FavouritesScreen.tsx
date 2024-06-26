/* eslint-disable react-native/no-inline-styles */
// @ts-nocheck to disable type checking per file
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import useFavoriteStore from '../store/favouriteStore';
import {RootStackParamList} from '../constants/types';

type FavouriteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Favourite'
>;

type Props = {
  navigation: FavouriteScreenNavigationProp;
};
const FavouritesScreen: React.FC<Props> = ({navigation}) => {
  const favorites = useFavoriteStore(state => state.favorites);
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);

  const handleFavoritePress = id => {
    toggleFavorite(id);
  };

  const renderItem = ({item}) => {
    const isFavourite = favorites.some(favItem => favItem.id === item.id);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailsScreen', {anime: item})}>
        <View
          style={{
            margin: 10,
            backgroundColor: 'pink',
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: item.images.jpg.large_image_url}}
            style={{
              width: '100%',
              height: 200,
            }}
          />
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{width: '80%'}}>
              <Text>Name: {item.title}</Text>
              <Text>Score: {item.score}</Text>
              <Text>Rating: {item?.rating}</Text>
              <Text>Year: {item.year}</Text>
            </View>
            <View style={{alignSelf: 'center'}}>
              <IonIcon
                name={isFavourite ? 'heart' : 'heart-outline'}
                size={24}
                color={'red'}
                style={{marginLeft: 10}}
                onPress={() => handleFavoritePress(item)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (favorites.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textDecorationStyle: 'double'}}>
          You have no favourite anime yet??!
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.mal_id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavouritesScreen;
