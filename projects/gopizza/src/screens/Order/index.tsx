import { BackButton } from "@/components/BackButton";
import { RadioButton } from "@/components/RadioButton";
import React from "react";

import { Container, Header, Photo, Sizes } from "./styles";

export function Order() {
  return (
    <Container>
      <Header>
        <BackButton style={{ marginBottom: 108 }} />
      </Header>

      <Photo source={{ uri: "https://github.com/renatosouzabr.png" }} />

      <Sizes>
        <RadioButton title="Pequena" selected={false} />
        <RadioButton title="Média" selected />
        <RadioButton title="Grande" selected={false} />
      </Sizes>
    </Container>
  );
}
