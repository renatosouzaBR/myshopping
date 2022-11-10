import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

export type TypeProps = "primary" | "secundary";

interface Props {
  type: TypeProps;
}

export const Container = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor:
    type === "primary" ? theme.COLORS.SECONDARY_900 : theme.COLORS.TITLE,
}))<Props>`
  width: 100%;
  height: 56px;
  border-radius: 12px;
  padding: 0 20px;
  margin-bottom: 16px;

  font-size: 14px;

  ${({ theme, type }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: type === "primary" ? theme.COLORS.SECONDARY_900 : theme.COLORS.TITLE};
    background-color: ${
      type === "secundary" ? "transparent" : theme.COLORS.TITLE
    };
    border: 1px solid ${
      type === "primary" ? theme.COLORS.SHAPE : theme.COLORS.PRIMARY_100
    };
  `}
`;
