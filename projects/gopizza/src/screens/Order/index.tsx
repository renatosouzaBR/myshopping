import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import { BackButton } from "@/components/BackButton";
import { RadioButton } from "@/components/RadioButton";
import { Input } from "@/components/Forms/Input";
import { Button } from "@/components/Forms/Button";
import { ProductProps } from "@/components/ProductCard";

import { PIZZAS_TYPES } from "@/utils/pizzas-types";
import { OrderNavigationProps } from "@/@types/navigation";
import { useAuth } from "@/hooks/auth";

import {
  Container,
  Header,
  Photo,
  Sizes,
  Form,
  Title,
  Label,
  InputGroup,
  FormRow,
  Total,
} from "./styles";

interface PizzaResponse extends ProductProps {
  prices_sizes: {
    [key: string]: number;
  };
}

export function Order() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState("");
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(1);
  const [tableNumber, setTableNumber] = useState("");

  const amount = size ? pizza.prices_sizes[size] * quantity : "0,00";

  function handleSelectSize(value: string) {
    setSize(value);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchPizza(id: string) {
    try {
      const response = await firestore().collection("pizzas").doc(id).get();
      const data = response.data() as PizzaResponse;
      setPizza(data);
    } catch (error) {
      Alert.alert("Pedido", "Não foi possível carregar os dados da pizza");
    }
  }

  async function handleNewOrder() {
    try {
      if (!size) {
        return Alert.alert("Pedido", "Você precisa escolher um tamanho");
      }

      if (!quantity) {
        return Alert.alert("Pedido", "Você precisa informar a quantidade");
      }

      if (!tableNumber) {
        return Alert.alert("Pedido", "Você precisa informar o número da mesa");
      }

      setIsLoading(true);

      await firestore().collection("orders").add({
        quantity,
        table_number: tableNumber,
        size,
        amount,
        pizza: pizza.name,
        photo_url: pizza.photo_url,
        status: "Preparando",
        waiter_id: user.id,
      });

      navigation.navigate("home");
    } catch (error) {
      Alert.alert("Pedido", "Não foi possível cadastrar um novo pedido");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchPizza(id);
    }
  }, [id]);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <BackButton style={{ marginBottom: 108 }} onPress={handleGoBack} />
        </Header>

        <Photo source={{ uri: pizza.photo_url }} />

        <Form>
          <Title>{pizza.name}</Title>

          <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZAS_TYPES.map((item) => (
              <RadioButton
                key={item.id}
                title={item.name}
                onPress={() => handleSelectSize(item.id)}
                selected={item.id === size}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                type="primary"
                keyboardType="numeric"
                onChangeText={setTableNumber}
                value={tableNumber}
              />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                type="primary"
                keyboardType="numeric"
                onChangeText={(value) => setQuantity(Number(value))}
                value={String(quantity)}
              />
            </InputGroup>
          </FormRow>

          <Total>Total: R$ {amount}</Total>

          <Button
            type="secundary"
            title="Confirmar pedido"
            onPress={handleNewOrder}
            isLoading={isLoading}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
