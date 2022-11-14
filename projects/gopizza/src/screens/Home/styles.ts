import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";

import { Button } from "@/components/Forms/Button";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: ${getStatusBarHeight() + 40}px 24px 56px;
`;

export const GreetingWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GreetingText = styled.Text`
  font-size: 20px;
  margin-left: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const SignOutButton = styled.TouchableOpacity`
  padding: 2px;
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 25px 0 22px;
  margin: 0 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const MenuTitle = styled.Text`
  font-size: 20px;

  ${({ theme }) => css`
    color: ${theme.COLORS.SECONDARY_900};
    font-family: ${theme.FONTS.TITLE};
  `}
`;

export const MenuItemsCount = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    color: ${theme.COLORS.SECONDARY_900};
    font-family: ${theme.FONTS.TEXT};
  `}
`;

export const NewProductButton = styled(Button)`
  margin: 0 24px;
  margin-bottom: ${getBottomSpace() + 8}px;
`;
