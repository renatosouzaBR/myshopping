import { TextInputProps } from "react-native";

import { Container, Input, Label, Size } from "./styles";

interface PriceInputProps extends TextInputProps {
  size: string;
}

export function PriceInput({ size, ...rest }: PriceInputProps) {
  return (
    <Container>
      <Size>
        <Label>{size}</Label>
      </Size>

      <Label>R$</Label>

      <Input keyboardType="numeric" {...rest} />
    </Container>
  );
}
