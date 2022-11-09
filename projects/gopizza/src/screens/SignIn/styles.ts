import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

export const Container = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
  start: { x: 0, y: 1 },
  end: { x: 0.5, y: 0.5 },
}))`
  flex: 1;
  justify-content: center;
  padding: 48px 32px;
`;

export const Brand = styled.Image.attrs({
  resizeMode: "contain",
  style: { height: 364 },
})``;

export const Title = styled.Text`
  font-size: 32px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TITLE};

  margin-top: 10px;
  margin-bottom: 22px;
`;

export const ForgotPasswordButton = styled(TouchableOpacity)`
  margin: 4px 0 20px 0;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TITLE};

  align-self: flex-end;
`;
