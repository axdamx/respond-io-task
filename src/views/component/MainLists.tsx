// @ts-nocheck to disable type checking per file
import {FlatList} from 'react-native';
import React from 'react';

interface MainListsOwnProps {
  data;
  renderItem;
  onEndReached;
  renderFooter;
}
const MainLists = (props: MainListsOwnProps) => {
  return (
    <FlatList
      data={props.data}
      renderItem={props.renderItem}
      keyExtractor={item => `id_${item.mal_id}`}
      onEndReached={props.onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={props.renderFooter}
    />
  );
};

export default MainLists;
