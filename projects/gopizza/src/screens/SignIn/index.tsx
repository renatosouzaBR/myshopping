import React from "react";

import { Input } from "@/components/Forms/Input";

import { Container } from "./styles";
import { Button } from "@/components/Forms/Button";

export function SignIn() {
  return (
    <Container>
      <Input
        placeholder="E-mail"
        type="secundary"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Input placeholder="Senha" type="secundary" />

      <Button title="Entrar" />
    </Container>
  );
}
