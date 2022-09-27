import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

export type TypeProps = "primary" | "secundary";

interface Props extends TouchableOpacityProps {
  type: TypeProps;
}

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  max-height: 56px;
  min-height: 56px;
  border-radius: 12px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme, type }) =>
    type === "primary" ? theme.COLORS.PRIMARY_800 : theme.COLORS.SUCCESS_900};
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE,
}))``;
