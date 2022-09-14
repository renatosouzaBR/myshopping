import React, { useState } from "react";
import auth from "@react-native-firebase/auth";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleAnonymousSignIn() {
    const user = await auth().signInAnonymously();
    console.log(user);
  }

  async function createAccountWithEmailAndPassword() {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Tudo certo!", "Cadastro feito com sucesso!");
    } catch (error: any) {
      console.log(error.code);

      if (error.code === "auth/email-already-in-use") {
        return Alert.alert("Ops", "Esse email já está cadastrado!");
      }

      if (error.code === "auth/invalid-email") {
        return Alert.alert("Ops", "Email inválido!");
      }

      if (error.code === "auth/weak-password") {
        return Alert.alert(
          "Ops",
          "A senha deve conter no mínimo 6 caracteres!"
        );
      }
    }
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleAnonymousSignIn} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText
          title="Criar minha conta"
          onPress={createAccountWithEmailAndPassword}
        />
      </Account>
    </Container>
  );
}
