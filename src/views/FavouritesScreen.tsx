/* eslint-disable react-native/no-inline-styles */
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import useAnimeDetails from '../hooks/useGetAnime';
import useAnimeStore from '../store/animeStore';
import useFavoriteStore from '../store/favouriteStore';

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
  const favorites = useFavoriteStore(state => state.favorites);
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);

  // const { data, isLoading, isError } = useQuery('animeData', fetchAnimeData); // Assuming fetchAnimeData is your fetch function

  //   const {data: apiData, isLoading, isError, isFetching} = useAnimeDetails();
  // console.log('apiData', apiData?.data);
  console.log('favorites', favorites);

  //   useEffect(() => {
  //     if (apiData) {
  //       setAnimeData(apiData.data);
  //     }
  //   }, [apiData, setAnimeData]);

  //   const filteredData = animeData.filter(anime =>
  //     anime.title.toLowerCase().includes(searchQuery.toLowerCase()),
  //   );

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

  const renderItem = ({item}) => {
    console.log('item', item);

    const isFavourite = favorites.some(favItem => favItem.id === item.id);

    return (
      <TouchableOpacity
        // key={index}
        onPress={() => navigation.navigate('DetailsScreen', {id: item.id})}>
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

  // const renderList = () =>
  //   filteredData?.map((x, index) => renderItem(x, index));

  //   if (isLoading) {
  //     return <Text>Loading...</Text>;
  //   }

  //   if (isError) {
  //     return <Text>Error fetching data</Text>;
  //   }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.mal_id}
        // onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        // numColumns={2}
        showsVerticalScrollIndicator={false}
        // ListFooterComponent={isFetching && <Text>Loading more...</Text>}
      />
    </View>
  );
};

export default HomeScreen;
