/* eslint-disable react-native/no-inline-styles */
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import useAnimeDetails from '../hooks/useGetAnime';
import useAnimeStore from '../store/animeStore';
import useFavoriteStore from '../store/favouriteStore';
import useAnimePagination from '../hooks/useGetAnime';

type RootStackParamList = {
  Home: undefined;
  AnimeListing: {id: number};
  // Add other screens and their parameters here
} & ParamListBase;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  // const [liked, setLiked] = useState(false);

  // const animeData = useAnimeStore(state => state.animeData);
  // console.log('🚀 ~ animeData:', animeData);
  // const setAnimeData = useAnimeStore(state => state.setAnimeData);

  const favorites = useFavoriteStore(state => state.favorites);
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);

  // const { data, isLoading, isError } = useQuery('animeData', fetchAnimeData); // Assuming fetchAnimeData is your fetch function

  const {
    data: apiData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAnimePagination();
  // console.log('apiData', apiData?.pages);
  const dataArray = apiData?.pages.flatMap(page => page.data);
  // console.log('🚀 ~ dataArray:', dataArray);
  // console.log('🚀 ~ animeData:', animeData);

  // console.log('data', data);

  // useEffect(() => {
  //   if (apiData) {
  //     setAnimeData(dataArray);
  //   }
  // }, [apiData, setAnimeData]);

  // const airingAnimeData = useAnimeStore(state =>
  //   state.animeData.filter(anime => anime.status === 'Currently Airing'),
  // );
  // console.log('🚀 ~ airingAnimeData:', airingAnimeData);

  const filteredData = dataArray?.filter(anime =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleFavoritePress = id => {
    toggleFavorite(id);
  };

  const handleSearch = () => {
    // refetch();
  };

  // const renderItem = (item, index) => {
  //   console.log('item', item);

  //   return (
  //     <TouchableOpacity
  //       key={index}
  //       onPress={() => navigation.navigate('DetailsScreen', {id: item.id})}>
  //       <View
  //         style={{
  //           // flexDirection: 'row',
  //           // justifyContent: 'center',
  //           // alignSelf: 'center',
  //           // alignItems: 'center',
  //           margin: 10,
  //           backgroundColor: 'pink',
  //           borderRadius: 20,
  //           overflow: 'hidden',
  //         }}>
  //         <Image
  //           source={{uri: item.images.jpg.large_image_url}}
  //           // resizeMode="contain"
  //           style={{
  //             width: '100%',
  //             height: 200,
  //             // backgroundColor: 'yellow',
  //           }}
  //         />
  //         <View style={{margin: 10}}>
  //           <Text>Name: {item.title}</Text>
  //           <Text>Score: {item.score}</Text>
  //           <Text>Rating: {item?.rating}</Text>
  //           <Text>Year: {item.year}</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // const onEndReached = () => {
  //   if (hasNextPage && !isLoading) {
  //     fetchNextPage();
  //   }
  // };
  const onEndReached = useCallback(() => {
    if (hasNextPage && !isLoading) {
      console.log('End of list reached. Fetching next page...');
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isLoading]);

  const renderItem = ({item}) => {
    const isFavourite = favorites.some(
      favItem => favItem.mal_id === item.mal_id,
    );
    return (
      <TouchableOpacity
        // key={index}
        onPress={() => navigation.navigate('DetailsScreen', {id: item.mal_id})}>
        <View
          style={{
            // flexDirection: 'row',
            // justifyContent: 'center',
            // alignSelf: 'center',
            // alignItems: 'center',
            margin: 10,
            backgroundColor: 'pink',
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: item.images.jpg.large_image_url}}
            // resizeMode="contain"
            style={{
              width: '100%',
              height: 200,
              // backgroundColor: 'yellow',
            }}
          />
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              // justi
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
                // eslint-disable-next-line react-native/no-inline-styles
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
    return <Text>Loading...</Text>;
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
        color="blue"
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
        onSubmitEditing={handleSearch}
      />
      <FlatList
        style={{backgroundColor: 'yellow', flexGrow: 1, flex: 1}}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.mal_id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        // numColumns={2}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default HomeScreen;
