import React, {useCallback} from 'react';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import img from '../../asserts/images/img1.png';
import Header from '../../components/Headers/Header';

const {height} = Dimensions.get('window');

const options = [
  {label: 'My orders', onPress: () => {}},
  {label: 'My wishlist', onPress: () => {}},
  {label: 'Terms & Conditions', onPress: () => {}},
  {label: 'Privacy Policy', onPress: () => {}},
  {label: 'About us', onPress: () => {}},
  {label: 'Logout', onPress: () => {}},
];

const OptionItem = React.memo(
  ({label, onPress}: {label: string; onPress?: () => void}) => (
    <OptionTouchable onPress={onPress}>
      <OptionText>{label}</OptionText>
      <Icon name="chevron-forward" size={20} color="#333" />
    </OptionTouchable>
  ),
);

const Profile = () => {
  const handlePress = useCallback((label: string) => {
    console.log(`${label} pressed`);
  }, []);
  return (
    <Container>
      <Header title="Profile" isBackButton={false} />
      <ScrollContainer contentContainerStyle={{flexGrow: 1}}>
        <ProfileCard>
          <ProfileImage source={img} resizeMode="cover" />
          <Name>John Doe</Name>
          <Email>3oY7t@example.com</Email>
        </ProfileCard>

        <OptionsCard>
          {options.map((item, index) => (
            <OptionItem
              key={index}
              label={item.label}
              onPress={() => handlePress(item.label)}
            />
          ))}
        </OptionsCard>
      </ScrollContainer>
    </Container>
  );
};

export default Profile;

const Container = styled.View`
  flex: 1;
  background-color: #f3f4f6;
`;

const ScrollContainer = styled.ScrollView``;

const ProfileCard = styled.View`
  height: ${height / 3.5}px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 15px;
  border-radius: 10px;
  background-color: white;
  elevation: 2;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
`;

const Email = styled.Text`
  color: gray;
  font-size: 14px;
`;

const OptionsCard = styled.View`
  background-color: white;
  padding: 20px;
  margin: 15px;
  border-radius: 10px;
  gap: 30px;
  elevation: 2;
`;

const OptionTouchable = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OptionText = styled.Text`
  font-size: 16px;
  color: #111;
`;
