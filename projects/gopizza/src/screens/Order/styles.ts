import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  padding: ${getStatusBarHeight() + 34}px 24px 0;
`;

export const Photo = styled.Image`
  width: 240px;
  height: 240px;
  border-radius: 120px;

  align-self: center;
  top: -120px;
`;

export const Sizes = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Form = styled.View`
  width: 100%;
  padding: 24px;
  margin-top: -120px;
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 6px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 16px;
  margin-top: 40px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const InputGroup = styled.View`
  width: 48%;
`;

export const FormRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Total = styled(Label)`
  margin: 24px 0;
  text-align: right;
`;
