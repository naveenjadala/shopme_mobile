import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components';

const FlatList = () => {
  return (
    <View>
      <StyledFlatList
        data={allProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching && data?.hasMore ? (
            <ActivityIndicator size="large" color="#000" />
          ) : null
        }
      />
    </View>
  );
};

export default FlatList;

const StyledFlatList = styled.FlatList.attrs(() => ({
    columnWrapperStyle: {
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    contentContainerStyle: {
      paddingTop: 12,
      paddingBottom: 32,
    },
  }))`` as unknown as typeof FlatList;

const styles = StyleSheet.create({});
