import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

type LoaderProps = {
  size?: ActivityIndicatorProps['size'];
  color?: ActivityIndicatorProps['color'];
};

/**
 * A full-screen loader component.
 *
 * @param {LoaderProps} props The props of the component.
 * @param {ActivityIndicatorProps['size']} [props.size='large'] The size of the loader.
 * @param {ActivityIndicatorProps['color']} [props.color='#000'] The color of the loader.
 *
 * @returns {React.ReactElement} The loader component.
 */
const Loader: React.FC<LoaderProps> = ({ size = 'large', color = '#000' }) => (
  <Container>
    <ActivityIndicator testID="loader" size={size} color={color} />
  </Container>
);

export default Loader;
