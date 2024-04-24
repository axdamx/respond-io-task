/* eslint-disable react-native/no-inline-styles */
// @ts-nocheck to disable type checking per file
import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const LoadingPlaceholder = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <View>
      <ShimmerPlaceholder
        style={{width: '100%', height: 300, borderRadius: 20, marginTop: 20}}
      />
      <ShimmerPlaceholder
        style={{
          width: '100%',
          height: 300,
          marginVertical: 20,
          borderRadius: 20,
        }}
      />
      <ShimmerPlaceholder
        style={{width: '100%', height: 300, borderRadius: 20}}
      />
    </View>
  );
};

export default LoadingPlaceholder;
