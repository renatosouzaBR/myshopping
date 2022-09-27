import { TouchableOpacityProps } from "react-native";

import { Container, Load, Title, TypeProps } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: TypeProps;
  isLoading?: boolean;
}

export function Button(props: ButtonProps) {
  const { title, type = "primary", isLoading = false } = props;

  return (
    <Container type={type} disabled={isLoading}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  );
}
