import styled from "styled-components/native";
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
  background-color: transparent;
  border-radius: ${({ type }) => (type === "primary" ? "8px" : "12px")};

  padding: 0 20px;
  margin-bottom: 16px;
  border: 1px solid
    ${({ theme, type }) =>
      type === "primary" ? theme.COLORS.SHAPE : theme.COLORS.PRIMARY_100};

  font-size: ${({ type }) => (type === "primary" ? "14px" : "16px")};
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme, type }) =>
    type === "primary" ? theme.COLORS.SECONDARY_900 : theme.COLORS.TITLE};
`;
