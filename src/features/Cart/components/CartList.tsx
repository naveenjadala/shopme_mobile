import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {CartItem, CartListProps} from '../types';

/**
 * A CartList component that renders the cart items and their details.
 * @example
 * <CartList productDetails={() => {}} cateData={[]} />
 * @prop {function} productDetails - A function that takes the product id as an argument and navigates to the product details screen.
 * @prop {CartItem[]} cateData - An array of cart items.
 * @returns {React.ReactElement}
 */
const CartList = ({productDetails, cateData}: CartListProps) => {
  const {subtotal, deliveryFee, total} = React.useMemo(() => {
    const subtotal = cateData?.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0,
    );
    const deliveryFee = 0;
    return {
      subtotal: subtotal?.toFixed(2),
      deliveryFee: deliveryFee?.toFixed(2),
      total: (subtotal + deliveryFee)?.toFixed(2),
    };
  }, [cateData]);

  const renderItem = React.useCallback(
    ({item, index}: {item: CartItem; index: number}) => (
      <React.Fragment key={`${item.id}-${index}`}>
        <ItemWrapper onPress={() => productDetails(item.productId)}>
          <ItemContainer>
            <ItemImage source={{uri: item.image}} resizeMode="cover" />
            <ItemContent>
              <ItemTitle numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </ItemTitle>
              <ItemDetail>{item.category}</ItemDetail>
              <ItemDetail>{item.color}</ItemDetail>
              <ItemDetail>{item.size}</ItemDetail>
            </ItemContent>
          </ItemContainer>
          <ItemFooter>
            <QtyText>Qty ^</QtyText>
            <PriceText>${item.price}</PriceText>
          </ItemFooter>
        </ItemWrapper>
        <Divider isLast={index === cateData.length - 1} />
      </React.Fragment>
    ),
    [productDetails],
  );

  const ListFooter = React.useMemo(
    () => (
      <FooterContainer>
        <Divider />
        <SummaryRow>
          <SummaryLabel>Subtotal</SummaryLabel>
          <SummaryValue>${subtotal}</SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Delivery</SummaryLabel>
          <SummaryValue>
            {parseFloat(deliveryFee) > 0 ? `$${deliveryFee}` : 'Free'}
          </SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <TotalLabel>Total</TotalLabel>
          <TotalValue>${total}</TotalValue>
        </SummaryRow>
      </FooterContainer>
    ),
    [subtotal, total],
  );

  return (
    <Container>
      <FlatList
        data={cateData}
        renderItem={renderItem}
        ListFooterComponent={ListFooter}
        keyExtractor={item => `${item.id}-${item.productId}`}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </Container>
  );
};

export default CartList;

const Container = styled.View`
  flex: 1;
  padding: 0 16px;
`;

const ItemWrapper = styled.TouchableOpacity`
  margin-top: 16px;
`;

const ItemContainer = styled.View`
  flex-direction: row;
`;

const ItemImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 8px;
`;

const ItemContent = styled.View`
  flex: 1;
  padding: 0 12px;
  justify-content: center;
`;

const ItemTitle = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.textPrimary};
  margin-bottom: 4px;
`;

const ItemDetail = styled.Text`
  font-size: ${({theme}) => theme.fontSize.base}px;
  color: ${({theme}) => theme.colors.textSecondary};
  margin-bottom: 2px;
`;

const ItemFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const QtyText = styled.Text`
  font-size: ${({theme}) => theme.fontSize.base}px;
  color: ${({theme}) => theme.colors.textSecondary};
`;

const PriceText = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.textPrimary};
`;

const Divider = styled.View<{isLast?: boolean}>`
  height: ${({isLast}) => (isLast ? '0px' : '1px')};
  background-color: ${({theme}) => theme.colors.border};
  margin: ${({isLast}) => (isLast ? '0px' : '8px 0')};
`;

const FooterContainer = styled.View`
  margin-top: 16px;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
`;

const SummaryLabel = styled.Text`
  font-size: ${({theme}) => theme.fontSize.base}px;
  color: ${({theme}) => theme.colors.textSecondary};
`;

const SummaryValue = styled.Text`
  font-size: ${({theme}) => theme.fontSize.base}px;
  color: ${({theme}) => theme.colors.textSecondary};
`;

const TotalLabel = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.textPrimary};
`;

const TotalValue = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.textPrimary};
`;
