import {getAuth} from '@react-native-firebase/auth';
import React, {useCallback} from 'react';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import img from '../../asserts/images/img1.png';
import Header from '../../components/Headers/Header';
import {useTheme} from '../../theme/ThemeContext';
import {useLogoutMutation} from './ProfileApi';

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
      <Icon
        name="chevron-forward"
        size={20}
        color={useTheme()?.theme.colors.text}
      />
    </OptionTouchable>
  ),
);

const Profile = () => {
  const [logOut, {isLoading, error, isSuccess}] = useLogoutMutation();
  const user = getAuth().currentUser;
  console.log(user);

  const handlePress = useCallback((label: string) => {
    if (label === 'Logout') {
      logOut();
    }
  }, []);

  return (
    <Container>
      <Header title="Profile" isBackButton={false} />
      <ScrollContainer contentContainerStyle={{flexGrow: 1}}>
        <ProfileCard>
          <ProfileImage source={img} resizeMode="cover" />
          <Name>{user?.displayName}</Name>
          <Email>{user?.email}</Email>
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
`;

const ScrollContainer = styled.ScrollView``;

const ProfileCard = styled.View`
  height: ${height / 3.5}px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 15px;
  border-radius: 10px;
  elevation: 2;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

const Name = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSize.md}px;
  font-weight: bold;
  margin-top: 5px;
`;

const Email = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.fontSize.md}px;
`;

const OptionsCard = styled.View`
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
  font-size: ${({theme}) => theme.fontSize.md}px;
  color: ${({theme}) => theme.colors.textPrimary};
`;
