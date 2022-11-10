import React from "react";
import { TouchableOpacity } from "react-native";

import { BackButton } from "@/components/BackButton";
import { Photo } from "@/components/Photo";

import {
  Container,
  Header,
  Title,
  DeleteText,
  UploadWrapper,
  PickImageButton,
} from "./styles";

export function Product() {
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
        <Photo uri="" />
        <PickImageButton title="Carregar" />
      </UploadWrapper>
    </Container>
  );
}
