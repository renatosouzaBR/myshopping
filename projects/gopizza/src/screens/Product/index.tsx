import React, { useEffect, useState } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import { ProductNavigationProps } from "@/@types/navigation";

import { BackButton } from "@/components/BackButton";
import { Photo } from "@/components/Photo";
import { PriceInput } from "@/components/Forms/PriceInput";
import { Input } from "@/components/Forms/Input";
import { Button } from "@/components/Forms/Button";
import { ProductProps } from "@/components/ProductCard";

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

interface PizzaResponse extends ProductProps {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
}

export function Product() {
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  const [isLoading, setIsLoading] = useState(false);
  const [photoPath, setPhotoPath] = useState("");
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

  async function fetchPizza(id: string) {
    try {
      const response = await firestore().collection("pizzas").doc(id).get();
      const data = response.data() as PizzaResponse;

      setImage(data.photo_url);
      setPhotoPath(data.photo_path);
      setName(data.name);
      setDescription(data.description);
      setSizePriceP(data.prices_sizes.p);
      setSizePriceM(data.prices_sizes.m);
      setSizePriceG(data.prices_sizes.g);
    } catch (error) {
      Alert.alert(
        "Edição",
        "Não foi possível carregar os dados da pizza selecionada"
      );
    }
  }

  useEffect(() => {
    if (id) {
      fetchPizza(id);
    }
  }, [id]);

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
