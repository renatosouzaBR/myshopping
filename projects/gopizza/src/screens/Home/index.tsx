import React, { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import { useAuth } from "@/hooks/auth";

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
  NewProductButton,
  SignOutButton,
} from "./styles";

export function Home() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");

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

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  function handleEditPizza(id: string) {
    const route = user.isAdmin ? "product" : "order";
    navigation.navigate(route, { id });
  }

  function handleNewPizza() {
    navigation.navigate("product", {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas("");
    }, [])
  );

  return (
    <Container>
      <Header>
        <GreetingWrapper>
          <Emoji />
          <GreetingText>Olá, Admin</GreetingText>
        </GreetingWrapper>

        <SignOutButton onPress={signOut}>
          <MaterialIcons name="exit-to-app" size={24} color={COLORS.TITLE} />
        </SignOutButton>
      </Header>

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <MenuHeader>
        <MenuTitle>Cardápio</MenuTitle>
        <MenuItemsCount>{pizzas.length} pizzas</MenuItemsCount>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleEditPizza(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 20,
        }}
      />

      {user.isAdmin && (
        <NewProductButton title="Cadastrar Pizza" onPress={handleNewPizza} />
      )}
    </Container>
  );
}
