import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import useAnimeDetails from '../hooks/useGetAnime';

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
  const {data: apiData, isLoading, isError, isFetching} = useAnimeDetails();
  console.log('apiData', apiData?.data);
  const mockData = [
    {
      id: 1,
      title: 'DragonBallSuper 1',
      rating: 7.5,
      genres: ['Action', 'Adventure', 'Fantasy'],
      price: 1999,
    },
    {
      id: 2,
      title: 'DragonBallSuper 2',
      rating: 7.5,
      genres: ['Action', 'Adventure', 'Fantasy'],
      price: 1999,
    },
    {
      id: 3,
      title: 'DragonBallSuper 3',
      rating: 7.5,
      genres: ['Action', 'Adventure', 'Fantasy'],
      price: 1999,
    },
    {
      id: 4,
      title: 'DragonBallSuper 4',
      rating: 7.5,
      genres: ['Action', 'Adventure', 'Fantasy'],
      price: 1999,
    },
    {
      id: 5,
      title: 'DragonBallSuper 5',
      rating: 7.5,
      genres: ['Action', 'Adventure', 'Fantasy'],
      price: 1999,
    },
    {
      id: 6,
      title: 'DragonBallSuper 6',
      rating: 7.5,
      genres: ['Action', 'Adventure', 'Fantasy'],
      price: 1999,
    },
  ];

  const [data, setData] = useState(mockData);

  const filteredData = data.filter(anime =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleSearch = () => {
    // refetch();
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
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
          source={{uri: item.image_url}}
          style={{
            width: '100%',
            height: 200,
            backgroundColor: 'yellow',
          }}
        />
        <View style={{margin: 10}}>
          <Text>Name: {item.title}</Text>
          <Text>Rating: {item.rating}</Text>
          <Text>Genres: {item?.genres[1]}</Text>
          <Text>Price: {item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
      {isLoading && <Text>{'is loading....'}</Text>}
      <View style={{alignItems: 'center', flex: 1}}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          // onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={isFetching && <Text>Loading more...</Text>}
        />
      </View>

      {/* <Button
        title="Go to Anime Listing"
        onPress={() => navigation.navigate('AnimeListing')}
      /> */}
    </View>
  );
};

export default HomeScreen;
