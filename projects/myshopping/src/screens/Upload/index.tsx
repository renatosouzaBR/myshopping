import React, { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";

import { Container, Content, Progress, Transferred } from "./styles";

export function Upload() {
  const [image, setImage] = useState("");
  const [transferred, setTransferred] = useState("");
  const [progress, setProgress] = useState("0");

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  function handleUpload() {
    try {
      const fileName = new Date().getTime().toString();
      const MIME = image.match(/\.(?:.(?!\.))+$/);
      const reference = storage().ref(`/images/${fileName}${MIME}`);

      const task = reference.putFile(image);

      task.on("state_changed", (taskSnapshot) => {
        const { bytesTransferred, totalBytes } = taskSnapshot;
        const percent = ((bytesTransferred / totalBytes) * 100).toFixed(0);

        setProgress(percent);
        setTransferred(
          `${bytesTransferred} de ${totalBytes} bytes transferido`
        );
      });

      task.then(() => {
        Alert.alert("Tudo certo!", "Imagem enviada com sucesso!");
      });
    } catch (error) {
      Alert.alert("Ops", "Não foi possível enviar a imagem!");
    }
  }

  return (
    <Container>
      <Header title="Lista de compras" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button title="Fazer upload" onPress={handleUpload} />

        <Progress>{progress}%</Progress>

        <Transferred>{transferred}</Transferred>
      </Content>
    </Container>
  );
}
