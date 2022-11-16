import styled, { css } from "styled-components/native";

export interface ContainerProps {
  color: string;
}

export interface BadgeProps {
  noNotifications: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<ContainerProps>`
  font-size: 18px;

  ${({ theme, color }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${color};
  `}
`;

export const Badge = styled.View<BadgeProps>`
  width: 32px;
  height: 20px;
  border-radius: 100px;
  margin-left: 10px;

  align-items: center;
  justify-content: center;

  ${({ theme, noNotifications }) =>
    noNotifications &&
    css`
      background-color: transparent;
      border: 1px solid ${theme.COLORS.SECONDARY_500};
    `}

  ${({ theme, noNotifications }) =>
    !noNotifications &&
    css`
      background-color: ${theme.COLORS.SUCCESS_900};
    `}
`;

export const Quantity = styled.Text<BadgeProps>`
  font-size: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
  `}

  ${({ theme, noNotifications }) =>
    noNotifications &&
    css`
      color: ${theme.COLORS.SECONDARY_500};
    `}

  ${({ theme, noNotifications }) =>
    !noNotifications &&
    css`
      color: ${theme.COLORS.TITLE};
    `}
`;
