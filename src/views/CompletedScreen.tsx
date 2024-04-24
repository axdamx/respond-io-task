/* eslint-disable react-native/no-inline-styles */
// @ts-nocheck to disable type checking per file
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import useFavoriteStore from '../store/favouriteStore';
import useAnimePagination from '../hooks/useGetAnime';
import {RootStackParamList} from '../constants/types';
import {primaryColor} from '../constants/colors';
import LoadingPlaceholder from './component/LoadingPlaceholder';
import MainLists from './component/MainLists';

type CompletedScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Completed'
>;

type Props = {
  navigation: CompletedScreenNavigationProp;
};
const CompletedScreen: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {favorites, toggleFavorite} = useFavoriteStore();

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAnimePagination();

  const dataArray = data?.pages.flatMap(page => page.data);

  const filteredData = dataArray?.filter(anime =>
    anime?.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleFavoritePress = (id: string) => {
    toggleFavorite(id);
  };

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isLoading]);

  const renderItem = ({item}) => {
    const isFavourite = favorites.some(
      favItem => favItem.mal_id === item.mal_id,
    );
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailsScreen', {anime: item})}>
        <View
          style={{
            margin: 10,
            backgroundColor: primaryColor,
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: item.images.jpg.large_image_url}}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 200,
            }}
          />
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{width: '80%'}}>
              <Text>Name: {item.title}</Text>
              <Text>Score: {item.score}</Text>
              <Text>Rating: {item?.rating}</Text>
              <Text>Year: {item.year}</Text>
            </View>

            <View
              style={{
                alignSelf: 'center',
              }}>
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

  return (
    <View style={{flex: 1}}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Search Anime"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <MainLists
        data={filteredData}
        renderItem={renderItem}
        onEndReached={onEndReached}
        renderFooter={renderFooter}
      />
    </View>
  );
};

export default CompletedScreen;
