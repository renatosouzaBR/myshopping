import React from "react";
import { TouchableOpacityProps } from "react-native";

import {
  Container,
  Details,
  Name,
  Photo,
  Status,
  StatusView,
  ContainerProps,
} from "./styles";

export interface OrderProps {
  id: string;
  pizza: string;
  photo_url: string;
  size: string;
  quantity: number;
  table_number: string;
  status: string;
}

interface OrderCardProps extends ContainerProps, TouchableOpacityProps {
  data: OrderProps;
}

export function OrderCard(props: OrderCardProps) {
  const { index, data, ...rest } = props;

  return (
    <Container index={index} {...rest}>
      <Photo source={{ uri: data.photo_url }} />
      <Name>{data.pizza}</Name>
      <Details>
        Mesa {data.table_number} • Qnt: {data.quantity}
      </Details>

      <StatusView status={data.status}>
        <Status status={data.status}>{data.status}</Status>
      </StatusView>
    </Container>
  );
}
