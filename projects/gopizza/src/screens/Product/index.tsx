import React, { useState } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

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
  MaxCharacters,
} from "./styles";

export function Product() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sizePriceP, setSizePriceP] = useState("");
  const [sizePriceM, setSizePriceM] = useState("");
  const [sizePriceG, setSizePriceG] = useState("");

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

  async function handleAddPizza() {
    if (!name.trim()) {
      return Alert.alert("Adicionar pizza", "Você precisa informar o nome!");
    }

    if (!description.trim()) {
      return Alert.alert(
        "Adicionar pizza",
        "Você precisa informar a descrição!"
      );
    }

    if (!image.trim()) {
      return Alert.alert(
        "Adicionar pizza",
        "Você precisa adicionar a imagem da pizza!"
      );
    }

    if (!sizePriceP.trim() || !sizePriceM.trim() || !sizePriceG.trim()) {
      return Alert.alert(
        "Adicionar pizza",
        "Você precisa informar o preço de cada tamanho da pizza!"
      );
    }

    try {
      setIsLoading(true);

      const fileName = new Date().getTime();
      const reference = storage().ref(`/pizzas/${fileName}.png`);
      await reference.putFile(image);
      const photo_url = await reference.getDownloadURL();

      await firestore()
        .collection("pizzas")
        .add({
          name,
          name_insensitive: name.toLowerCase().trim(),
          description,
          prices_sizes: {
            p: sizePriceP,
            m: sizePriceM,
            g: sizePriceG,
          },
          photo_url,
          photo_path: reference.fullPath,
        });

      Alert.alert(
        "Adicionar pizza",
        "Cadastro de pizza realizado com sucesso!"
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Adicionar pizza",
        "Não foi possível adicionar a pizza, tente novamente!"
      );
    } finally {
      setIsLoading(false);
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
            <Input type="primary" onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 carecteres</MaxCharacters>
            </InputGroupHeader>

            <Input
              type="primary"
              style={{ height: 80 }}
              maxLength={60}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <PriceInput
              size="P"
              onChangeText={setSizePriceP}
              value={sizePriceP}
            />
            <PriceInput
              size="M"
              onChangeText={setSizePriceM}
              value={sizePriceM}
            />
            <PriceInput
              size="G"
              onChangeText={setSizePriceG}
              value={sizePriceG}
            />
          </InputGroup>

          <Button
            title="Cadastrar pizza"
            type="secundary"
            isLoading={isLoading}
            onPress={handleAddPizza}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}
