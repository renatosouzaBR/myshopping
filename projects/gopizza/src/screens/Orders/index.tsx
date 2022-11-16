import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { useAuth } from "@/hooks/auth";

import { OrderCard, OrderProps } from "@/components/OrderCard";

import { Container, Header, Title, HorizontalLine } from "./styles";

export function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("waiter_id", "==", user.id)
      .onSnapshot((observer) => {
        const data = observer.docs.map((order) => ({
          id: order.id,
          ...order.data(),
        })) as OrderProps[];

        setOrders(data);
      });

    return () => subscribe();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OrderCard index={index} data={item} />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ItemSeparatorComponent={HorizontalLine}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      />
    </Container>
  );
}
