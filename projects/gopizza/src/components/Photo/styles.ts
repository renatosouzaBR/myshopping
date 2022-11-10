import { Platform } from "react-native";
import styled, { css } from "styled-components/native";

export const Image = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;

  align-items: center;
  justify-content: center;

  ${Platform.OS === "ios"
    ? css`
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
      `
    : css`
        elevation: 2;
      `}
`;

export const Placeholder = styled.View`
  width: 160px;
  height: 160px;
  border-radius: 80px;

  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    border: 1px dashed ${theme.COLORS.SECONDARY_900};
    background-color: ${theme.COLORS.TITLE};
  `}
`;

export const PlaceholderText = styled.Text`
  font-size: 14px;
  line-height: 22px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
