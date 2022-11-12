import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
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
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);

  async function fetchPizzas(filter: string) {
    try {
      const formattedFilter = filter.toLowerCase().trim();

      const { docs } = await firestore()
        .collection("pizzas")
        .orderBy("name_insensitive")
        .startAt(formattedFilter)
        .endAt(`${formattedFilter}\uf8ff`)
        .get();

      const data = docs.map((pizza) => ({
        id: pizza.id,
        ...pizza.data(),
      })) as ProductProps[];

      setPizzas(data);
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

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 20,
        }}
      />
    </Container>
  );
}
