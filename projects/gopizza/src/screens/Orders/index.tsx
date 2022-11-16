import React from "react";
import { FlatList } from "react-native";

import { OrderCard } from "@/components/OrderCard";

import { Container, Header, Title, HorizontalLine } from "./styles";

export function Orders() {
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item, index }) => <OrderCard index={index} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ItemSeparatorComponent={HorizontalLine}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      />
    </Container>
  );
}
