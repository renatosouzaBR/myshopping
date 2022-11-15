import React, { useState } from "react";
import { ScrollView } from "react-native";

import { BackButton } from "@/components/BackButton";
import { RadioButton } from "@/components/RadioButton";
import { Input } from "@/components/Forms/Input";
import { Button } from "@/components/Forms/Button";

import { PIZZAS_TYPES } from "@/utils/pizzas-types";

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

export function Order() {
  const [size, setSize] = useState("");

  function handleSelectSize(value: string) {
    setSize(value);
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <BackButton style={{ marginBottom: 108 }} />
        </Header>

        <Photo source={{ uri: "https://github.com/renatosouzabr.png" }} />

        <Form>
          <Title>Margherita</Title>

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
              <Input type="primary" keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input type="primary" keyboardType="numeric" />
            </InputGroup>
          </FormRow>

          <Total>Total: R$ 10,00</Total>

          <Button type="secundary" title="Confirmar pedido" />
        </Form>
      </ScrollView>
    </Container>
  );
}
