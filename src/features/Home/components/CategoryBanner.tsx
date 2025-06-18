import React from 'react';
import {Dimensions, ImageURISource} from 'react-native';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;

interface Props {
  onPress: (category: string) => void;
  categories: {label: string; key: string; image: ImageURISource}[];
}

const CategoryBanner = React.memo(({onPress, categories}: Props) => {
  return (
    <Container>
      {categories?.map(cat => (
        <Card
          key={cat.key}
          onPress={() => onPress(cat.key)}
          activeOpacity={0.8}>
          <BackgroundImage source={cat.image} resizeMode="contain">
            <Overlay />
            <Label>{cat.label}</Label>
          </BackgroundImage>
        </Card>
      ))}
    </Container>
  );
});

export default CategoryBanner;

const Container = styled.View`
  justify-content: space-between;
  margin-top: 25px;
`;

const Card = styled.TouchableOpacity`
  height: ${screenWidth / 3 - 4}px;
  width: ${screenWidth}px;
  margin: 1px;
`;

const BackgroundImage = styled.ImageBackground`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.View`
  background-color: ${({theme}) => theme.colors.background};
`;

const Label = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  font-weight: bold;
  text-transform: uppercase;
  z-index: 1;
  width: 100%;
  padding-left: 15px;
`;
