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

  async function signInWithEmailAndPassword() {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.log(error.code);

      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        return Alert.alert("Ops", "Credenciais inválidas, verifique!");
      }
    }
  }

  async function handleForgotPassword() {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        "Tudo certo!",
        "Foi enviado um link no seu email para criar um nova senha!"
      );
    } catch (error) {
      Alert.alert(
        "Ops",
        "Não foi possível solicitar a redefinição de senha, tente novamente mais tarde!"
      );
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

      <Button title="Entrar" onPress={signInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={createAccountWithEmailAndPassword}
        />
      </Account>
    </Container>
  );
}
