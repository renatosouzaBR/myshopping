import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { Emoji } from "@/assets/emoji";

import {
  Container,
  GreetingText,
  GreetingWrapper,
  Header,
  SignOutButton,
} from "./styles";

export function Home() {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Header>
        <GreetingWrapper>
          <Emoji />
          <GreetingText>Olá, Admin</GreetingText>
        </GreetingWrapper>

        <SignOutButton>
          <MaterialIcons name="exit-to-app" size={24} color={COLORS.TITLE} />
        </SignOutButton>
      </Header>
    </Container>
  );
}
