import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { Emoji } from "@/assets/emoji";
import { Search } from "@/components/Search";
import { ProductCard } from "@/components/ProductCard";

import {
  Container,
  GreetingText,
  GreetingWrapper,
  Header,
  MenuHeader,
  MenuItemsCount,
  MenuTitle,
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

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <MenuTitle>Cardápio</MenuTitle>
        <MenuItemsCount>32 pizzas</MenuItemsCount>
      </MenuHeader>

      <ProductCard
        photo_uri="https://github.com/renatosouzabr.png"
        name="Margherita"
        description="Mussarela, manjericão fresco, parmesão e tomate."
      />
    </Container>
  );
}
