import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

const Spacer = styled.View<SpacingProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

interface SpacingProps extends ViewProps {
  height?: number;
  width?: number;
}

const Spacing = ({ height = 0, width = 0, ...rest }: SpacingProps) => (
  <Spacer testID="spacing" height={height} width={width} {...rest} />
);

export default Spacing;
