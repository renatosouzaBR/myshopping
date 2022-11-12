import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0 24px;
  margin-top: -24px;
`;

export const InputArea = styled.View`
  flex: 1;
  height: 48px;
  border-radius: 16px;
  padding: 0 12px;

  flex-direction: row;
  align-items: center;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.TITLE};
    border: 1px solid ${theme.COLORS.SUCCESS_50};
  `}
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 100%;

  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const SearchButton = styled(TouchableOpacity)`
  width: 48px;
  height: 100%;
  border-radius: 12px;
  margin-left: 8px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;

export const ClearButton = styled(TouchableOpacity)``;
