import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

export const Container = styled.View`
  width: 100%;
  height: 56px;
  border-radius: 12px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.TITLE};
    border: 1px solid ${theme.COLORS.SHAPE};
  `}
`;

export const Size = styled.View`
  width: 56px;
  height: 56px;
  background-color: transparent;

  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.COLORS.SHAPE};
  margin-right: 16px;

  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Input = styled(TextInput)`
  flex: 1;
  padding: 0 16px;
`;
