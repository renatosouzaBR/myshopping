import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  async function fetchProducts() {
    try {
      const productsCollection = firestore().collection("products");
      const subscribe = productsCollection.onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as ProductProps)
        );

        setProducts(data);
      });
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar a lista de produtos");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
