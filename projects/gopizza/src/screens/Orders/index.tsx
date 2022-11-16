import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { useAuth } from "@/hooks/auth";

import { OrderCard, OrderProps } from "@/components/OrderCard";

import { Container, Header, Title, HorizontalLine } from "./styles";

export function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState<OrderProps[]>([]);

  function handlePizzaDelivered(id: string) {
    Alert.alert("Entrega", "Deseja confirmar a entrega da pizza?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          firestore().collection("orders").doc(id).update({
            status: "Entregue",
          });
        },
      },
    ]);
  }

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
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === "Entregue"}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ItemSeparatorComponent={HorizontalLine}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      />
    </Container>
  );
}
