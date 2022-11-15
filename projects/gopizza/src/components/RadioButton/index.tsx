import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Radio, Selected, Title } from "./styles";

interface RadioButtonProps extends TouchableOpacityProps {
  selected: boolean;
  title: string;
}

export function RadioButton(props: RadioButtonProps) {
  const { selected, title, ...rest } = props;

  return (
    <Container selected={selected} activeOpacity={0.6} {...rest}>
      <Radio selected={selected}>{selected && <Selected />}</Radio>
      <Title>{title}</Title>
    </Container>
  );
}
