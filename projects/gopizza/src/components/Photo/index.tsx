import { Image, Placeholder, PlaceholderText } from "./styles";

interface PhotoProps {
  uri: string;
}

export function Photo({ uri }: PhotoProps) {
  if (uri) {
    return <Image source={{ uri }} />;
  }

  return (
    <Placeholder>
      <PlaceholderText>Nenhuma foto{"\n"}carregada</PlaceholderText>
    </Placeholder>
  );
}
