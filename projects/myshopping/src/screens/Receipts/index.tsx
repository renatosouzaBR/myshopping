import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import storage from "@react-native-firebase/storage";

import { Container, PhotoInfo } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File, FileProps } from "../../components/File";

export function Receipts() {
  const [files, setFiles] = useState<FileProps[]>([]);

  async function fetchImages() {
    const fetchedFiles = await storage().ref("/images").list();
    const formattedFiles = fetchedFiles.items.map((image) => ({
      name: image.name,
      path: image.fullPath,
    }));

    setFiles(formattedFiles);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri="" />

      <PhotoInfo>Informações da foto</PhotoInfo>

      <FlatList
        data={files}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File data={item} onShow={() => {}} onDelete={() => {}} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
}
