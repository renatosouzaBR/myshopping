import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { BackButton } from "@/components/BackButton";
import { Photo } from "@/components/Photo";
import { PriceInput } from "@/components/Forms/PriceInput";
import { Input } from "@/components/Forms/Input";
import { Button } from "@/components/Forms/Button";

import {
  Container,
  Header,
  Title,
  DeleteText,
  UploadWrapper,
  PickImageButton,
  Form,
  InputGroup,
  Label,
  InputGroupHeader,
  MaxCharacteres,
} from "./styles";

export function Product() {
  const [image, setImage] = useState("");

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      const { cancelled, uri } = result as any;

      if (!cancelled) {
        setImage(uri);
      }
    }
  }

  return (
    <Container behavior="position">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <BackButton />

          <Title>Cadastrar</Title>

          <TouchableOpacity>
            <DeleteText>Deletar</DeleteText>
          </TouchableOpacity>
        </Header>

        <UploadWrapper>
          <Photo uri={image} />
          <PickImageButton title="Carregar" onPress={handlePickImage} />
        </UploadWrapper>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input type="primary" />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacteres>0 de 60 carecteres</MaxCharacteres>
            </InputGroupHeader>

            <Input type="primary" style={{ height: 80 }} maxLength={60} />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <PriceInput size="P" />
            <PriceInput size="M" />
            <PriceInput size="G" />
          </InputGroup>

          <Button title="Cadastrar pizza" type="secundary" />
        </Form>
      </ScrollView>
    </Container>
  );
}
