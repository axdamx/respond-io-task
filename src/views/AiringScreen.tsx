/* eslint-disable react-native/no-inline-styles */
// @ts-nocheck to disable type checking per file
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import useFavoriteStore from '../store/favouriteStore';
import {RootStackParamList} from '../constants/types';
import {StackNavigationProp} from '@react-navigation/stack';
import useAnimePagination from '../hooks/useGetAnime';
import LoadingPlaceholder from './component/LoadingPlaceholder';
import MainLists from './component/MainLists';
import {primaryColor} from '../constants/colors';

type AiringScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Airing'
>;

type Props = {
  navigation: AiringScreenNavigationProp;
};
const AiringScreen: React.FC<Props> = ({navigation}) => {
  const {favorites, toggleFavorite} = useFavoriteStore();

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAnimePagination('airing');

  const dataArray = data?.pages.flatMap(page => page.data);

  const handleFavoritePress = id => {
    toggleFavorite(id);
  };

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isLoading]);

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  const renderFooter = () => {
    if (!hasNextPage || !isFetchingNextPage) {
      return null;
    }
    return (
      <ActivityIndicator
        style={{marginVertical: 20}}
        size="large"
        color={primaryColor}
      />
    );
  };

  const renderItem = ({item}) => {
    const isFavourite = favorites.some(
      favItem => favItem.mal_id === item.mal_id,
    );

    return (
      <TouchableOpacity
        // key={index}
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

  return (
    <View style={{flex: 1}}>
      <MainLists
        data={dataArray}
        renderItem={renderItem}
        onEndReached={onEndReached}
        renderFooter={renderFooter}
      />
    </View>
  );
};

export default AiringScreen;
