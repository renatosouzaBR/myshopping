import React, { useEffect } from "react";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import firestore from "@react-native-firebase/firestore";

import { Emoji } from "@/assets/emoji";
import { Search } from "@/components/Search";
import { ProductCard, ProductProps } from "@/components/ProductCard";

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

  async function fetchPizzas(filter: string) {
    try {
      const formattedFilter = filter.toLowerCase().trim();

      const { docs } = await firestore()
        .collection("pizzas")
        .orderBy("name_insensitive")
        .startAt(formattedFilter)
        .endAt(`${formattedFilter}\uf8ff`)
        .get();

      const pizzas = docs.map((pizza) => ({
        id: pizza.id,
        ...pizza.data(),
      })) as ProductProps[];

      console.log(pizzas);
    } catch (error) {
      Alert.alert("Consulta", "Não foi possível consultas as pizzas");
    }
  }

  useEffect(() => {
    fetchPizzas("");
  }, []);

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
        photo_url="https://github.com/renatosouzabr.png"
        name="Margherita"
        description="Mussarela, manjericão fresco, parmesão e tomate."
      />
    </Container>
  );
}
