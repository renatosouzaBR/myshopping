import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import brandImg from "@/assets/signin.png";
import { useAuth } from "@/hooks/auth";

import { Input } from "@/components/Forms/Input";
import { Button } from "@/components/Forms/Button";

import {
  Brand,
  Container,
  ForgotPasswordButton,
  ForgotPasswordText,
  Title,
} from "./styles";

export function SignIn() {
  const { signIn, isLogging } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    await signIn(email, password);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <KeyboardAvoidingView behavior="position">
          <Brand source={brandImg} />

          <Title>Login</Title>

          <Input
            placeholder="E-mail"
            type="secundary"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secundary"
            onChangeText={setPassword}
          />

          <ForgotPasswordButton>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPasswordButton>

          <Button title="Entrar" isLoading={isLogging} onPress={handleSignIn} />
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
