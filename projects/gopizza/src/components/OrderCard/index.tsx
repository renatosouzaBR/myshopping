import React from "react";

import {
  Container,
  Details,
  Name,
  Photo,
  Status,
  StatusView,
  ContainerProps,
} from "./styles";

interface OrderCardProps extends ContainerProps {}

export function OrderCard(props: OrderCardProps) {
  const { index } = props;

  return (
    <Container index={index}>
      <Photo source={{ uri: "https://github.com/renatosouzabr.png" }} />
      <Name>4 Queijos</Name>
      <Details>Mesa 01 • Qnt: 1</Details>

      <StatusView status="Pronto">
        <Status status="Pronto">Pronto</Status>
      </StatusView>
    </Container>
  );
}
