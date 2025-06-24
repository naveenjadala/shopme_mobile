import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import styled from 'styled-components/native';

type LoaderProps = {
  size?: ActivityIndicatorProps['size'];
  color?: ActivityIndicatorProps['color'];
};

/**
 * Loader is a reusable component that displays a loading indicator.
 *
 * @component
 * @example
 * <Loader size="small" color="#fff" />
 *
 * @param {LoaderProps} props - Properties to configure the loader.
 * @param {('small' | 'large')} [props.size='large'] - The size of the loader.
 * @param {string} [props.color='#000'] - The color of the loader.
 *
 * @returns {JSX.Element} A styled container with an ActivityIndicator component.
 */

const Loader: React.FC<LoaderProps> = ({size = 'large', color = '#000'}) => {
  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
    </Container>
  );
};

export default Loader;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
