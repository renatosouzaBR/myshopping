import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const Content = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;

  margin-right: 20px;
`;

export const Details = styled.View`
  flex: 1;
`;

export const Identification = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 8px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Description = styled.Text`
  font-size: 12px;
  line-height: 20px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_500};
  `}
`;

export const Line = styled.View`
  height: 1px;
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};

  margin: 12px 0;
  margin-left: 124px;
`;
