import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";

type Status = "Pronto" | "Preparando" | "Entregue";

export interface ContainerProps {
  index: number;
}

export interface StatusProps {
  status: Status;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 50%;
  padding: 24px 0;
  align-items: center;
  justify-content: center;

  ${({ theme, index }) =>
    index % 2 === 0 &&
    css`
      border-right-width: 1px;
      border-right-color: ${theme.COLORS.SHAPE};
    `}
`;

export const Photo = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;

  margin-bottom: 20px;
`;

export const Name = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Details = styled.Text`
  font-size: 14px;
  margin-bottom: 16px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_500};
  `}
`;

export const StatusView = styled.View<StatusProps>`
  padding: 8px 16px;
  border-radius: 12px;

  ${({ theme, status }) =>
    status === "Pronto" &&
    css`
      background-color: ${theme.COLORS.SUCCESS_900};
    `}

  ${({ theme, status }) =>
    status === "Preparando" &&
    css`
      background-color: ${theme.COLORS.ALERT_50};
      border: 1px solid ${theme.COLORS.ALERT_900};
    `}

  ${({ theme, status }) =>
    status === "Entregue" &&
    css`
      background-color: ${theme.COLORS.SECONDARY_900};
    `}
`;

export const Status = styled.Text<StatusProps>`
  font-size: 12px;

  ${({ theme, status }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${status === "Preparando"
      ? theme.COLORS.ALERT_900
      : theme.COLORS.TITLE};
  `}
`;
