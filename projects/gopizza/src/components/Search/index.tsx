import React from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import {
  ClearButton,
  Container,
  Input,
  InputArea,
  SearchButton,
} from "./styles";

interface SearchProps extends TextInputProps {
  onSearch(): void;
  onClear(): void;
}

export function Search(props: SearchProps) {
  const { onClear, onSearch, ...rest } = props;
  const { COLORS } = useTheme();

  return (
    <Container>
      <InputArea>
        <Input {...rest} />

        <ClearButton onPress={onClear}>
          <Feather name="x" size={16} />
        </ClearButton>
      </InputArea>

      <SearchButton activeOpacity={0.6} onPress={onSearch}>
        <Feather name="search" size={24} color={COLORS.TITLE} />
      </SearchButton>
    </Container>
  );
}
