import React from "react";

import { Badge, Container, Quantity, Title } from "./styled";

interface BottomMenuProps {
  title: string;
  color: string;
  notifications?: string | undefined;
}

export function BottomMenu(props: BottomMenuProps) {
  const { title, color, notifications } = props;
  const noNotifications = notifications === "0";

  return (
    <Container>
      <Title color={color}>{title}</Title>

      {notifications && (
        <Badge noNotifications={noNotifications}>
          <Quantity noNotifications={noNotifications}>{notifications}</Quantity>
        </Badge>
      )}
    </Container>
  );
}
