import React from "react";
import { KeyboardAvoidingView } from "react-native";

import brandImg from "@/assets/signin.png";

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
  return (
    <Container>
      <KeyboardAvoidingView behavior="position">
        <Brand source={brandImg} />

        <Title>Login</Title>

        <Input
          placeholder="E-mail"
          type="secundary"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input placeholder="Senha" type="secundary" />

        <ForgotPasswordButton>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPasswordButton>

        <Button title="Entrar" />
      </KeyboardAvoidingView>
    </Container>
  );
}
