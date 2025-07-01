import React from 'react';
import {
  FlatList,
  FlatListProps as RNFlatListProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface FlatListProps<T> extends RNFlatListProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  onRefresh?: () => void;
  refreshing?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * CustomFlatList is a generic component that renders a list of items using
 * the FlatList component from React Native. It accepts a variety of props
 * to customize its behavior and appearance.
 *
 * @template T - The type of the items in the list.
 * @param {T[]} data - An array of data to be rendered.
 * @param {function} renderItem - A function that returns a React element for a given item.
 * @param {function} keyExtractor - A function that returns a unique key for each item.
 * @param {function} [onRefresh] - A function to be called when a pull-to-refresh is triggered.
 * @param {boolean} [refreshing] - A boolean indicating whether the list is currently refreshing.
 * @param {StyleProp<ViewStyle>} [contentContainerStyle] - Style for the content container.
 *
 * @returns {JSX.Element} A FlatList component that renders the list of items.
 */
function CustomFlatList<T>({
  data,
  renderItem,
  keyExtractor,
  onRefresh,
  refreshing,
  contentContainerStyle,
  ...restProps
}: FlatListProps<T>) {
  return (
    <FlatList
      testID="flat-list"
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onRefresh={onRefresh}
      refreshing={refreshing}
      contentContainerStyle={contentContainerStyle}
      {...restProps}
    />
  );
}

export default CustomFlatList;
