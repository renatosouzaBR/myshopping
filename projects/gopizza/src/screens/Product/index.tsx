import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { BackButton } from "@/components/BackButton";
import { Photo } from "@/components/Photo";
import { PriceInput } from "@/components/Forms/PriceInput";

import {
  Container,
  Header,
  Title,
  DeleteText,
  UploadWrapper,
  PickImageButton,
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

      <PriceInput size="P" />
      <PriceInput size="M" />
      <PriceInput size="G" />
    </Container>
  );
}
